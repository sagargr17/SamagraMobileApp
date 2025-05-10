import React from 'react';
import {ScrollView} from 'react-native';

import {useNavigation, useTheme} from '@react-navigation/native';
import {TextComponet} from '../../../Components/Elements/TextComponet';
import {SliderSwitcher} from '../../../Components/Layout/SliderSwitcher';
import {ItemListtCard} from '../../../Components/Sections/Cards/ItemListCard';
import {ApplicationOverlayStackNavigationProp} from '../../../Navigators/Stack/ApplicationOverlayStackNavigator';

interface ShopItemsScreenProps {}

export const ShopItemsScreen: React.FC<ShopItemsScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation =
    useNavigation<ApplicationOverlayStackNavigationProp<'AddItemScreen'>>();
  // const navigation: any = useNavigation();

  return (
    <>
      <SliderSwitcher
        popupIcon="camera"
        popupButtonName="Add Item"
        popupButtonPressed={() =>
          navigation.navigate('AddItemScreen', {
            shopName: 'Hamro SHop',
          })
        }>
        {/* <TextComponet title="All" fontVariant="regular"></TextComponet> */}

        <ScrollView key="Delivery Item">
          <ItemListtCard
            title="All"
            item={{
              name: 'Watch',
              price: 200,
              imageUrl:
                'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              rating: 3,
            }}></ItemListtCard>
          <ItemListtCard
            title="All"
            item={{
              name: 'Watch',
              price: 200,
              imageUrl:
                'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              rating: 3,
            }}></ItemListtCard>
          <ItemListtCard
            title="All"
            item={{
              name: 'Watch',
              price: 200,
              imageUrl:
                'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              rating: 3,
            }}></ItemListtCard>
          <ItemListtCard
            title="All"
            item={{
              name: 'Watch',
              price: 200,
              imageUrl:
                'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              rating: 3,
            }}></ItemListtCard>
          <ItemListtCard
            title="All"
            item={{
              name: 'Watch',
              price: 200,
              imageUrl:
                'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              rating: 3,
            }}></ItemListtCard>
          <ItemListtCard
            title="All"
            item={{
              name: 'Watch',
              price: 200,
              imageUrl:
                'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              rating: 3,
            }}></ItemListtCard>
          <ItemListtCard
            title="All"
            item={{
              name: 'Watch',
              price: 200,
              imageUrl:
                'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              rating: 3,
            }}></ItemListtCard>
          <ItemListtCard
            title="All"
            item={{
              name: 'Watch',
              price: 200,
              imageUrl:
                'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              rating: 3,
            }}></ItemListtCard>
        </ScrollView>

        <TextComponet
          key={'Stock'}
          title="Stocks"
          fontVariant="regular"></TextComponet>
        <TextComponet title="Adds" fontVariant="regular"></TextComponet>
        <TextComponet title="Price" fontVariant="regular"></TextComponet>
        <TextComponet title="ItemStatics" fontVariant="regular"></TextComponet>
      </SliderSwitcher>
    </>
  );
};
