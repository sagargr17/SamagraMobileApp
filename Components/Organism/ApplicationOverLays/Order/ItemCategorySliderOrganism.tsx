import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Logos} from '../../../../Assets/SVG/Exports/Exports';
import {size} from '../../../../Prefrences/Prefrences';
import {ItemCategoryCardMolecule} from '../../../Molecules/Cards/ItemCategoryCardMolecule';
import {SectionHeaderMolecule} from '../../../Molecules/Global/SectionHeaderMolecule';
import {titleRange} from '../../../../Utilities/CustomMethods';

interface ItemCategoryCardProps {
  sizes: 'regular' | 'large';
}

export const ItemCategoryCardSlider: React.FC<ItemCategoryCardProps> = ({
  sizes = 'large',
}) => {
  const {fonts} = useTheme();
  const {Laundry, HouseKeep, Grocery, Stationary} = Logos;
  const [selectedCategory, setSelectedCategory] = useState<string>('Laundry');
  // const navigation = useNavigation<HomeStackNavigationProp<'CategoryListScreen'>>();

  const height = size.iconSize.large + 2;
  const width = size.iconSize.xlarge + 2;
  const data: Array<{
    titte: string;
    icon: any;
  }> = [
    {
      titte: 'Laundry',
      icon: <Laundry height={height} width={width} />,
    },
    {
      titte: titleRange('HouseKeeping', 10),
      icon: <HouseKeep height={height} width={width} />,
    },
    {
      titte: titleRange('Plumbin & wire', 10),
      icon: <Stationary height={height} width={width} />,
    },
    {
      titte: 'More',
      icon: <Grocery height={height} width={width} />,
    },
  ];

  const onPress = (categoryTitle = 'Laundry') => {
    setSelectedCategory(categoryTitle);
    // sizes === 'large'
    //   ? navigation.navigate('CategoryListScreen')
  };

  return (
    <View>
      {sizes === 'regular' ? null : (
        <SectionHeaderMolecule
          style={{
            paddingBottom: size.spacing.xs,
          }}
          onPress={() => onPress()}
          isIcon={false}
          title="Category"></SectionHeaderMolecule>
      )}
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={({item, index}) => (
          <ItemCategoryCardMolecule
            onPress={() => onPress(item.titte)}
            selectedCategory={sizes === 'large' ? item.titte : selectedCategory}
            size={sizes}
            key={index}
            title={item.titte}
            icon={item.icon}
          />
        )}></FlatList>
    </View>
  );
};
