import React, {useState} from 'react';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {ItemCategoryCard} from '../Sections/Cards/ItemCategoryCard';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {TextComponet} from '../Elements/TextComponet';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Spacer} from '../Elements/Spacer';
import {SectionHeader} from '../Sections/SectionHeader';
import {HomeStackNavigationProp} from '../../Navigators/Stack/HomeStackNavigator';
import {HomeStackProps} from '../../Navigators/Stack/ApplicationOverlayStackNavigator';

interface ItemCategoryCardProps {
  size: 'regular' | 'large';
}

export const ItemCategoryCardSlider: React.FC<ItemCategoryCardProps> = ({
  size = 'large',
}) => {
  const {Laundry, HouseKeeping, Grocery, Stationary} = Logos;
  const [selectedCategory, setSelectedCategory] = useState<string>('Laundry');
  const navigation =
    useNavigation<HomeStackNavigationProp<'CategoryListScreen'>>();
  const {colors} = useTheme();

  const data: Array<{
    titte: string;
    icon: any;
  }> = [
    {
      titte: 'Laundry',
      icon: (
        <Laundry
          height={SamagraScaller({
            value: size === 'large' ? 40 : 30,
            scaleBy: 'average',
          })}
          width={SamagraScaller({
            value: 30,
            scaleBy: 'average',
          })}
        />
      ),
    },
    {
      titte: 'Cleaning',
      icon: (
        <HouseKeeping
          height={SamagraScaller({
            value: size === 'large' ? 40 : 30,
            scaleBy: 'average',
          })}
          width={SamagraScaller({
            value: 30,
            scaleBy: 'average',
          })}
        />
      ),
    },
    {
      titte: 'Grocery',
      icon: (
        <Grocery
          height={SamagraScaller({
            value: size === 'large' ? 40 : 30,
            scaleBy: 'average',
          })}
          width={SamagraScaller({
            value: 30,
            scaleBy: 'average',
          })}
        />
      ),
    },
    {
      titte: 'Stationary',
      icon: (
        <Stationary
          height={SamagraScaller({
            value: size === 'large' ? 40 : 30,
            scaleBy: 'average',
          })}
          width={SamagraScaller({
            value: 30,
            scaleBy: 'average',
          })}
        />
      ),
    },
  ];

  const onPress = (categoryTitle = 'Laundry') => {
    size === 'large'
      ? navigation.navigate("CategoryListScreen")
      : setSelectedCategory(categoryTitle);
  };

  return (
    <View
      style={{
        paddingHorizontal: SamagraScaller({
          value: size === 'large' ? 10 : 0,
          scaleBy: 'average',
        }),
      }}>
      <SectionHeader
        onPress={() => onPress()}  
        isIcon={size === 'large' ? true : false}
        title="Category"
        titleFontSize={size === 'large' ? 18 : 16}
        titleHeight={22}></SectionHeader>
      <FlatList
        contentContainerStyle={{
          paddingVertical: SamagraScaller({
            value: size === 'large' ? 12 : 8,
            scaleBy: 'average',
          }),
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={({item, index}) => (
          <ItemCategoryCard
            onPress={() => onPress(item.titte)}
            selectedCategory={size === 'large' ? item.titte : selectedCategory}
            size={size}
            key={index}
            title={item.titte}
            icon={item.icon}
          />
        )}></FlatList>
    </View>
  );
};
