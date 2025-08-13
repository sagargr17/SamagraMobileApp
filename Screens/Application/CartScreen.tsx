import {NetworkStatus, useQuery} from '@apollo/client';
import {useNavigation, useTheme} from '@react-navigation/native';
import {View} from 'moti';
import React, {useState} from 'react';
import {Alert, FlatList, Text, TouchableHighlight} from 'react-native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import AppButtonElement from '../../Components/Elements/ButtonElement';
import {SamagraLoaderElement} from '../../Components/Elements/SamagraLoaderElement';
import {SpacerElement} from '../../Components/Elements/SpacerElement';
import {ListCardMolecule} from '../../Components/Molecules/Cards/ListCardMolecule';
import {AppBottomSheetMolecule} from '../../Components/Molecules/Global/AppBottomSheetMolecule';
import {CounterMolecule} from '../../Components/Molecules/Global/CounterMolecule';
import {SingnlePageInfoMolecule} from '../../Components/Molecules/Global/SinglePageInfo';
import {ListCardSkeleton} from '../../Components/Skeletons/Layout/ListCardSkeleton';
import {ItemImageNotFound} from '../../Constants/UI/AssetsUrls';
import {
  NoCartItemMessage,
  NoCartItemTitle,
  NotMentioned,
} from '../../Constants/UI/Messages';
import {GetBasketItemsQuery} from '../../GraphQL/Queries/CheckoutQueries';
import {size} from '../../Prefrences/Prefrences';
import {
  BasketItemViewModel,
  ItemViewModel,
} from '../../src/__generated__/graphql';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {postPlaceOrderparams} from '../../StateManagement/Orders/PlacedOrderDetailsSlice';
import {AreaMapper, titleRange} from '../../Utilities/CustomMethods';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {Icon} from 'react-native-paper';
import {JumpingTransition} from 'react-native-reanimated';
import {shouldCanonizeResults} from '@apollo/client/cache/inmemory/helpers';

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
  const {Delete, Checkout} = Logos;

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
      <ListCardSkeleton numberOfList={8} numberOfText={2}></ListCardSkeleton>
    );
  if (!loading && error) return <Text>{error.message}</Text>;

  // Handle On Checkout Pressed
  const handleOnCheckoutPressPress = (item: any) => {
    console.log('Item<<<', item?.item);

    if (userLocation)
      dispatch(
        postPlaceOrderparams({
          itemDetails: {
            price: item?.price ?? NotMentioned,
            location: userLocation.address ?? NotMentioned,
            description: item?.description ?? NotMentioned,
            requiredTime: '4hr',
            name: item?.name ?? NotMentioned,
            category: '1',
            imageUrl: item?.imageUrls?.[0] ?? ItemImageNotFound,
          },
          sellerDetails: {
            fullName: item?.user?.username ?? 'Ram Dai',
            address: 'butwal',
            phoneNumber: '9841232323',
          },
          orderDetail: {
            message: 'Fast Gardeennu hai',
            orderQuantity: `1`,
            itemID: item?.id ?? NotMentioned,
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
    <View
      style={{
        marginTop: AreaMapper({value: 100}),
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <SingnlePageInfoMolecule
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
        }}></SingnlePageInfoMolecule>
    </View>
  );

  const rightHandElements = (item: any) => (
    <RowFlexLayout
      style={{
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginRight: size.spacing.xs,
      }}>
      {/* <TouchableHighlight
        underlayColor={colors.card}
        onPress={() => {}}
        style={{
          marginRight: size.spacing.l,
          zIndex: 100,
        }}>
        <Delete
          height={size.iconSize.medium}
          width={size.iconSize.medium}></Delete>
      </TouchableHighlight> */}
      <TouchableHighlight
        underlayColor={colors.card}
        onPress={() => {
          handleOnCheckoutPressPress(item);
        }}
        style={{
          zIndex: 100,
        }}>
        <Checkout
          height={size.iconSize.medium}
          width={size.iconSize.medium}></Checkout>
      </TouchableHighlight>
    </RowFlexLayout>
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
          paddingHorizontal: size.spacing.s,
        }}
        data={data?.getBasketItems?.edges}
        renderItem={({item, index}) => (
          <ListCardMolecule
            onImagePress={() => {
              if (item.node?.item?.id && item.node.item?.name)
                onHanleImagePress(item.node?.item?.id, item.node?.item?.name);
            }}
            child={rightHandElements(item.node?.item)}
            customImageStyle={{
              height: AreaMapper({
                value: 80,
              }),
              width: AreaMapper({
                value: 80,
              }),
              marginVertical: size.spacing.xs + 2,
            }}
            isContainerPressed={false}
            imageUrl={item?.node?.item?.imageUrls?.[0] ?? ItemImageNotFound}
            id={item?.node?.id ?? 'Not Mentioned'}
            key={index}
            customStyle={{
              padding: size.spacing.xs + 2,
            }}
            list={[
              {
                value: titleRange(item?.node?.item?.name ?? NotMentioned),
                type: 'title',
                fontVariant: 'heavy',
              },
              {
                value: `Npr.${item.node?.item?.price ?? NotMentioned}`,
                type: 'regular',
                style: {
                  color: '#4573A1',
                },
              },
            ]}
            surfaceLevel={1}></ListCardMolecule>
        )}
        ListFooterComponent={
          <>
            <>
              {isFetchingMore ? (
                <SamagraLoaderElement></SamagraLoaderElement>
              ) : null}
            </>
          </>
        }></FlatList>
    </>
  );
};
