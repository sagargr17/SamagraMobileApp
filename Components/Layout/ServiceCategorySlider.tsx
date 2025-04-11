import React from 'react';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {ServiceCategoryCard} from '../Sections/ServiceCategoryCard';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {TextComponet} from '../Elements/TextComponet';
import {useTheme} from '@react-navigation/native';
import {Spacer} from '../Elements/Spacer';

interface ServiceCategoryCardProps {}

export const ServiceCategoryCardSlider: React.FC<
  ServiceCategoryCardProps
> = ({}) => {
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
    <View style={{}}>
      <TextComponet
        fontVariant="bold"
        fontSize={18}
        lineHeight={30}
        customStyle={{
          paddingHorizontal: SamagraScaller({
            value: 14,
            scaleBy: 'average',
          }),
        }}
        title={'Category >'}></TextComponet>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={({item}) => (
          <ServiceCategoryCard title={item.titte} icon={item.icon} />
        )}></FlatList>
    </View>
  );
};
