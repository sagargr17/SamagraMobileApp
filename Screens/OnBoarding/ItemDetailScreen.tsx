import {useQuery} from '@apollo/client';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';
import {Rating} from '../../Components/Elements/Rating';
import {Spacer} from '../../Components/Elements/Spacer';
import {AppText} from '../../Components/Elements/AppText';
import {CommentLayout} from '../../Components/Organism/CommentLayout';
import {Counter} from '../../Components/Molecules/Global/Counter';
import {ImageSliderModal} from '../../Components/Organism/ImageSliderModal';
import {ItemCheckOut} from '../../Components/Molecules/Global/ItemCheckOut';
import {SamagraLoader} from '../../Components/Molecules/Response/SamagraLoader';
import {getPublicItemsById} from '../../GraphQL/Queries/ItemQueries';
import {ItemDetailScreenRouteProp} from '../../Navigators/Stack/ApplicationOverlayStackNavigator';
import {hideLoader} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {AreaMapper, titleCase} from '../../Utilities/CustomMethods';
import {PlaceOrderScreen} from '../Application/PlaceOrderScreen';
import {postPlaceOrderparams} from '../../StateManagement/Orders/PlaceOrderDetailsParams';
import {NotMentioned} from '../../Constants/UI/Messages';
import {size} from '../../Prefrences/Prefrences';
order: null;
interface ItemDetailScreenProps {
  route: ItemDetailScreenRouteProp;
}

export const ItemDetailScreen: React.FC<ItemDetailScreenProps> = ({route}) => {
  const {colors} = useTheme();

  const [totalPrice, setTotalPrice] = useState<number>(320);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const {data, loading, error} = useQuery(getPublicItemsById, {
    variables: {
      id: route.params.id,
    },
  });

  console.log('itemIDdd', route.params.id);
  const navigation = useNavigation<any>();

  useEffect(() => {
    dispatch(hideLoader());
  }, []);

  const handleTotalPrice = (Quantity: number) => {
    setTotalPrice((data?.getPublicItems?.nodes?.[0]?.price ?? 0) * Quantity);
  };

  const itemDetailContainer = () => {
    return (
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <AppText
            fontSizeVariant={'title'}
            title={titleCase(
              data?.getPublicItems?.nodes?.[0]?.name ?? 'Not Mentioned',
            )}
            fontVariant="medium"
            customStyle={{
              margin: 0,
              padding: 0,
            }}></AppText>
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
          <AppText
            customStyle={{
              backgroundColor: 'gray',
              color: colors.background,
            }}
            fontSizeVariant={'regular'}
            title={titleCase('423 Sold')}
            fontVariant="regular"></AppText>
          <Rating></Rating>
        </View>
        <Spacer height={8}></Spacer>
        <View>
          <AppText
            fontSizeVariant={'title'}
            title={titleCase('Description')}
            fontVariant="medium"></AppText>
          <Spacer height={2}></Spacer>
          <AppText
            fontSizeVariant={'regular'}
            // title={titleCase(
            //   data?.getPublicItems?.nodes?.[0]?.description ?? 'Not Mentioned',
            // )}
            title={
              'Irure id ex irure et. Ad occaecat minim magna magna. Nostrud id labore dolor qui culpa eiusmod quis laboris occaecat laboris consequat laborum. Do veniam id exercitation nisi aliqua est dolor laborum exercitation dolore. Quis enim labore magna laborum sint incididunt incididunt nisi sint et dolor cupidatat minim minim.'
            }
            fontVariant="regular"></AppText>
        </View>

        <Spacer height={14}></Spacer>
        <Counter
          setTotal={(Quantity: number) => handleTotalPrice(Quantity)}></Counter>
        <Spacer height={24}></Spacer>
        <Divider></Divider>
        <Spacer height={8}></Spacer>
      </View>
    );
  };
  const user = useAppSelector(state => state.user.user);

  if (error) return <Text>ErrorItemCheckOut {error.message}</Text>;
  if (loading) return <SamagraLoader></SamagraLoader>;
  // if(data && !error && !loading)
  const handleBuyNow = () => {
    dispatch(
      postPlaceOrderparams({
        itemParams: {
          location: 'Butwal',
          description:
            data?.getPublicItems?.nodes?.[0]?.description ?? NotMentioned,
          requiredTime: '3hr',
          name: data?.getPublicItems?.nodes?.[0]?.name ?? NotMentioned,
          category: 'Vegitable',
          imageUrl: '',
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
          orderQuantity: String(1),
          itemID: data?.getPublicItems?.nodes?.[0]?.id ?? '1',
        },
      }),
    );

    navigation.navigate('ApplicationOverlay', {
      screen: 'PlaceOrderScreen',
    });
  };

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
            <Spacer height={16}></Spacer>
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

      <ItemCheckOut
        itemID={data?.getPublicItems?.nodes?.[0]?.id ?? ''}
        onBuyNow={handleBuyNow}
        totalPrice={totalPrice}></ItemCheckOut>
    </View>
  );
};

const styles = StyleSheet.create({
  wishlistButton: {},
});
