import {useMutation, useQuery, useSubscription} from '@apollo/client';
import FastImage from '@d11/react-native-fast-image';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, FlatList, StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {IconButton} from 'react-native-paper';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import AppButton from '../../Components/Elements/Button';
import {AppText} from '../../Components/Elements/AppText';
import {ProviderCard} from '../../Components/Molecules/Cards/ProviderCard';
import {AppBottomSheet} from '../../Components/Molecules/Global/AppBottomSheet';
import {SingnlePageInfo} from '../../Components/Organism/SinglePageInfo';
import {ProviderCardSkeleton} from '../../Components/Skeletons/Components/ProviderCardSkeleton';
import {
  DummyServiceProviderURL,
  ImageNotFound,
} from '../../Constants/UI/AssetsUrls';
import {EmptyMessage} from '../../Constants/UI/Messages';
import {createItemRequestOfferMutation} from '../../GraphQL/Mutation/ItemRequestMutation';
import {getPublicItems} from '../../GraphQL/Queries/ItemQueries';
import {getSubscribedData} from '../../GraphQL/Subscription/Subscription';
import {size} from '../../Prefrences/Prefrences';
import {GetDataSubscription} from '../../src/__generated__/graphql';
import notifee, {AndroidImportance} from '@notifee/react-native';

interface ReceivedOrderListScreenProps {}

export async function onDisplayNotification(body: string) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  try {
    const channelId = await notifee.createChannel({
      id: 'msg',
      name: 'Firing alarms & timers',
      lights: true,
      vibration: true,
      importance: AndroidImportance.DEFAULT,
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Samagra',
      body: body,
      android: {
        channelId,
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  } catch (e) {
    console.log('>>>Error Notification::', e);
  }
}

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
      console.log('Subscribed DAta', data);
      if (
        data.data &&
        data.data.events?.eventName &&
        data.data.events.data?.itemRequestReceived
      ) {
        setOrderList([...orderlist, data.data]);
        onDisplayNotification(
          `${data.data.events.data.itemRequestReceived.name} is requesting from Sagar`,
        );
      }
    },
  });
  const [itemId, setItemId] = useState<string>('');
  const [isSideBarVisible, setIsSideBarVisible] = useState<boolean>(false);
  const [requestID, setRequestID] = useState<string>('');

  // This is the Offer created by the Seller Provider
  const [
    createItemRequestOfferFn,
    {
      data: createItemRequestOfferFnData,
      loading: createItemRequestOfferLoading,
      error: createItemRequestOfferFnError,
    },
  ] = useMutation(createItemRequestOfferMutation);

  const onAcceptHandle = async (reqeustId: string, itemId: string) => {
    console.log('IDs', reqeustId, itemId);

    try {
      let response = createItemRequestOfferFn({
        variables: {
          requestId: reqeustId,
          itemId: itemId,
        },
      });

      let data = (await response).data;

      if (data) {
        showMessage({
          message: 'Request Offer Sent SuccessFully',
          description: 'We will notifiy you if request has been accepted ',
          type: 'success',
          style: {
            height: 60,
          },
        });

        setItemId('');
      }

      if ((await response).errors) {
        setItemId('');
      }
    } catch (e) {
      console.log('Error Messaghe', e);

      showMessage({
        message: 'Action Failed',
        description: 'Something Went Wrong',
        type: 'danger',
      });
      setItemId('');
    }
  };
  const {colors} = useTheme();

  const handleNavigation = () => {
    navigation.navigate('ApplicationOverlay', {
      screen: 'OrderListScreen',
    });
  };

  const {
    data: myShopItem,
    loading: myShopItemLoading,
    error: myShopError,
  } = useQuery(getPublicItems);

  if (loading)
    return (
      <>
        <ProviderCardSkeleton></ProviderCardSkeleton>
        <ProviderCardSkeleton></ProviderCardSkeleton>
        <ProviderCardSkeleton></ProviderCardSkeleton>
        <ProviderCardSkeleton></ProviderCardSkeleton>
        <ProviderCardSkeleton></ProviderCardSkeleton>
      </>
    );

  if (!data && error)
    return (
      <AppText
        fontSizeVariant="regular"
        fontVariant="regular"
        title={error.message}></AppText>
    );

  const sideBar = () => (
    <View
      style={{
        position: 'absolute',
        zIndex: 10,
        top: 0,
        backgroundColor: colors.card,
        flex: 1,
        width: 240,
      }}>
      <IconButton
        icon={'close'}
        size={20}
        onPress={() => setIsSideBarVisible(!isSideBarVisible)}></IconButton>

      <FlatList
        data={myShopItem?.getPublicItems?.nodes}
        renderItem={({item, index}) => (
          <View
            style={{
              paddingHorizontal: size.spacing.m,
              marginVertical: size.spacing.s,
              backgroundColor: colors.background,
              paddingVertical: size.spacing.m,
            }}>
            <FastImage
              style={{}}
              source={{
                uri: item?.imageUrls?.[0]
                  ? item?.imageUrls?.[0]
                  : ImageNotFound,
              }}></FastImage>
            <AppText
              title={`${item?.name}`}
              fontSizeVariant="regular"
              fontVariant="medium"></AppText>
            <AppText
              title={`NPR.${item?.price}`}
              fontSizeVariant="regular"
              fontVariant="medium"></AppText>

            <AppButton
              style={{
                marginVertical: size.spacing.m,
              }}
              onPress={() => {
                if (item?.id) {
                  onAcceptHandle(requestID, item.id);
                  // setItemId(item?.id);
                  // setIsSideBarVisible(!isSideBarVisible);
                }
              }}>
              Send Request
            </AppButton>
          </View>
        )}></FlatList>
    </View>
  );

  return (
    <>
      {orderlist.length > 0 ? (
        <FlatList
          data={orderlist}
          renderItem={({item, index}) => (
            <ProviderCard
              isProgressBarEnable={false}
              onAcceptButtonPress={() => {
                setRequestID(
                  item.events?.data?.itemRequestReceived?.id
                    ? item.events?.data?.itemRequestReceived?.id
                    : '',
                );
                setIsSideBarVisible(!isSideBarVisible);
              }}
              setIsProfileTapped={setIsProfileTapped}
              setPersonalDetaile={setPersonalDetail}
              priceperhour={Math.floor(Math.random() * 5) + 1}
              distance={Math.floor(Math.random() * 5) + 1}
              rating={Math.floor(Math.random() * 5) + 1}
              titleName={
                `${item.events?.id}`
                // item.events?.sender?.username
                //   ? item.events.sender.username + item.events.id
                //   : 'Loading...'
              }
              image={DummyServiceProviderURL}></ProviderCard>
          )}></FlatList>
      ) : (
        <SingnlePageInfo
          detail={{
            icon: <NoItemFound></NoItemFound>,
            title: EmptyMessage,
            onButtonPress: () => {
              handleNavigation();
            },
            buttonTitle: 'Go to home',
          }}></SingnlePageInfo>
      )}

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
              <View
                style={[
                  // size.elevation.xs,
                  {
                    borderWidth: size.borderWidth.xss,
                  },
                ]}>
                {personalUserDetail}
              </View>

              <View style={styles.userInformationContainer}>
                <View style={styles.emailContainer}>
                  <AppText
                    title={'E-mail:'}
                    fontVariant="regular"
                    fontSizeVariant={'regular'}></AppText>
                  <AppText
                    title={'Ram@gmail.com'}
                    fontVariant="medium"
                    fontSizeVariant={'regular'}></AppText>
                </View>
                <View style={styles.locationcontainer}>
                  <AppText
                    title={'Location:'}
                    fontVariant="regular"
                    fontSizeVariant={'regular'}></AppText>
                  <AppText
                    title={'Baneswor, Bhimsengola'}
                    fontVariant="medium"
                    fontSizeVariant={'regular'}></AppText>
                </View>
              </View>
            </>
          )}></AppBottomSheet>
      ) : null}

      {isSideBarVisible ? sideBar() : null}
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
