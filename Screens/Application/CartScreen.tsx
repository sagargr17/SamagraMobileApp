import {useQuery} from '@apollo/client';
import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {AppText} from '../../Components/Elements/AppText';
import {GetBasketItemsQuery} from '../../GraphQL/Queries/CheckoutQueries';
import {size} from '../../Prefrences/Prefrences';
import {Rating} from '../../Components/Elements/Rating';
import {NotMentioned} from '../../Constants/UI/Messages';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {postPlaceOrderparams} from '../../StateManagement/Orders/PlaceOrderDetailsParams';
import {ItemImageNotFound} from '../../Constants/UI/AssetsUrls';

interface CartScreenProps {}

export const CartScreen: React.FC<CartScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);

  const {data, loading, error} = useQuery(GetBasketItemsQuery);

  if (loading) return <ActivityIndicator></ActivityIndicator>;
  if (!loading && error) return <Text>{error.message}</Text>;

  return (
    <>
      <FlatList
        ListEmptyComponent={<Text>No any Item in Cart Found</Text>}
        contentContainerStyle={{
          padding: size.spacing.s,
        }}
        data={data?.getBasketItems?.nodes}
        ListHeaderComponent={
          <AppText
            customStyle={{
              margin: size.spacing.xs,
            }}
            fontSizeVariant="display"
            fontVariant="bold"
            title={`CART`}></AppText>
        }
        renderItem={({item, index}) => (
          <View
            key={index}
            style={{
              backgroundColor: colors.card,
              borderWidth: size.borderWidth.s,
              padding: size.spacing.xs,
              margin: size.spacing.xs,
            }}>
            <AppText
              fontSizeVariant="regular"
              fontVariant="bold"
              title={item?.item?.name ?? NotMentioned}></AppText>
            <AppText
              fontSizeVariant="regular"
              fontVariant="bold"
              title={`Price: ${item?.item?.price}`}></AppText>
            <Rating ratingNumber={item?.item?.starRating}></Rating>
            <Button
              title="Place Order"
              onPress={() => {
                dispatch(
                  postPlaceOrderparams({
                    itemParams: {
                      location: 'Butwal',
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
                navigation.navigate('ApplicationOverlay', {
                  screen: 'PlaceOrderScreen',
                });
              }}></Button>
          </View>
        )}></FlatList>
    </>
  );
};
