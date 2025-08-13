import {useMutation, useQuery, useSubscription} from '@apollo/client';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Modal, StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {AppTextElement} from '../../../Components/Elements/AppTextElement';
import AppButtonElement from '../../../Components/Elements/ButtonElement';
import {SpacerElement} from '../../../Components/Elements/SpacerElement';
import {ListCardMolecule} from '../../../Components/Molecules/Cards/ListCardMolecule';
import {ProviderCardMolecule} from '../../../Components/Molecules/Cards/ProviderCardMolecule';
import {AppBottomSheetMolecule} from '../../../Components/Molecules/Global/AppBottomSheetMolecule';
import {SerchBarMolecule} from '../../../Components/Molecules/Global/AppSerchBarMolecule';
import {SamagraLoaderElement} from '../../../Components/Elements/SamagraLoaderElement';
import {SingnlePageInfoMolecule} from '../../../Components/Molecules/Global/SinglePageInfo';
import {
  DummyServiceProviderURL,
  ImageNotFound,
} from '../../../Constants/UI/AssetsUrls';
import {
  NoAnyorderItemsFoud,
  NotMentioned,
  SuccessfullSentMessage,
  SuccessfullSentTitle,
} from '../../../Constants/UI/Messages';
import {createItemRequestOfferMutation} from '../../../GraphQL/Mutation/ItemRequestMutation';
import {getAllPersonalItems} from '../../../GraphQL/Queries/ItemQueries';
import {getSubscribedData} from '../../../GraphQL/Subscription/Subscription';
import {RowFlexLayout} from '../../../Layout/PartationLayout/RowFlexLayout';
import {responseTheme, size} from '../../../Prefrences/Prefrences';
import {GetDataSubscription} from '../../../src/__generated__/graphql';
import {showLoader} from '../../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch} from '../../../StateManagement/hooks';
import {
  AreaMapper,
  titleCase,
  titleRange,
} from '../../../Utilities/CustomMethods';
import FastImage from '@d11/react-native-fast-image';

interface RequestsScreenProps {}

export const RequestsScreen: React.FC<RequestsScreenProps> = ({}) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const [personalUserDetail, setPersonalDetail] = useState<{
    username: string;
    location?: 'butwal';
    phoneNumber?: 9841125049;
  }>();

  const [orderlist, setOrderList] = useState<Array<GetDataSubscription>>([]);
  const [isProfileTapped, setIsProfileTapped] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {NoItemFound} = Logos;
  const {data, error} = useSubscription(getSubscribedData, {
    onData: ({client, data}) => {
      console.log('Orders', data);
      if (
        data.data &&
        data.data.events?.eventName &&
        data.data.events.data?.itemRequestReceived
      ) {
        setOrderList(prevOrderList => [
          ...prevOrderList,
          data.data as GetDataSubscription,
        ]);
      }
      if (data.data?.events?.data?.orderReceived) {
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
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    let task = setTimeout(() => {
      setInitialLoading(false);
    }, 3000);

    return () => clearTimeout(task);
  }, []);

  // OnAccpet Handler
  const onAcceptHandle = async (reqeustId: string, itemId: string) => {
    try {
      dispatch(showLoader());

      let response = await createItemRequestOfferFn({
        variables: {
          requestId: reqeustId,
          itemId: itemId,
        },
      });

      let data = response.data;

      if (data) {
        showMessage(
          responseTheme(
            SuccessfullSentTitle,
            SuccessfullSentMessage,
            'success',
          ),
        );
        setIsModalOpen(false);
      }

      if (response.errors) {
        showMessage(
          responseTheme('Please Try again !', 'Something went Wrong', 'danger'),
        );
      }
    } catch (e) {
      showMessage(
        responseTheme('Action Failed !', 'An error occurred', 'danger'),
      );
    }
  };

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
          <SamagraLoaderElement></SamagraLoaderElement>
        </View>
      ) : (
        <>
          <RowFlexLayout
            customStyle={[
              {
                justifyContent: 'space-between',
                marginTop: size.spacing.xl,
                paddingHorizontal: size.spacing.s,
              },
            ]}>
            <AppTextElement
              title="Select Your Service"
              fontSizeVariant="title"
              fontVariant="medium"></AppTextElement>

            <IconButton
              onPress={() => setIsModalOpen(false)}
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
          {/* 9814486061 */}
          {console.log('IMage', myShopItem?.getItems?.edges)}
          <FlatList
            contentContainerStyle={{
              marginTop: size.spacing.s,
              marginBottom: size.spacing.xxl,
            }}
            showsVerticalScrollIndicator={false}
            data={myShopItem?.getItems?.edges}
            renderItem={({item}) => (
              <ListCardMolecule
                onImagePress={() => console.log('Pressed')}
                customImageStyle={{
                  height: 80,
                  width: 80,
                  marginVertical: 5,
                }}
                customStyle={{
                  borderWidth: size.borderWidth.s,
                  borderColor:
                    itemSelectedId === item?.node?.id
                      ? colors.primary
                      : colors.background,
                  paddingHorizontal: size.spacing.xs,
                  marginHorizontal: size.spacing.xs,
                  backgroundColor: colors.background,
                }}
                containerPressedHandle={(id: string) => {
                  setItemSelectedId(id);
                }}
                isContainerPressed
                key={
                  item?.node?.id ??
                  String(item.node?.name) + String(item.node?.price)
                }
                id={item?.node?.id ?? NotMentioned}
                imageUrl={item?.node?.imageUrls?.[0] ?? ImageNotFound}
                list={[
                  {
                    value: titleCase(item?.node?.name) ?? NotMentioned,
                    type: 'title',
                    fontVariant: 'heavy',
                  },
                  {
                    value: item?.node?.price
                      ? `Npr.${item.node?.price} per ${item.node?.unit}`
                      : NotMentioned,
                    type: 'regular',
                  },
                ]}></ListCardMolecule>
            )}></FlatList>
          <AppButtonElement
            onPress={() => {
              onAcceptHandle(requestID, itemSelectedId);
            }}
            style={{
              bottom: 10,
              position: 'absolute',
              right: 0,
              margin: size.spacing.m,
            }}>
            Send Request
          </AppButtonElement>
        </>
      )}
    </>
  );

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
            title={'Location : '}
            fontVariant="medium"
            fontSizeVariant={'title'}></AppTextElement>
          <AppTextElement
            title={
              titleCase(personalUserDetail?.location) ?? 'Baneswor, Kathmandu '
            }
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
  );

  if (initialLoading)
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

  if (!data && error) {
    return (
      <AppTextElement
        fontSizeVariant="regular"
        fontVariant="regular"
        title={error.message}></AppTextElement>
    );
  }

  return (
    <>
      <FlatList
        ListEmptyComponent={
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
                onButtonPress: () => setInitialLoading(true),
                buttonTitle: 'Reload',
              }}></SingnlePageInfoMolecule>
          </View>
        }
        data={orderlist}
        renderItem={({item}) => (
          <ProviderCardMolecule
            list={[
              {
                value:
                  item.events?.data?.itemRequestReceived?.name ?? NotMentioned,
                type: 'title',
                fontVariant: 'medium',
              },
              {
                value:
                  item.events?.data?.itemRequestReceived?.categoryId ??
                  NotMentioned,
                type: 'regular',
              },
              {
                value: titleRange(
                  'Ipsum ipsum aute officia aute laborum magna qui ex nulla.',
                  30,
                ),
                type: 'caption',
              },
            ]}
            key={
              item.events?.data?.itemRequestReceived?.id ??
              String(item.events?.data?.itemRequestReceived?.id)
            }
            isProgressBarEnable={false}
            onAcceptButtonPress={() => {
              setIsModalOpen(true);
              setRequestID(item.events?.data?.itemRequestReceived?.id ?? '');
            }}
            setProfileTapped={() => {
              setPersonalDetail({
                username: item.events?.sender?.username ?? 'Sagar',
                location: 'butwal',
                phoneNumber: 9841125049,
              });
              setIsProfileTapped(true);
            }}
            imageUrl={DummyServiceProviderURL}></ProviderCardMolecule>
        )}></FlatList>

      <Modal
        statusBarTranslucent={true}
        animationType="fade"
        visible={isModalOpen}>
        {isModalOpen && myItemsSection()}
      </Modal>

      {isProfileTapped ? (
        <AppBottomSheetMolecule
          onClose={() => setIsProfileTapped(false)}
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
    paddingHorizontal: size.spacing.s,
    flex: 1,
  },
  emailContainer: {
    marginVertical: size.spacing.xs,
  },
  locationcontainer: {
    marginVertical: size.spacing.xs,
  },
});
