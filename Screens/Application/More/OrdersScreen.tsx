import {NetworkStatus, useQuery} from '@apollo/client';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {AppTextElement} from '../../../Components/Elements/AppTextElement';
import AppButtonElement from '../../../Components/Elements/ButtonElement';
import {SpacerElement} from '../../../Components/Elements/SpacerElement';
import {ListCardMolecule} from '../../../Components/Molecules/Cards/ListCardMolecule';
import {AppBottomSheetMolecule} from '../../../Components/Molecules/Global/AppBottomSheetMolecule';
import {SerchBarMolecule} from '../../../Components/Molecules/Global/AppSerchBarMolecule';
import {SingnlePageInfoMolecule} from '../../../Components/Molecules/Global/SinglePageInfo';
import {ListCardSkeleton} from '../../../Components/Skeletons/Layout/ListCardSkeleton';
import {ImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {
  NoCartItemTitle,
  NoItemInShop,
  NotMentioned,
} from '../../../Constants/UI/Messages';

import {RowFlexLayout} from '../../../Layout/PartationLayout/RowFlexLayout';
import {FlatListScreen} from '../../../Layout/ScreenLayout/FlatListScreenLayout';
import {size} from '../../../Prefrences/Prefrences';
import DateTimeToAgoTime, {
  AreaMapper,
  titleCase,
} from '../../../Utilities/CustomMethods';
import {getMyOrdersItem} from '../../../GraphQL/Queries/OrdersQueries';

interface OrderScreenProps {}

export const OrderScreen: React.FC<OrderScreenProps> = ({}) => {
  const {colors} = useTheme();
  const route = useRoute<any>();
  const {NoItemFound} = Logos;
  const navigation = useNavigation<any>();
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);
  const {data, loading, error, fetchMore, networkStatus} = useQuery(
    getMyOrdersItem,
    {
      variables: {after: null},
      onCompleted: () => {
        setPaginationLoading(false);
      },
      onError: () => {
        setPaginationLoading(false);
      },
    },
  );
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [personalDetail, setPersonalDetail] = useState<{
    id?: string | null;
    itemName: string;
    isCompleted: boolean;
    price: any;
    address: string;
    quantity: number;
    dateTime: any;
    completionDateTime: any;
    phoneNumber: string;
    fullName: string;
    message: string;
  }>();
  const isLoadingInitialData =
    loading && !data && networkStatus === NetworkStatus.loading;

  const isFetchingMore =
    networkStatus === NetworkStatus.fetchMore || paginationLoading;

  // Handle Navigation
  const handleNavigation = () => {
    // Navigation navigate
    navigation.navigate('ApplicationOverlay', {
      screen: 'AddItemScreen',
      params: {
        shopId: route.params.shopId,
        shopName: 'Add Item',
      },
    });
  };

  if (isLoadingInitialData)
    return <ListCardSkeleton numberOfList={6}></ListCardSkeleton>;
  if (error) return <Text>Error</Text>;

  const emptyNode = (
    <SingnlePageInfoMolecule
      icon={<NoItemFound height={AreaMapper({value: 150})} width={'90%'} />}
      detail={{
        title: NoCartItemTitle,
        message: NoItemInShop,
        onButtonPress: () => handleNavigation(),
        buttonTitle: 'Add Item',
      }}></SingnlePageInfoMolecule>
  );

  const child = (
    <View>
      <ListCardMolecule
        customStyle={{
          height: AreaMapper({value: 100}),
        }}
        customImageStyle={{
          height: AreaMapper({value: 60}),
        }}
        imageUrl={ImageNotFound}
        id={personalDetail?.id ?? `${Math.random()}`}
        list={[
          {
            value: titleCase(personalDetail?.itemName ?? NotMentioned),
            type: 'title',
          },
          {
            value: `Rs.${personalDetail?.price ?? NotMentioned}`,
            type: 'regular',
          },
          {
            value: `${personalDetail?.dateTime.split('T')[0] ?? NotMentioned} ${
              personalDetail?.dateTime.split('T')[1].split('.')[0] ??
              NotMentioned
            }`,
            type: 'regular',
            fontVariant: 'heavy',
          },
        ]}></ListCardMolecule>
      <SpacerElement></SpacerElement>
      <View>
        <AppTextElement
          title="Full Name:"
          fontSizeVariant="title"
          fontVariant="heavy"></AppTextElement>
        <AppTextElement title={personalDetail?.fullName ?? NotMentioned}></AppTextElement>
        <SpacerElement></SpacerElement>
        <AppTextElement
          title="Phone:"
          fontSizeVariant="title"
          fontVariant="heavy"></AppTextElement>
        <AppTextElement title={personalDetail?.phoneNumber ?? NotMentioned}></AppTextElement>
        <SpacerElement></SpacerElement>
        <AppTextElement
          title="Address:"
          fontSizeVariant="title"
          fontVariant="heavy"></AppTextElement>
        <AppTextElement title={personalDetail?.address ?? NotMentioned}></AppTextElement>
        {/* <Spacer height={20}></Spacer> */}
        <RowFlexLayout
          customStyle={{
            justifyContent: 'flex-start',
            // backgroundColor: colors.card,
            // paddingHorizontal: size.spacing.s,
            paddingVertical: size.spacing.m,
          }}>
          <AppTextElement
            title="Note:"
            fontVariant="heavy"
            customStyle={{
              color: colors.primary,
            }}></AppTextElement>
          <AppTextElement
            title={`"${personalDetail?.message ?? NotMentioned}"`}
            customStyle={{
              marginLeft: size.spacing.xs,
            }}></AppTextElement>
        </RowFlexLayout>

        <SpacerElement height={5}></SpacerElement>
        <AppButtonElement onPress={() => console.log('Pressed')}>Completed</AppButtonElement>
        <SpacerElement height={10}></SpacerElement>
      </View>
    </View>
  );

  return (
    <>
      <FlatListScreen
        onEndReached={() => {
          if (data?.getOrders?.pageInfo.hasNextPage && !isFetchingMore) {
            fetchMore({
              variables: {after: data?.getOrders?.pageInfo.endCursor},
            });
          }
        }}
        onEndReachedThreshold={0.6}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: size.spacing.xs,
        }}
        ListEmptyComponent={emptyNode}
        data={data?.getOrders?.edges}
        renderItem={({item, index}) => (
          <ListCardMolecule
            customImageStyle={{
              height: AreaMapper({value: 100}),
            }}
            onImagePress={() => {
              console.log('Pressed', isBottomSheetOpen);

              setIsBottomSheetOpen(!isBottomSheetOpen);
              setPersonalDetail({
                itemName: item?.node?.itemName ?? NotMentioned,
                address: item?.node?.address ?? NotMentioned,
                isCompleted: item?.node?.isCompleted ?? false,
                quantity: item?.node?.quantity ?? 2,
                dateTime: item?.node?.dateTime,
                completionDateTime: item?.node?.completionDateTime,
                price: item?.node?.price,
                phoneNumber: item?.node?.phoneNumber ?? NotMentioned,
                fullName: item?.node?.fullName ?? NotMentioned,
                message: item?.node?.message ?? NotMentioned,
              });
            }}
            surfaceLevel={1}
            id={item?.node?.id ?? NotMentioned}
            imageUrl={ImageNotFound}
            list={[
              {
                type: 'regular',
                value: titleCase(item?.node?.itemName ?? NotMentioned),
                fontVariant: 'bold',
              },
              {
                type: 'regular',
                value: titleCase(item?.node?.address ?? NotMentioned),
                fontVariant: 'regular',
              },
              {
                type: 'regular',
                value: `Qty: ${item?.node?.quantity ?? NotMentioned}`,
                fontVariant: 'regular',
              },
              {
                type: 'caption',
                value: DateTimeToAgoTime(item?.node?.dateTime),
                style: {
                  color: colors.background,
                  backgroundColor: 'gray',
                  borderRadius: size.borderRadius.xs,
                  paddingHorizontal: size.spacing.xs,
                  paddingVertical: size.spacing.xxs,
                  marginTop: 5,
                },
                fontVariant: 'regular',
              },
            ]}></ListCardMolecule>
        )}
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator size={'small'} color={colors.primary} />
          ) : null
        }></FlatListScreen>

      {isBottomSheetOpen ? (
        <AppBottomSheetMolecule
          onClose={() => setIsBottomSheetOpen(!isBottomSheetOpen)}
          pannigGesture={true}
          isOppen={isBottomSheetOpen}
          children={() => {
            return child;
          }}></AppBottomSheetMolecule>
      ) : null}
    </>
  );
};
