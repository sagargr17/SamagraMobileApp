import {NetworkStatus, useQuery} from '@apollo/client';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {AppText} from '../../../Components/Elements/AppText';
import AppButton from '../../../Components/Elements/Button';
import {Spacer} from '../../../Components/Elements/Spacer';
import {ListCard} from '../../../Components/Molecules/Cards/ListCard';
import {AppBottomSheet} from '../../../Components/Molecules/Global/AppBottomSheet';
import {AppSerchBar} from '../../../Components/Molecules/Global/AppSerchBar';
import {SingnlePageInfo} from '../../../Components/Organism/SinglePageInfo';
import {ListCardSkeleton} from '../../../Components/Skeletons/Layout/ListCardSkeleton';
import {ImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {
  NoCartItemTitle,
  NoItemInShop,
  NotMentioned,
} from '../../../Constants/UI/Messages';
import {getMyOrdersItem} from '../../../GraphQL/Queries/PrivateShopQueries';
import {RowFlexLayout} from '../../../Layout/PartationLayout/RowFlexLayout';
import {FlatListScreen} from '../../../Layout/ScreenLayout/FlatListScreenLayout';
import {size} from '../../../Prefrences/Prefrences';
import DateTimeToAgoTime, {
  AreaMapper,
  titleCase,
} from '../../../Utilities/CustomMethods';

interface OrderScreenProps {}

export const PendingOrderScreen: React.FC<OrderScreenProps> = ({}) => {
  const {colors} = useTheme();
  const route = useRoute<any>();
  const {NoItemFound} = Logos;
  const navigation = useNavigation<any>();
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);
  const {data, loading, error, fetchMore, networkStatus} = useQuery(
    getMyOrdersItem,
    {
      notifyOnNetworkStatusChange: true,
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

  if (isLoadingInitialData) return <ListCardSkeleton numberOfList={6}></ListCardSkeleton>;
  if (error) return <Text>Error</Text>;

  const emptyNode = (
    <SingnlePageInfo
      icon={<NoItemFound height={AreaMapper({value: 150})} width={'90%'} />}
      detail={{
        title: NoCartItemTitle,
        message: NoItemInShop,
        onButtonPress: () => handleNavigation(),
        buttonTitle: 'Add Item',
      }}></SingnlePageInfo>
  );

  const child = (
    <View>
      <ListCard
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
        ]}></ListCard>
      <Spacer></Spacer>
      <View>
        <AppText
          title="Full Name:"
          fontSizeVariant="title"
          fontVariant="heavy"></AppText>
        <AppText title={personalDetail?.fullName ?? NotMentioned}></AppText>
        <Spacer></Spacer>
        <AppText
          title="Phone:"
          fontSizeVariant="title"
          fontVariant="heavy"></AppText>
        <AppText title={personalDetail?.phoneNumber ?? NotMentioned}></AppText>
        <Spacer></Spacer>
        <AppText
          title="Address:"
          fontSizeVariant="title"
          fontVariant="heavy"></AppText>
        <AppText title={personalDetail?.address ?? NotMentioned}></AppText>
        {/* <Spacer height={20}></Spacer> */}
        <RowFlexLayout
          customStyle={{
            justifyContent: 'flex-start',
            // backgroundColor: colors.card,
            // paddingHorizontal: size.spacing.s,
            paddingVertical: size.spacing.m,
          }}>
          <AppText
            title="Note:"
            fontVariant="heavy"
            customStyle={{
              color: colors.primary,
            }}></AppText>
          <AppText
            title={`"${personalDetail?.message ?? NotMentioned}"`}
            customStyle={{
              marginLeft: size.spacing.xs,
            }}></AppText>
        </RowFlexLayout>

        <Spacer height={5}></Spacer>
        <AppButton onPress={() => console.log('Pressed')}>Completed</AppButton>
        <Spacer height={10}></Spacer>
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
        // ListHeaderComponent={
        //   <View
        //     style={{
        //       marginVertical: size.spacing.xxs,
        //     }}>
        //     <AppSerchBar
        //       placeHolder="Search By Buyer Name"
        //       onPress={() => console.log('>>')}></AppSerchBar>
        //   </View>
        // }
        contentContainerStyle={{
          paddingHorizontal: size.spacing.xs,
        }}
        ListEmptyComponent={emptyNode}
        data={data?.getOrders?.edges}
        renderItem={({item, index}) => (
          <ListCard
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
                value: DateTimeToAgoTime(item?.node?.dateTime),
                style: {
                  color: colors.notification,
                },
                fontVariant: 'regular',
              },
              {
                type: 'regular',
                value: `Qty: ${item?.node?.quantity ?? NotMentioned}`,
                fontVariant: 'regular',
                style: {
                  color: colors.background,
                  backgroundColor: 'gray',
                  borderRadius: size.borderRadius.full,
                  paddingHorizontal: size.spacing.xs,
                  paddingVertical: size.spacing.xxs,
                  left: AreaMapper({value: 185}),
                },
              },
            ]}></ListCard>
        )}
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator size={'small'} color={colors.primary} />
          ) : null
        }></FlatListScreen>

      {isBottomSheetOpen ? (
        <AppBottomSheet
          onClose={() => setIsBottomSheetOpen(!isBottomSheetOpen)}
          flexHeight={1}
          pannigGesture={true}
          title="Working"
          isOppen={isBottomSheetOpen}
          children={() => {
            return child;
          }}></AppBottomSheet>
      ) : null}
    </>
  );
};
