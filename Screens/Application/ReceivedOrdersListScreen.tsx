import {useMutation, useQuery, useSubscription} from '@apollo/client';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, Modal, StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {IconButton} from 'react-native-paper';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {AppText} from '../../Components/Elements/AppText';
import AppButton from '../../Components/Elements/Button';
import {Spacer} from '../../Components/Elements/Spacer';
import {ListCard} from '../../Components/Molecules/Cards/ListCard';
import {ProviderCard} from '../../Components/Molecules/Cards/ProviderCard';
import {AppBottomSheet} from '../../Components/Molecules/Global/AppBottomSheet';
import {AppSerchBar} from '../../Components/Molecules/Global/AppSerchBar';
import {SamagraLoader} from '../../Components/Molecules/Response/SamagraLoader';
import {SingnlePageInfo} from '../../Components/Organism/SinglePageInfo';
import {ProviderCardSkeleton} from '../../Components/Skeletons/Components/ProviderCardSkeleton';
import {
  DummyServiceProviderURL,
  ImageNotFound,
} from '../../Constants/UI/AssetsUrls';
import {
  NoAnyorderItemsFoud,
  NotMentioned,
  SuccessfullSentMessage,
  SuccessfullSentTitle,
} from '../../Constants/UI/Messages';
import {createItemRequestOfferMutation} from '../../GraphQL/Mutation/ItemRequestMutation';
import {getAllPersonalItems} from '../../GraphQL/Queries/ItemQueries';
import {getSubscribedData} from '../../GraphQL/Subscription/Subscription';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {responseTheme, size} from '../../Prefrences/Prefrences';
import {GetDataSubscription} from '../../src/__generated__/graphql';
import {showLoader} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch} from '../../StateManagement/hooks';
import {titleCase, titleRange} from '../../Utilities/CustomMethods';

interface ReceivedOrderListScreenProps {}
// export async function onDisplayNotification(body: string) {
//   // Request permissions (required for iOS)
//   await notifee.requestPermission();

//   try {
//     const channelId = await notifee.createChannel({
//       id: 'msg',
//       name: 'Firing alarms & timers',
//       lights: true,
//       vibration: true,
//       importance: AndroidImportance.DEFAULT,
//     });

//     // Display a notification
//     await notifee.displayNotification({
//       title: 'Samagra',
//       body: body,
//       android: {
//         channelId,
//         // pressAction is needed if you want the notification to open the app when pressed
//         pressAction: {
//           id: 'default',
//         },
//       },
//     });
//   } catch (e) {
//     console.log('>>>Error Notification::', e);
//   }
// }

export const ReceivedOrderListScreen: React.FC<
  ReceivedOrderListScreenProps
> = ({}) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const [personalUserDetail, setPersonalDetail] = useState<React.ReactNode>();
  const [orderlist, setOrderList] = useState<Array<GetDataSubscription>>([]);
  const [isProfileTapped, setIsProfileTapped] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const {NoItemFound} = Logos;
  const {data, loading, error} = useSubscription(getSubscribedData, {
    onData: ({client, data}) => {
      if (
        data.data &&
        data.data.events?.eventName &&
        data.data.events.data?.itemRequestReceived
      ) {
        setOrderList([...orderlist, data.data]);
      }
      if (data.data?.events?.data?.orderReceived) {
        showMessage(responseTheme('You received order',"" , 'success'));
      }
    },
  });
  const [requestID, setRequestID] = useState<string>('');
  const {
    data: myShopItem,
    loading: myShopItemLoading,
    error: myShopError,
  } = useQuery(getAllPersonalItems);
  const [itemSelectedId, setItemSelectedId] = useState<string>('');
  const [createItemRequestOfferFn] = useMutation(
    createItemRequestOfferMutation,
  );

  // Accepting the query
  const onAcceptHandle = async (reqeustId: string, itemId: string) => {
    try {
      let response = createItemRequestOfferFn({
        variables: {
          requestId: reqeustId,
          itemId: itemId,
        },
      });

      let data = (await response).data;

      if (data) {
        showMessage(
          responseTheme(
            SuccessfullSentTitle,
            SuccessfullSentMessage,
            'success',
          ),
        );

        setIsModalOpen(!isModalOpen);
      }

      if ((await response).errors) {
        // let
        showMessage(
          responseTheme(
            'Please Try again !',
            'Somthingn went Wrong',
            'dannger',
          ),
        );
      }
    } catch (e) {
      console.log('Error Messaghe', e);

      showMessage(responseTheme('Action Failed !', 'ASdsadas', 'danger'));
    }
  };

  // Handle back  Navigation
  const handleNavigation = () => {
    navigation.navigate('ApplicationOverlay', {
      screen: 'OrderListScreen',
    });
  };

  if (loading) return <ProviderCardSkeleton></ProviderCardSkeleton>;

  if (!data && error)
    return (
      <AppText
        fontSizeVariant="regular"
        fontVariant="regular"
        title={error.message}></AppText>
    );

  // React Elements
  // MyShopItems
  const myItemsSection = () => (
    <>
      {myShopItemLoading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            marginTop: size.spacing.xxl + 10,
          }}>
          <SamagraLoader></SamagraLoader>
        </View>
      ) : (
        <>
          <RowFlexLayout
            customStyle={{
              justifyContent: 'space-between',
              marginTop: size.spacing.xl,
              paddingHorizontal: size.spacing.s,
              // elevation: 1,
            }}>
            <AppText
              title="My Item's"
              fontSizeVariant="title"
              fontVariant="medium"></AppText>

            <IconButton
              onPress={() => setIsModalOpen(!isModalOpen)}
              icon={'close'}
              size={size.iconSize.medium}
              iconColor={colors.notification}
              style={{
                backgroundColor: colors.card,
                borderWidth: size.borderWidth.l,
                borderColor: colors.card,
              }}
            />
          </RowFlexLayout>
          <FlatList
            ListHeaderComponent={
              <View
                style={{
                  marginVertical: size.spacing.xxs,
                  marginHorizontal: size.spacing.xxs,
                }}>
                <AppSerchBar
                  onPress={() => console.log('SEarched')}></AppSerchBar>
              </View>
            }
            contentContainerStyle={{
              marginTop: size.spacing.s,
              marginBottom: size.spacing.xxl + 10,
            }}
            showsVerticalScrollIndicator={false}
            data={myShopItem?.getItems?.edges}
            renderItem={({item, index}) => (
              <ListCard
                onImagePress={() => console.log('Pressed')}
                customStyle={{
                  borderWidth: size.borderWidth.s,
                  borderColor:
                    itemSelectedId === item?.node?.id ? 'orange' : colors.card,
                  paddingHorizontal: size.spacing.xs,
                  marginHorizontal: size.spacing.xs,
                }}
                containerPressedHandle={(id: string) => {
                  setItemSelectedId(id);
                }}
                isContainerPressed
                key={index}
                id={item?.node?.id ?? NotMentioned}
                imageUrl={item?.node?.imageUrls?.[0] ?? ImageNotFound}
                list={[
                  {
                    value: titleCase(item?.node?.name) ?? NotMentioned,
                    type: 'title',
                    fontVariant: 'bold',
                  },
                  {
                    value: item?.node?.price
                      ? 'Rs. ' + item.node?.price
                      : NotMentioned,
                    type: 'regular',
                  },
                  {
                    value: item?.node?.stockQuantity
                      ? 'QTY: ' + item.node?.stockQuantity
                      : NotMentioned,
                    type: 'regular',
                    fontVariant: 'bold',
                    style: {
                      color: item?.node?.stockQuantity
                        ? item?.node?.stockQuantity < 5
                          ? colors.notification
                          : colors.primary
                        : colors.primary,
                    },
                  },
                ]}></ListCard>
            )}></FlatList>
          <AppButton
            onPress={() => {
              dispatch(showLoader());
              onAcceptHandle(requestID, itemSelectedId);
            }}
            style={{
              bottom: 0,
              position: 'absolute',
              right: 0,
              margin: size.spacing.m,
            }}>
            Send Request
          </AppButton>
        </>
      )}
    </>
  );

  const profileDetailInfo = (
    <>
      <View>{personalUserDetail}</View>
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
      <Spacer height={20}></Spacer>
      <AppButton
        onPress={() => {
          setIsProfileTapped(!isProfileTapped);
          setIsModalOpen(!isModalOpen);
        }}>
        Accept
      </AppButton>
      <Spacer height={20}></Spacer>
    </>
  );

  if (loading)
    return <ProviderCardSkeleton numberOfCard={7}></ProviderCardSkeleton>;

  return (
    <>
      <FlatList
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              marginTop: 120,
            }}>
            <SingnlePageInfo
              icon={<NoItemFound></NoItemFound>}
              detail={{
                title: 'No Any Request Currently',
                message: NoAnyorderItemsFoud,
                onButtonPress: () => handleNavigation(),
                buttonTitle: 'Go to home',
              }}></SingnlePageInfo>
          </View>
        }
        data={orderlist}
        renderItem={({item, index}) => (
          <ProviderCard
            list={[
              {
                value:
                  item.events?.data?.itemRequestReceived?.name ?? NotMentioned,
                type: 'regular',
                fontVariant: 'medium',
              },
              {
                value: 'name',
                type: 'caption',
              },
              {
                value: titleRange(
                  'Ipsum ipsum aute officia aute laborum magna qui ex nulla.',
                  30,
                ),
                type: 'caption',
              },
            ]}
            key={index}
            isProgressBarEnable={false}
            onAcceptButtonPress={() => {
              dispatch(showLoader());
              setIsModalOpen(true);
              setRequestID(item.events?.data?.itemRequestReceived?.id ?? '');
            }}
            setProfileTapped={() => {
              setIsProfileTapped(!isProfileTapped);
            }}
            imageUrl={DummyServiceProviderURL}></ProviderCard>
        )}></FlatList>

      <Modal
        statusBarTranslucent={true}
        animationType="fade"
        visible={isModalOpen}>
        {myItemsSection()}
      </Modal>

      {/* App BottomSheet */}
      {isProfileTapped ? (
        <AppBottomSheet
          onClose={() => setIsProfileTapped(!isProfileTapped)}
          isOppen={isProfileTapped}
          flexHeight={0.17}
          pannigGesture={true}
          title="Profile Details"
          children={() => <>{profileDetailInfo}</>}></AppBottomSheet>
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
