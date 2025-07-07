import {NetworkStatus, useQuery} from '@apollo/client';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, Text} from 'react-native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import AppButton from '../../Components/Elements/Button';
import {Spacer} from '../../Components/Elements/Spacer';
import {ListCard} from '../../Components/Molecules/Cards/ListCard';
import {AppBottomSheet} from '../../Components/Molecules/Global/AppBottomSheet';
import {Counter} from '../../Components/Molecules/Global/Counter';
import {SamagraLoader} from '../../Components/Molecules/Response/SamagraLoader';
import {SingnlePageInfo} from '../../Components/Organism/SinglePageInfo';
import {ListCardSkeleton} from '../../Components/Skeletons/Layout/ListCardSkeleton';
import {ItemImageNotFound} from '../../Constants/UI/AssetsUrls';
import {
  NoCartItemMessage,
  NoCartItemTitle,
  NotMentioned,
} from '../../Constants/UI/Messages';
import {GetBasketItemsQuery} from '../../GraphQL/Queries/CheckoutQueries';
import {size} from '../../Prefrences/Prefrences';
import {BasketItemViewModel} from '../../src/__generated__/graphql';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {postPlaceOrderparams} from '../../StateManagement/Orders/PlaceOrderDetailsParams';
import {AreaMapper, titleRange} from '../../Utilities/CustomMethods';

interface CartScreenProps {}

export const CartScreen: React.FC<CartScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.Profile);
  const {NoItemFound} = Logos;
  const userLocation = useAppSelector(state => state.user.userLocation);
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);
  const [counterValue, setCounterValue] = useState<number | null>();
  const [pressedItem, setPressedItem] = useState<BasketItemViewModel | any>();
  const [isBottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);

  const {data, loading, error, networkStatus, fetchMore} = useQuery(
    GetBasketItemsQuery,
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

  const isLoadingInitialData =
    loading && !data && networkStatus === NetworkStatus.loading;

  const isFetchingMore =
    networkStatus === NetworkStatus.fetchMore || paginationLoading;

  if (isLoadingInitialData)
    return (
      <ListCardSkeleton numberOfList={8} numberOfText={3}></ListCardSkeleton>
    );
  if (!loading && error) return <Text>{error.message}</Text>;

  console.log('USerLocation....', userLocation?.address);

  const handleOnCheckoutPressPress = (item: BasketItemViewModel | null) => {
    if (userLocation)
      dispatch(
        postPlaceOrderparams({
          itemDetails: {
            price: item?.item?.price ?? NotMentioned,
            location: userLocation.address ?? NotMentioned,
            description: item?.item?.description ?? NotMentioned,
            requiredTime: '4hr',
            name: item?.item?.name ?? NotMentioned,
            category: '1',
            imageUrl: item?.item?.imageUrls?.[0] ?? ItemImageNotFound,
          },
          sellerDetails: {
            fullName: user?.username ?? NotMentioned,
            address: item?.item?.shop?.location ?? NotMentioned,
            shopName: item?.item?.shop?.name ?? NotMentioned,
            phoneNumber: item?.item?.shop?.phoneNumber ?? '9841232323',
          },
          orderDetail: {
            message: 'Fast Gardeennu hai',
            orderQuantity: `${
              counterValue
                ? counterValue
                : item?.item?.price / (counterValue ? item?.item?.price : 1)
            }`,
            itemID: item?.item?.id ?? NotMentioned,
          },
        }),
      );

    navigation.navigate('PlaceOrderScreen');
  };

  const onHanleImagePress = (id: string, name: string) => {
    navigation.navigate('ItemDetailScreen', {
      id: id,
      name: name,
    });
  };

  const emptyElement = (
    <SingnlePageInfo
      icon={
        <NoItemFound
          height={AreaMapper({
            value: 200,
          })}
          width="100%"></NoItemFound>
      }
      detail={{
        title: NoCartItemTitle,
        message: NoCartItemMessage,
        onButtonPress: () => navigation.goBack(),
        buttonTitle: 'Shop Again !!',
      }}></SingnlePageInfo>
  );

  const child = (
    <>
      <ListCard
        onImagePress={() =>
          onHanleImagePress(
            pressedItem?.id ?? NotMentioned,
            pressedItem?.item?.name ?? NotMentioned,
          )
        }
        imageUrl={pressedItem?.item?.imageUrls?.[0] ?? ItemImageNotFound}
        id={pressedItem?.item?.id ?? NotMentioned}
        list={[
          {
            value: titleRange(pressedItem?.item?.name),
            type: 'regular',
            fontVariant: 'bold',
          },
          {
            value: `Npr.${pressedItem?.item?.price ?? NotMentioned}`,
            type: 'regular',
          },
          {
            value: `Total : NPR.${counterValue ?? pressedItem?.item?.price}`,
            type: 'title',
            fontVariant: 'heavy',
            style: {
              color: colors.primary,
              marginTop: size.spacing.xxs,
            },
          },
        ]}></ListCard>
      <Spacer height={5}></Spacer>
      <Counter
        setTotal={quantity => {
          setCounterValue(quantity * pressedItem?.item.price);
        }}></Counter>
      <Spacer height={25}></Spacer>
      <AppButton onPress={() => handleOnCheckoutPressPress(pressedItem)}>
        Checkout
      </AppButton>
      <Spacer height={15}></Spacer>
    </>
  );

  return (
    <>
      <FlatList
        onEndReached={() => {
          if (data?.getBasketItems?.pageInfo.hasNextPage && !isFetchingMore) {
            fetchMore({
              variables: {after: data?.getBasketItems?.pageInfo.endCursor},
            });
          }
        }}
        onEndReachedThreshold={0.6}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={emptyElement}
        contentContainerStyle={{
          paddingHorizontal: size.spacing.xxs,
        }}
        data={data?.getBasketItems?.edges}
        renderItem={({item, index}) => (
          <ListCard
            isContainerPressed={true}
            containerPressedHandle={() => {
              isBottomSheetOpen === true
                ? null
                : setBottomSheetOpen(!isBottomSheetOpen);
              if (item && item.node) {
                setCounterValue(null);
                setPressedItem(item.node);
              }
            }}
            imageUrl={item?.node?.item?.imageUrls?.[0] ?? ItemImageNotFound}
            id={item?.node?.id ?? 'Not Mentioned'}
            key={index}
            customStyle={{
              marginBottom: size.spacing.xxs,
            }}
            list={[
              {
                value: titleRange(item?.node?.item?.name ?? NotMentioned),
                type: 'regular',
                fontVariant: 'bold',
              },
              {
                value: `Npr.${item.node?.item?.price ?? NotMentioned}`,
                type: 'regular',
              },
              {
                value: `${titleRange(
                  item.node?.item?.shop?.name ?? NotMentioned,
                )}`,
                type: 'regular',
                style: {
                  color: colors.primary,
                },
              },
            ]}
            surfaceLevel={1}></ListCard>
        )}
        ListFooterComponent={
          <>
            <>{isFetchingMore ? <SamagraLoader></SamagraLoader> : null}</>
          </>
        }></FlatList>
      <AppBottomSheet
        onClose={() => setBottomSheetOpen(!isBottomSheetOpen)}
        flexHeight={0.2}
        isOppen={isBottomSheetOpen}
        pannigGesture={true}
        title="Counter"
        children={() => child}></AppBottomSheet>
    </>
  );
};
