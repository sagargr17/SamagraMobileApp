import {useLazyQuery, useSubscription} from '@apollo/client';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, ImageBackground, StyleSheet, View} from 'react-native';

import {Pulse} from 'react-native-animated-spinkit';
import {showMessage} from 'react-native-flash-message';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {AppText} from '../../Components/Elements/AppText';
import {Spacer} from '../../Components/Elements/Spacer';
import {ProviderCard} from '../../Components/Molecules/Cards/ProviderCard';
import {
  DummyServiceProviderURL,
  ImageNotFound,
} from '../../Constants/UI/AssetsUrls';
import {NotMentioned} from '../../Constants/UI/Messages';
import {getPublicItemsById} from '../../GraphQL/Queries/ItemQueries';
import {getSubscribedData} from '../../GraphQL/Subscription/Subscription';
import {responseTheme, size} from '../../Prefrences/Prefrences';
import {GetDataSubscription} from '../../src/__generated__/graphql';
import {
  hideLoader,
  showLoader,
} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch} from '../../StateManagement/hooks';
import {postPlaceOrderparams} from '../../StateManagement/Orders/PlaceOrderDetailsParams';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {SingnlePageInfo} from '../../Components/Organism/SinglePageInfo';
import {Logos} from '../../Assets/SVG/Exports/Exports';

interface ReceivedOffersListScreenProps {}

export const ReceivedOffersListScreen: React.FC<
  ReceivedOffersListScreenProps
> = ({}) => {
  const [offerList, setOfferList] = useState<Array<GetDataSubscription>>([]);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [getPublicItemFn] = useLazyQuery(getPublicItemsById);
  const [isskeletonLoading, setSkeletonLoading] = useState<boolean>(true);
  const {NoItemFound} = Logos;

  const {loading} = useSubscription(getSubscribedData, {
    onData: ({client, data}) => {
      if (
        data.data &&
        data.data.events?.eventName &&
        data.data.events.data?.itemRequestOfferReceived
      ) {
        setOfferList([data.data, ...offerList]);
      }
    },
  });

  // Setting the element
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideLoader());
      console.log('>>><<<');
      setSkeletonLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Place Order Items
  const placeOrderItemHandle = (itemId: string) => {
    dispatch(showLoader());
    getPublicItemFn({
      variables: {
        id: itemId,
      },
    })
      .then(data => {
        dispatch(
          postPlaceOrderparams({
            itemDetails: {
              price: data.data?.getPublicItems?.nodes?.[0]?.price,
              location: 'Butwal',
              description:
                data.data?.getPublicItems?.nodes?.[0]?.description ??
                NotMentioned,
              requiredTime: '3hr',
              name: data.data?.getPublicItems?.nodes?.[0]?.name ?? NotMentioned,
              category: 'Vegitable',
              imageUrl:
                data.data?.getPublicItems?.nodes?.[0]?.imageUrls?.[0] ??
                ImageNotFound,
            },
            sellerDetails: {
              fullName:
                data.data?.getPublicItems?.nodes?.[0]?.shop?.user?.username ??
                NotMentioned,
              address: 'Butwal',
              shopName:
                data.data?.getPublicItems?.nodes?.[0]?.shop?.name ??
                NotMentioned,
              phoneNumber:
                data.data?.getPublicItems?.nodes?.[0]?.shop?.phoneNumber ??
                NotMentioned,
            },
            orderDetail: {
              message: 'chito gardeenu hai',
              orderQuantity: '1',
              itemID: itemId,
            },
          }),
        );
        navigation.navigate('ApplicationOverlay', {
          screen: 'PlaceOrderScreen',
        });
      })
      .catch(error => {
        showMessage(responseTheme('Something went wrong', '', 'danger'));
      });
  };

  if (isskeletonLoading)
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
          <ImageBackground
            imageStyle={{
              opacity: 0.3,
            }}
            source={require('../../Assets/PNG/citymap.jpg')}
            resizeMode="cover"
            style={styles.image}>
            <Pulse
              style={{
                position: 'absolute',
                // bottom: 1,
                right: 210,
                // top:100
              }}
              size={AreaMapper({value: 500})}
              color={'#55DD33'}
              animating></Pulse>
            <Pulse
              style={{
                position: 'absolute',
                top: 0,
                right: 200,
                // top:100
              }}
              size={AreaMapper({value: 400})}
              color={'#55DD33'}></Pulse>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Pulse size={AreaMapper({value: 300})} color={'#55DD33'}></Pulse>
              <Spacer></Spacer>
              <AppText
                customStyle={{
                  lineHeight: size.textVariants.title.lineHeight,
                }}
                title="Searching Nearby Provider..."
                fontSizeVariant="title"
                fontVariant="bold"></AppText>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </SafeAreaProvider>
    );

  return (
    <>
      {offerList.length > 0 ? (
        <FlatList
          data={offerList}
          renderItem={({item, index}) => (
            <ProviderCard
              list={[
                {
                  value:
                    item.events?.data?.itemRequestOfferReceived?.itemId ??
                    'Item',
                  type: 'regular',
                },
              ]}
              isProgressBarEnable={false}
              onAcceptButtonPress={() => {
                placeOrderItemHandle(
                  item.events?.data?.itemRequestOfferReceived?.itemId ??
                    NotMentioned,
                );
              }}
              setProfileTapped={() => console.log('REEEE')}
              imageUrl={DummyServiceProviderURL}></ProviderCard>
          )}></FlatList>
      ) : (
        <SingnlePageInfo
          icon={NoItemFound}
          detail={{
            title: 'Opps, Couldnot Find Any Prover.',
            message: 'Please try again or wait for a while here !!',
            buttonTitle: 'Back',
            onButtonPress: () => {
              navigation.goBack();
            },
          }}></SingnlePageInfo>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
