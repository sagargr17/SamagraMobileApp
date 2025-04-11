import React from 'react';
import {SectionHeader} from '../Sections/SectionHeader';
import {ItemCard} from '../Sections/ItemCard';
import {Spacer} from '../Elements/Spacer';
import {View} from 'react-native';
import {SamagraScaller} from '../../Utilities/CustomMethods';

interface ItemVerticleListViewProps {}

export const ItemVerticleListView: React.FC<
  ItemVerticleListViewProps
> = ({}) => {
  const item: Array<{
    cardImage: string;
    title: string;
    price: string;
    rating: number;
  }> = [
    {
      cardImage:
        'https://images.pexels.com/photos/592815/pexels-photo-592815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'LOREM Black Dummy Watch',
      price: '45,999',
      rating: 4.8,
    },
    {
      cardImage:
        'https://images.pexels.com/photos/592815/pexels-photo-592815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'LOREM Black Dummy Watch',
      price: '45,999',
      rating: 4.8,
    },
    {
      cardImage:
        'https://images.pexels.com/photos/592815/pexels-photo-592815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'LOREM Black Dummy Watch',
      price: '45,999',
      rating: 4.8,
    },
    {
      cardImage:
        'https://images.pexels.com/photos/592815/pexels-photo-592815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'LOREM Black Dummy Watch',
      price: '45,999',
      rating: 4.8,
    },
    {
      cardImage:
        'https://images.pexels.com/photos/592815/pexels-photo-592815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'LOREM Black Dummy Watch',
      price: '45,999',
      rating: 4.8,
    },
  ];

  return (
    <View
      style={{
        marginHorizontal: SamagraScaller({
          value: 10,
          scaleBy: 'average',
        }),
      }}>
      <Spacer height={10}></Spacer>
      <SectionHeader
        title="PopularProduct"
        titleFontSize={18}
        titleHeight={22}></SectionHeader>
      <Spacer height={10}></Spacer>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
        {item.map((item, index) => {
          console.log('INdexx value');
          return (
            <View
              style={{
                // marginTop: ,
                paddingTop: index % 2 === 0 ? 0 : 20,
              }}>
              <ItemCard
                key={index}
                margin={5}
                // marginTop={index % 2 !== 0 ? 0 : 10}
                cardImage={item.cardImage}
                title={item.title}
                price={item.price}
                rating={item.rating}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};
