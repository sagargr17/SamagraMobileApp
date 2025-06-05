import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';
import {Rating} from '../../Components/Elements/Rating';
import {Spacer} from '../../Components/Elements/Spacer';
import {TextComponet} from '../../Components/Elements/TextComponet';
import {CommentLayout} from '../../Components/Layout/CommentLayout';
import {Counter} from '../../Components/Sections/Counter';
import {ImageSliderModal} from '../../Components/Sections/ImageSliderModal';
import {ItemCheckOut} from '../../Components/Sections/ItemCheckOut';
import {SamagraLoader} from '../../Components/Sections/Loading/SamagraLoader';
import {ItemDetailScreenRouteProp} from '../../Navigators/Stack/ApplicationOverlayStackNavigator';
import {hideLoader} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch} from '../../StateManagement/hooks';
import {AreaMapper, titleCase} from '../../Utilities/CustomMethods';
order: null;
interface ItemDetailScreenProps {
  route: ItemDetailScreenRouteProp;
}

export const ItemDetailScreen: React.FC<ItemDetailScreenProps> = ({route}) => {
  const {colors} = useTheme();
  const {name} = route.params;
  const [totalPrice, setTotalPrice] = useState<number>(320);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState<boolean>(true);

  // const route = useRoute();
  console.log('Routeee ID', route.params.id);

  // test
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const handleTotalPrice = (Quantity: number) => {
    setTotalPrice(320 * Quantity);
  };

  setTimeout(() => {
    setIsLoading(false);
    dispatch(hideLoader());
  }, 1000);

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
            fontSize={24}
            lineHeight={20}
            title={titleCase(name)}
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
            fontSize={14}
            title={titleCase('423 Sold')}
            fontVariant="regular"></TextComponet>
          <Rating></Rating>
        </View>
        <Spacer height={12}></Spacer>
        <View>
          <TextComponet
            fontSize={16}
            lineHeight={21}
            title={titleCase('Description')}
            fontVariant="medium"></TextComponet>
          <Spacer height={8}></Spacer>
          <TextComponet
            fontSize={14}
            title={titleCase(
              'Lorem ipsum dolor sit amet consectetur. Malesuada faucibus viverra eget ridiculus a nec amet in. In turpis etiam tristique sit enim proin pulvinar.',
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

  return (
    <>
      {isLoading ? (
        <SamagraLoader></SamagraLoader>
      ) : (
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
                    images={[
                      {
                        url: 'https://images.pexels.com/photos/592815/pexels-photo-592815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                      },
                      {
                        url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      },
                      {
                        url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdhdGNofGVufDB8fDB8fHww',
                      },
                    ]}></ImageSliderModal>

                  {itemDetailContainer()}
                  <CommentLayout
                    onCloseHandle={status => {
                      setIsCheckoutVisible(status);
                    }}></CommentLayout>
                </>
              )}></FlatList>
            <ItemCheckOut totalPrice={totalPrice}></ItemCheckOut>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wishlistButton: {},
});
