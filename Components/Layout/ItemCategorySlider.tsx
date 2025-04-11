import React from 'react';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {ItemCategoryCard} from '../Sections/ItemCategoryCard';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {TextComponet} from '../Elements/TextComponet';
import {useTheme} from '@react-navigation/native';
import {Spacer} from '../Elements/Spacer';
import {SectionHeader} from '../Sections/SectionHeader';

interface ItemCategoryCardProps {}

export const ItemCategoryCardSlider: React.FC<ItemCategoryCardProps> = ({}) => {
  const {Laundry, HouseKeeping, Grocery, Stationary} = Logos;
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
            value: 40,
            scaleBy: 'average',
          })}
          width={SamagraScaller({
            value: 40,
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
            value: 40,
            scaleBy: 'average',
          })}
          width={SamagraScaller({
            value: 40,
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
            value: 40,
            scaleBy: 'average',
          })}
          width={SamagraScaller({
            value: 40,
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
            value: 40,
            scaleBy: 'average',
          })}
          width={SamagraScaller({
            value: 40,
            scaleBy: 'average',
          })}
        />
      ),
    },
  ];

  return (
    <View
      style={{
        paddingHorizontal: SamagraScaller({
          value: 10,
          scaleBy: 'average',
        }),
      }}>
      <SectionHeader
        title="Category"
        titleFontSize={18}
        titleHeight={22}></SectionHeader>
      <FlatList
        contentContainerStyle={{
          paddingVertical: SamagraScaller({
            value: 12,
            scaleBy: 'average',
          }),
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={({item}) => (
          <ItemCategoryCard title={item.titte} icon={item.icon} />
        )}></FlatList>
    </View>
  );
};
