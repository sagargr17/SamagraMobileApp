import {useSubscription} from '@apollo/client';
import {useIsFocused, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Linking,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator, Icon} from 'react-native-paper';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {AppTextElement} from '../../../Components/Elements/AppTextElement';
import AppButtonElement from '../../../Components/Elements/ButtonElement';
import {SpacerElement} from '../../../Components/Elements/SpacerElement';
import {ProviderCardMolecule} from '../../../Components/Molecules/Cards/ProviderCardMolecule';
import {AppBottomSheetMolecule} from '../../../Components/Molecules/Global/AppBottomSheetMolecule';
import {SingnlePageInfoMolecule} from '../../../Components/Molecules/Global/SinglePageInfo';
import {
  DummyServiceProviderURL,
  ImageNotFound,
} from '../../../Constants/UI/AssetsUrls';
import {
  NoAnyorderItemsFoud,
  NotMentioned,
} from '../../../Constants/UI/Messages';
import {getSubscribedData} from '../../../GraphQL/Subscription/Subscription';
import {size} from '../../../Prefrences/Prefrences';
import {
  GetDataSubscription,
  OrderViewModel,
} from '../../../src/__generated__/graphql';
import {showLoader} from '../../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch, useAppSelector} from '../../../StateManagement/hooks';
import DateTimeToAgoTime, {
  AreaMapper,
  titleCase,
} from '../../../Utilities/CustomMethods';
import FastImage from '@d11/react-native-fast-image';
import {RowFlexLayout} from '../../../Layout/PartationLayout/RowFlexLayout';

interface OrdersScreenProps {}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({}) => {
  // ALL HOOKS MUST BE DECLARED AT THE TOP LEVEL AND UNCONDITIONALLY
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const [personalUserDetail, setPersonalDetail] = useState<
    OrderViewModel | any
  >();
  const [orderlist, setOrderList] = useState<Array<GetDataSubscription>>([]);
  const [isProfileTapped, setIsProfileTapped] = useState<boolean>(false);
  const userLocation = useAppSelector(state => state.user.userLocation);
  const isFocoused = useIsFocused();
  const {NoItemFound} = Logos;

  // useSubscription is a hook and must be called unconditionally
  const {
    data,
    error,
    loading: subscriptionLoading,
  } = useSubscription(getSubscribedData, {
    onData: ({data}) => {
      if (
        data.data &&
        data.data.events?.eventName &&
        data.data.events.data?.orderReceived
      ) {
        setOrderList((prevOrderList: any) => [...prevOrderList, data.data]); // Use functional update for setOrderList
      }
      if (data.data?.events?.data?.orderReceived) {
        // showMessage(responseTheme('You received order', '', 'success'));
      }
    },
  });

  const [initialLoading, setInitialLoading] = useState<boolean>(true); // Renamed to avoid confusion with subscriptionLoading

  useEffect(() => {
    setIsProfileTapped(false);
  }, [isFocoused]);

  useEffect(() => {
    // Only set initialLoading to false after a delay
    // This is for your custom initial loading screen
    let task = setTimeout(() => {
      setInitialLoading(false);
    }, 3000);

    return () => clearTimeout(task);
  }, [initialLoading]); // Empty dependency array means this runs once on mount

  // Now, handle your loading and error states using the state variables,
  // but after all hooks have been declared.

  if (error) {
    // Handle subscription errors
    return (
      <TouchableOpacity
        onPress={() => setInitialLoading(true)}
        style={{
          alignItems: 'center',
          top: 20,
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: colors.card,
          padding: size.spacing.m,
          borderRadius: size.borderRadius.full,
          borderWidth: size.borderWidth.s,
          borderColor: colors.border,
          justifyContent: 'center',
        }}>
        <AppTextElement
          customStyle={{
            marginRight: 10,
          }}
          fontSizeVariant="regular"
          fontVariant="regular"
          title={error.message}></AppTextElement>
        <Icon source={'autorenew'} size={20}></Icon>
      </TouchableOpacity>
    );
  }

  if (initialLoading || subscriptionLoading) {
    // Combine your loading states
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <ActivityIndicator
          color={colors.primary}
          size={'large'}></ActivityIndicator>
        <SpacerElement height={20}></SpacerElement>
        <AppTextElement title="Searching Request..."></AppTextElement>
      </View>
    );
  }

  const profileDetailInfo = (
    <>
      <View style={styles.userInformationContainer}>
        <SpacerElement height={20}></SpacerElement>
        <View style={{}}>
          <FastImage
            source={{
              uri: ImageNotFound,
            }}
            style={{
              // borderRadius: size.borderRadius.full,
              height: AreaMapper({
                value: 60,
              }),
              width: AreaMapper({
                value: 60,
              }),

              borderWidth: size.borderWidth.s,
              borderColor: colors.text,
            }}></FastImage>
        </View>
        <SpacerElement height={20}></SpacerElement>
        <TouchableHighlight
          style={{
            backgroundColor: colors.card,
          }}
          touchSoundDisabled
          underlayColor={colors.card}
          onPress={async () => {
            Linking.openURL(
              `https://www.google.com/maps/search/?api=1&query=${userLocation?.lat},${userLocation?.long}`,
            );
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <AppTextElement
              title={'Location:'}
              fontVariant="medium"
              fontSizeVariant={'title'}></AppTextElement>
            <View>
              <AppTextElement
                title={personalUserDetail?.address ?? 'Baneswor, Kathmandu '}
                fontVariant="medium"
                fontSizeVariant={'title'}></AppTextElement>
            </View>
          </View>
        </TouchableHighlight>
        <SpacerElement height={10}></SpacerElement>

        <RowFlexLayout
          customStyle={[
            {
              justifyContent: 'flex-start',
              alignItems: 'center',
            },
          ]}>
          <AppTextElement
            title={'Name : '}
            fontVariant="medium"
            fontSizeVariant={'title'}></AppTextElement>
          <AppTextElement
            title={titleCase(personalUserDetail?.username) ?? 'Sagar'}
            fontVariant="medium"
            fontSizeVariant={'title'}></AppTextElement>
        </RowFlexLayout>

        <SpacerElement></SpacerElement>
        <RowFlexLayout
          customStyle={[
            {
              justifyContent: 'flex-start',
              alignItems: 'center',
            },
          ]}>
          <AppTextElement
            title={'Phone : '}
            fontVariant="medium"
            fontSizeVariant={'title'}></AppTextElement>
          <AppTextElement
            title={`${personalUserDetail?.phoneNumber ?? 9841105090}`}
            fontVariant="medium"
            fontSizeVariant={'title'}></AppTextElement>
        </RowFlexLayout>
        <SpacerElement></SpacerElement>
      </View>
      {/* <SpacerElement height={20}></SpacerElement> */}
      <SpacerElement height={20}></SpacerElement>
    </>
    // <>
    //   <View style={styles.userInformationContainer}>
    //     <View style={styles.emailContainer}>
    //       <AppTextElement
    //         title={'Name:'}
    //         fontVariant="regular"
    //         fontSizeVariant={'regular'}></AppTextElement>
    //       <AppTextElement
    //         title={personalUserDetail?.fullName ?? 'Sagar'}
    //         fontVariant="medium"
    //         fontSizeVariant={'regular'}></AppTextElement>
    //     </View>
    //     <TouchableHighlight
    //       touchSoundDisabled
    //       underlayColor={colors.card}
    //       onPress={async () => {
    //         Linking.openURL(
    //           `https://www.google.com/maps/search/?api=1&query=${userLocation?.lat},${userLocation?.long}`,
    //         );
    //       }}>
    //       <View style={styles.locationcontainer}>
    //         <AppTextElement
    //           title={'Location:'}
    //           fontVariant="regular"
    //           fontSizeVariant={'regular'}></AppTextElement>
    //         <View>
    //           <AppTextElement
    //             title={personalUserDetail?.address ?? 'Baneswor, Kathmandu '}
    //             fontVariant="medium"
    //             fontSizeVariant={'regular'}></AppTextElement>
    //         </View>
    //       </View>
    //     </TouchableHighlight>
    //     <View style={styles.locationcontainer}>
    //       <AppTextElement
    //         title={'Location:'}
    //         fontVariant="regular"
    //         fontSizeVariant={'regular'}></AppTextElement>
    //       <AppTextElement
    //         title={`${personalUserDetail?.phoneNumber ?? 9841105090}`}
    //         fontVariant="medium"
    //         fontSizeVariant={'regular'}></AppTextElement>
    //     </View>
    //   </View>
    //   <SpacerElement height={20}></SpacerElement>
    //   <AppButtonElement
    //     onPress={() => {
    //       setIsProfileTapped(!isProfileTapped);
    //     }}>
    //     Complete
    //   </AppButtonElement>
    //   <SpacerElement height={20}></SpacerElement>
    // </>
  );

  return (
    <>
      <FlatList
        ListEmptyComponent={
          // This will only show if orderlist is empty AFTER loading has finished and no error
          <View
            style={{
              flex: 1,
              marginTop: 120,
            }}>
            <SingnlePageInfoMolecule
              icon={<NoItemFound></NoItemFound>}
              detail={{
                title: 'No Any Request Currently',
                message: NoAnyorderItemsFoud,
                onButtonPress: () => setInitialLoading(true), // Trigger reload if desired
                buttonTitle: 'Reload',
              }}></SingnlePageInfoMolecule>
          </View>
        }
        data={orderlist}
        renderItem={({item, index}) => (
          <ProviderCardMolecule
            list={[
              {
                value:
                  item.events?.data?.orderReceived?.itemName ?? NotMentioned,
                type: 'title',
                fontVariant: 'regular',
              },
              {
                value:
                  titleCase(item.events?.data?.orderReceived?.fullName) ??
                  NotMentioned,
                type: 'regular',
                fontVariant: 'regular',
              },
              {
                value: `Rs.${
                  item.events?.data?.orderReceived?.price ?? NotMentioned
                }`,
                type: 'regular',
              },
              {
                value: `${
                  DateTimeToAgoTime(
                    item.events?.data?.orderReceived?.dateTime,
                  ) ?? NotMentioned
                }`,
                type: 'regular',
              },
              {
                value: 'Offer Accepted',
                type: 'title',
                fontVariant: 'bold',

                style: {
                  color: colors.primary,
                },
              },
            ]}
            key={index}
            isProgressBarEnable={false}
            onAcceptButtonPress={() => {
              dispatch(showLoader());
            }}
            setProfileTapped={() => {
              setPersonalDetail(item.events?.data?.orderReceived);
              setIsProfileTapped(!isProfileTapped);
            }}
            imageUrl={DummyServiceProviderURL}
            isButtonVisible={false}></ProviderCardMolecule>
        )}></FlatList>

      {/* App BottomSheet */}
      {isProfileTapped ? (
        <AppBottomSheetMolecule
          onClose={() => setIsProfileTapped(!isProfileTapped)}
          isOppen={isProfileTapped}
          pannigGesture={true}
          children={() => <>{profileDetailInfo}</>}></AppBottomSheetMolecule>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: size.spacing.xs,
    paddingBottom: size.spacing.xs,
  },
  userInformationContainer: {
    paddingHorizontal: size.spacing.xs,
    flex: 1,
  },

  emailContainer: {
    marginVertical: size.spacing.xs,
  },

  locationcontainer: {
    marginVertical: size.spacing.xs,
  },
});
