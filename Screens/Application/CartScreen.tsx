import {NetworkStatus, useQuery} from '@apollo/client';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text, TouchableHighlight, View} from 'react-native';
import {ActivityIndicator, Icon, IconButton} from 'react-native-paper';
import {AppText} from '../../Components/Elements/AppText';
import {GetBasketItemsQuery} from '../../GraphQL/Queries/CheckoutQueries';
import {size} from '../../Prefrences/Prefrences';
import {Rating} from '../../Components/Elements/Rating';
import {
  EmptyMessage,
  NoCartItemMessage,
  NoCartItemTitle,
  NotMentioned,
} from '../../Constants/UI/Messages';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {postPlaceOrderparams} from '../../StateManagement/Orders/PlaceOrderDetailsParams';
import {ImageNotFound, ItemImageNotFound} from '../../Constants/UI/AssetsUrls';
import {ListCard} from '../../Components/Molecules/Cards/ListCard';
import {ListCardSkeleton} from '../../Components/Skeletons/Layout/ListCardSkeleton';
import {State} from 'react-native-gesture-handler';
import {UserLocationRenderMode} from '@maplibre/maplibre-react-native';
import {ApplicationOverlayStackProps} from '../../Navigators/Stack/ApplicationOverlayStackNavigator';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {
  SingnlePageInfo,
  SingnlePageInfoProps,
} from '../../Components/Organism/SinglePageInfo';
import {AreaMapper, titleCase, titleRange} from '../../Utilities/CustomMethods';
import {GetAuthenticateClient} from '../../client/Graphql/AuthenticatedClient';
import {Counter} from '../../Components/Molecules/Global/Counter';
import {BasketItemViewModel} from '../../src/__generated__/graphql';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {SamagraLoader} from '../../Components/Molecules/Response/SamagraLoader';
import {getDefaultFetchPolicy} from '@apollo/client/react/hooks/useQuery';

interface CartScreenProps {}

export const CartScreen: React.FC<CartScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const {NoItemFound} = Logos;
  const userLocation = useAppSelector(state => state.user.userLocation);
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(1);

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

  const handleOnCheckoutPressPress = (item: BasketItemViewModel | null) => {
    if (userLocation)
      dispatch(
        postPlaceOrderparams({
          itemDetails: {
            price: 2,
            location: userLocation.address ?? NotMentioned,
            description: 'Awesome',
            requiredTime: '4hr',
            name: item?.item?.name ?? NotMentioned,
            category: '1',
            imageUrl: item?.item?.imageUrls?.[0] ?? ItemImageNotFound,
          },
          sellerDetails: {
            fullName: user?.username ?? NotMentioned,
            address: NotMentioned,
            shopName: 'Butwal',
            phoneNumber: '9841150490',
          },
          orderDetail: {
            message: 'Please Fast GArdeenu',
            orderQuantity: '2',
            itemID: item?.item?.id ?? NotMentioned,
          },
        }),
      );
    // navigation.navigate('ApplicationOverlay', {
    //   screen: 'PlaceOrderScreen',
    // });
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

  return (
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
          imageUrl={item?.node?.item?.imageUrls?.[0] ?? ItemImageNotFound}
          id={item?.node?.id ?? 'Not Mentioned'}
          key={index}
          onImagePress={() => {
            onHanleImagePress(
              item.node?.id ?? NotMentioned,
              item?.node?.item?.name ?? NotMentioned,
            );
          }}
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
        isFetchingMore ? <SamagraLoader></SamagraLoader> : null
      }></FlatList>
  );
};
