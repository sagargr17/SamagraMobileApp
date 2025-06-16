import {useQuery} from '@apollo/client';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';
import {Rating} from '../../Components/Elements/Rating';
import {Spacer} from '../../Components/Elements/Spacer';
import {TextComponet} from '../../Components/Elements/TextComponet';
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
      <View
        style={{
          paddingLeft: AreaMapper({
            value: 16,
            scaleBy: 'average',
          }),
          paddingRight: AreaMapper({
            value: 16,
            scaleBy: 'average',
          }),
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: 'orange',
            justifyContent: 'space-between',
          }}>
          <TextComponet
            fontSizeVariant={'title'}
            title={titleCase(
              data?.getPublicItems?.nodes?.[0]?.name ?? 'Not Mentioned',
            )}
            fontVariant="regular"
            customStyle={{
              margin: 0,
              padding: 0,
            }}></TextComponet>
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
          <TextComponet
            customStyle={{
              backgroundColor: 'gray',
              color: colors.background,
              paddingHorizontal: AreaMapper({
                value: 8,
                scaleBy: 'height',
              }),
            }}
            fontSizeVariant={'regular'}
            title={titleCase('423 Sold')}
            fontVariant="regular"></TextComponet>
          <Rating></Rating>
        </View>
        <Spacer height={12}></Spacer>
        <View>
          <TextComponet
            fontSizeVariant={'regular'}
            title={titleCase('Description')}
            fontVariant="medium"></TextComponet>
          <Spacer height={8}></Spacer>
          <TextComponet
            fontSizeVariant={'regular'}
            title={titleCase(
              data?.getPublicItems?.nodes?.[0]?.description ?? 'Not Mentioned',
            )}
            fontVariant="regular"></TextComponet>
        </View>

        <Spacer height={25}></Spacer>
        <Counter
          setTotal={(Quantity: number) => handleTotalPrice(Quantity)}></Counter>

        <Spacer height={10}></Spacer>
        <Divider></Divider>
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
    <>
      <View
        style={{
          flex: 1,
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

              {itemDetailContainer()}
              <CommentLayout
                onCloseHandle={status => {
                  setIsCheckoutVisible(status);
                }}></CommentLayout>
            </>
          )}></FlatList>
        <ItemCheckOut
          itemID={data?.getPublicItems?.nodes?.[0]?.id ?? ''}
          onBuyNow={handleBuyNow}
          totalPrice={totalPrice}></ItemCheckOut>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wishlistButton: {},
});
