import {useQuery} from '@apollo/client';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
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
import {AreaMapper} from '../../Utilities/CustomMethods';
import {GetAuthenticateClient} from '../../client/Graphql/AuthenticatedClient';

interface CartScreenProps {}

export const CartScreen: React.FC<CartScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const {NoItemFound} = Logos;
  const userLocation = useAppSelector(state => state.user.user?.location);
  const {data, loading, error} = useQuery(GetBasketItemsQuery);
  // console.log('Result>>>', data, loading, error);

  if (loading)
    return (
      <ListCardSkeleton numberOfList={8} numberOfText={3}></ListCardSkeleton>
    );
  if (!loading && error) return <Text>{error.message}</Text>;

  const handleOnCheckoutPressPress = (item: any) => {
    if (userLocation)
      dispatch(
        postPlaceOrderparams({
          itemDetails: {
            price: 2,
            location: userLocation,
            description: 'Awesome',
            requiredTime: '4hr',
            name: item?.item?.name ?? NotMentioned,
            category: '1',
            imageUrl: item?.item?.imageUrls?.[0] ?? ItemImageNotFound,
          },
          sellerDetails: {
            fullName: user?.username ?? NotMentioned,
            address: user?.location ?? NotMentioned,
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

  const isAuthenticated = GetAuthenticateClient;

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={emptyElement}
      contentContainerStyle={{
        paddingHorizontal: size.spacing.xxs,
      }}
      data={data?.getBasketItems?.nodes}
      renderItem={({item, index}) => (
        <ListCard
          imageUrl={item?.item?.imageUrls?.[0] ?? ItemImageNotFound}
          id={item?.id ?? 'Not Mentioned'}
          key={index}
          onImagePress={() => {
            onHanleImagePress(
              item?.item?.id ?? NotMentioned,
              item?.item?.name ?? NotMentioned,
            );
          }}
          customStyle={{
            marginBottom: size.spacing.xxs,
          }}
          list={[
            {
              value: item?.item?.name ?? NotMentioned,
              type: 'title',
            },
            {
              value: item?.item?.name ?? NotMentioned,
              type: 'regular',
            },
          ]}
          surfaceLevel={1}></ListCard>
      )}></FlatList>
  );
};
