import {useQuery} from '@apollo/client';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';
import {AppTextElement} from '../../Components/Elements/AppTextElement';
import {RatingElement} from '../../Components/Elements/RatingElement';
import {SpacerElement} from '../../Components/Elements/SpacerElement';
import {CounterMolecule} from '../../Components/Molecules/Global/CounterMolecule';
import {ItemCheckOutBarMolecule} from '../../Components/Molecules/Global/ItemCheckOutBarMolecule';
import {SamagraLoaderElement} from '../../Components/Elements/SamagraLoaderElement';
import {CommentLayout} from '../../Components/Organism/ApplicationOverLays/Home/CommentBoxOrganism';
import {ImageSliderModal} from '../../Components/Organism/ApplicationOverLays/ImageSliderModalOrganism';
import {NotMentioned} from '../../Constants/UI/Messages';
import {getPublicItemsById} from '../../GraphQL/Queries/ItemQueries';
import {ItemDetailScreenRouteProp} from '../../Navigators/Stack/ApplicationOverlayStackNavigator';
import {size} from '../../Prefrences/Prefrences';
import {hideLoader} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {postPlaceOrderparams} from '../../StateManagement/Orders/PlacedOrderDetailsSlice';
import {titleCase, titleRange} from '../../Utilities/CustomMethods';
import {ImageNotFound} from '../../Constants/UI/AssetsUrls';
order: null;
interface ItemDetailScreenProps {
  route: ItemDetailScreenRouteProp;
}

export const ItemDetailScreen: React.FC<ItemDetailScreenProps> = ({route}) => {
  const {colors} = useTheme();
  const [isCheckoutVisible, setIsCheckoutVisible] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const {data, loading, error} = useQuery(getPublicItemsById, {
    variables: {
      id: route.params.id,
    },
    fetchPolicy: 'cache-and-network',
  });

  const navigation = useNavigation<any>();

  const [totalPrice, setTotalPrice] = useState<number>(0);

  // HandleTotalPrice
  const handleTotalPrice = (Quantity: number) => {
    setTotalPrice((data?.getPublicItems?.nodes?.[0]?.price ?? 0) * Quantity);
  };

  console.log('ItemDetail...', data?.getPublicItems?.nodes?.[0]?.imageUrls);

  const itemDetailContainer = () => {
    return (
      <View>
        <AppTextElement
          fontSizeVariant={'caption'}
          title={titleCase(
            titleCase(data?.getPublicItems?.nodes?.[0]?.shop?.name) ??
              'Not Mentioned',
          )}
          fontVariant="medium"
          customStyle={{
            margin: 0,
            paddingHorizontal: 8,
            paddingVertical: 4,
            bottom: 215,
            right: 0,
            backgroundColor: colors.card,
            position: 'absolute',
            borderRadius: 20,
            borderColor: colors.border,
            borderWidth: size.borderWidth.xs,
          }}></AppTextElement>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <AppTextElement
            fontSizeVariant={'title'}
            title={titleCase(
              data?.getPublicItems?.nodes?.[0]?.name ?? 'Not Mentioned',
            )}
            fontVariant="medium"
            customStyle={{
              margin: 0,
              padding: 0,
            }}></AppTextElement>
          <IconButton
            icon="heart-outline"
            size={24}
            onPress={() => console.log('Added to wishlist')}
            style={styles.wishlistButton}
            iconColor={colors.notification}
          />
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: 'pink',
            justifyContent: 'flex-start',
          }}>
          <AppTextElement
            customStyle={{
              backgroundColor: 'gray',
              color: colors.background,
              paddingHorizontal: size.spacing.xxs,
            }}
            fontSizeVariant={'regular'}
            title={titleCase('423 Sold')}
            fontVariant="regular"></AppTextElement>
          <RatingElement ratingNumber={3}></RatingElement>
        </View>
        <SpacerElement height={8}></SpacerElement>
        <View>
          <AppTextElement
            fontSizeVariant={'title'}
            title={titleCase('Description')}
            fontVariant="medium"></AppTextElement>
          <SpacerElement height={2}></SpacerElement>
          <AppTextElement
            fontSizeVariant={'regular'}
            // title={titleCase(
            //   data?.getPublicItems?.nodes?.[0]?.description ?? 'Not Mentioned',
            // )}
            title={titleRange(
              data?.getPublicItems?.nodes?.[0]?.description ??
                'Commodo ut Lorem reprehenderit commodo amet nulla. Voluptate elit irure consequat cillum elit. Aliquip ea cillum anim tempor ea minim consectetur pariatur in dolore sunt. Ea enim voluptate sit aute sint est ipsum quis commodo. Ad dolore reprehenderit enim ut amet cupidatat sunt ipsum laborum deserunt nisi excepteur culpa consectetur. Reprehenderit proident irure eu dolore elit laboris ipsum minim fugiat. Tempor cupidatat sit dolore pariatur ut.',
              130,
            )}
            customStyle={{
              textAlign: 'justify',
            }}
            fontVariant="regular"></AppTextElement>
          <SpacerElement></SpacerElement>
        </View>

        <SpacerElement height={14}></SpacerElement>
        <CounterMolecule
          setTotal={(Quantity: number) => {
            handleTotalPrice(Quantity);
          }}></CounterMolecule>
        <SpacerElement height={24}></SpacerElement>
        <Divider></Divider>
        <SpacerElement height={8}></SpacerElement>
      </View>
    );
  };
  const user = useAppSelector(state => state.user.Profile);

  if (error) return <Text>ErrorItemCheckOut {error.message}</Text>;
  if (loading) return <SamagraLoaderElement></SamagraLoaderElement>;

  // if(data && !error && !loading)
  const handleBuyNow = () => {
    console.log('Qunatity');

    dispatch(
      postPlaceOrderparams({
        itemDetails: {
          price: data?.getPublicItems?.nodes?.[0]?.price,
          location: 'Butwal',
          description:
            data?.getPublicItems?.nodes?.[0]?.description ?? NotMentioned,
          requiredTime: '3hr',
          name: data?.getPublicItems?.nodes?.[0]?.name ?? NotMentioned,
          category: 'Vegitable',
          imageUrl:
            data?.getPublicItems?.nodes?.[0]?.imageUrls?.[0] ?? ImageNotFound,
        },
        sellerDetails: {
          fullName:
            data?.getPublicItems?.nodes?.[0]?.shop?.user?.username ??
            NotMentioned,
          address: 'Butwal',
          shopName:
            data?.getPublicItems?.nodes?.[0]?.shop?.name ?? NotMentioned,
          phoneNumber:
            data?.getPublicItems?.nodes?.[0]?.shop?.phoneNumber ?? NotMentioned,
        },
        orderDetail: {
          message: 'chito gardeenu hai',
          orderQuantity: `${
            totalPrice === 0
              ? 1
              : totalPrice / data?.getPublicItems?.nodes?.[0]?.price
          }`,
          itemID: data?.getPublicItems?.nodes?.[0]?.id ?? '1',
        },
      }),
    );

    navigation.navigate('ApplicationOverlay', {
      screen: 'PlaceOrderScreen',
    });
  };

  console.log('UserSsss', data);

  return (
    <View
      style={{
        flex: 1,
        // paddingHorizontal: size.spacing.xs
      }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[1]}
        renderItem={({item, index}) => (
          <>
            <ImageSliderModal
              images={
                data?.getPublicItems?.nodes?.[0]?.imageUrls
                  ?.filter((url): url is string => url !== null)
                  .map(url => ({url: url})) ?? [
                  {
                    url: 'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?semt=ais_hybrid&w=740',
                  },
                ]
              }></ImageSliderModal>
            {/* <Spacer height={16}></Spacer> */}
            <Divider></Divider>
            <View
              style={{
                paddingHorizontal: size.spacing.xs,
              }}>
              {itemDetailContainer()}
              <CommentLayout
                onCloseHandle={status => {
                  setIsCheckoutVisible(status);
                }}></CommentLayout>
            </View>
          </>
        )}></FlatList>

      <ItemCheckOutBarMolecule
        itemID={data?.getPublicItems?.nodes?.[0]?.id ?? ''}
        onBuyNow={handleBuyNow}
        totalPrice={
          totalPrice === 0
            ? data?.getPublicItems?.nodes?.[0]?.price
            : totalPrice
        }></ItemCheckOutBarMolecule>
    </View>
  );
};

const styles = StyleSheet.create({
  wishlistButton: {},
});
