import {useMutation, useSubscription} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Logos} from '../../../../Assets/SVG/Exports/Exports';
import {TextComponet} from '../../../../Components/Elements/TextComponet';
import {SingnlePageError} from '../../../../Components/Molecules/SinglePageError';
import {AppBottomSheet} from '../../../../Components/Molecules/Global/AppBottomSheet';
import {ProviderCard} from '../../../../Components/Molecules/Cards/ProviderCard';
import {ProviderCardSkeleton} from '../../../../Components/Skeletons/ProviderCardSkeleton';
import {PairButtons} from '../../../../Components/Molecules/Global/PairButtons';
import {createItemRequestOfferMutation} from '../../../../GraphQL/Mutation/ItemRequestMutation';
import {getSubscribedData} from '../../../../GraphQL/Subscription/Subscription';
import {GetDataSubscription} from '../../../../src/__generated__/graphql';
import {AreaMapper} from '../../../../Utilities/CustomMethods';
import {size} from '../../../../Prefrences/Prefrences';
import {EmptyError as EmptyErrorMessage} from '../../../../Constants/UI/Messages';
import {DummyServiceProviderURL} from '../../../../Constants/UI/AssetsUrls';

interface ReceivedOrderListScreenProps {}

export const ReceivedOrderListScreen: React.FC<
  ReceivedOrderListScreenProps
> = ({}) => {
  const [personalUserDetail, setPersonalDetail] = useState<React.ReactNode>();
  const [isProfileTapped, setIsProfileTapped] = useState<boolean>(false);
  const [orderlist, setOrderList] = useState<Array<GetDataSubscription>>([]);
  const navigation = useNavigation<any>();
  const {NoItemFound} = Logos;
  const {data, loading, error} = useSubscription(getSubscribedData, {
    onData: ({client, data}) => {
      if (
        data.data &&
        data.data.events?.eventName &&
        data.data.events.data?.itemRequestReceived
      ) {
        setOrderList([data.data, ...orderlist]);
      }
    },
  });
  const [
    createItemRequestOfferFn,
    {
      data: createItemRequestOfferFnData,
      loading: createItemRequestOfferLoading,
      error: createItemRequestOfferFnError,
    },
  ] = useMutation(createItemRequestOfferMutation);

  console.log(
    'Accepting Mutation',
    createItemRequestOfferFnData,
    createItemRequestOfferLoading,
    createItemRequestOfferFnError,
  );

  // const onAcceptHandle = async (reqeustId: string) => {
  //   try {
  //     console.log('Result.....', reqeustId);
  //     let response = createItemRequestOfferFn({
  //       variables: {
  //         requestId: reqeustId,
  //       },
  //     });

  //     let data = (await response).data;
  //     console.log('Responnd DATA', data);

  //     if (data) {
  //       showMessage({
  //         message: 'Request Sent SuccessFully',
  //         description: 'We will notifiy you if request has been accepted ',
  //         type: 'success',
  //         style: {
  //           height: 60,
  //         },
  //       });
  //     }
  //   } catch (e) {
  //     console.log('Error Messaghe', e);

  //     showMessage({
  //       message: 'Action Failed',
  //       description: 'Something Went Wrong',
  //       type: 'danger',
  //     });
  //   }
  // };

  return (
    <>
      <View>
        {!loading && !error ? (
          orderlist.length > 0 ? (
            <FlatList
              data={orderlist}
              renderItem={({item, index}) => (
                <ProviderCard
                  isProgressBarEnable={false}
                  onAcceptButtonPress={() => console.log('Captured')}
                  setIsProfileTapped={setIsProfileTapped}
                  setPersonalDetaile={setPersonalDetail}
                  priceperhour={Math.floor(Math.random() * 5) + 1}
                  distance={Math.floor(Math.random() * 5) + 1}
                  rating={Math.floor(Math.random() * 5) + 1}
                  titleName={
                    item.events?.sender?.username
                      ? item.events.sender.username
                      : 'Loading...'
                  }
                  image={DummyServiceProviderURL}></ProviderCard>
              )}></FlatList>
          ) : (
            <>
              <View>
                <SingnlePageError
                  detail={{
                    icon: <NoItemFound></NoItemFound>,
                    title: EmptyErrorMessage,
                    onButtonPress: () => {
                      navigation.navigate('ApplicationOverlay', {
                        screen: 'OrderListScreen',
                      });
                    },
                    buttonTitle: 'Go to home',
                  }}></SingnlePageError>
              </View>
            </>
          )
        ) : (
          <>
            <ProviderCardSkeleton></ProviderCardSkeleton>
            <ProviderCardSkeleton></ProviderCardSkeleton>
            <ProviderCardSkeleton></ProviderCardSkeleton>
            <ProviderCardSkeleton></ProviderCardSkeleton>
            <ProviderCardSkeleton></ProviderCardSkeleton>
          </>
        )}
      </View>

      {isProfileTapped ? (
        <AppBottomSheet
          onClose={() => setIsProfileTapped(!isProfileTapped)}
          isOppen={isProfileTapped}
          // indexValue={isProfileTapped ? 0 : -1}
          flexHeight={0.17}
          pannigGesture={isProfileTapped ? true : false}
          title="Profile Details"
          children={() => (
            <>
              {personalUserDetail}
              <View
                style={{
                  paddingHorizontal: AreaMapper({
                    value: 16,
                    scaleBy: 'average',
                  }),
                  flex: 1,
                }}>
                <View
                  style={{
                    marginVertical: AreaMapper({
                      value: 6,
                      scaleBy: 'average',
                    }),
                  }}>
                  <TextComponet
                    title={'E-mail:'}
                    fontVariant="regular"
                    fontSizeVariant={'regular'}></TextComponet>
                  <TextComponet
                    title={'Ram@gmail.com'}
                    fontVariant="medium"
                    fontSizeVariant={'regular'}></TextComponet>
                </View>
                <View>
                  <TextComponet
                    title={'Location:'}
                    fontVariant="regular"
                    fontSizeVariant={'regular'}></TextComponet>
                  <TextComponet
                    title={'Baneswor, Bhimsengola'}
                    fontVariant="medium"
                    fontSizeVariant={'regular'}></TextComponet>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginVertical: 10,
                  }}>
                  <PairButtons
                    onAcceptPress={() => {
                      console.log('Result');
                      // onAcceptHandle()
                    }}
                    onDeclinPress={() => {
                      console.log('Hello World');
                    }}></PairButtons>
                </View>
              </View>
            </>
          )}></AppBottomSheet>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: size.spacing.xs,
    paddingBottom: size.spacing.xs,
  },


});
