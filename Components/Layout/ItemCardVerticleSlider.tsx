import React from 'react';
import {SectionHeader} from '../Sections/SectionHeader';
import {ItemMiniCard} from '../Sections/Cards/ItemMiniCard';
import {Spacer} from '../Elements/Spacer';
import {StyleSheet, TextStyle, View} from 'react-native';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {HomeStackNavigationProp} from '../../Navigators/Stack/HomeStackNavigator';
import {FlatList} from 'react-native-gesture-handler';
import {getPublicItems} from '../../GraphQL/Queries/ItemQueries';
import {useQuery} from '@apollo/client';

interface ItemCardVerticleSliderProps {
  titleHeader?: string;
  titleHeaderStyle?: TextStyle;
  ListHeaderComponent: React.ReactNode;
}

export const ItemCardVerticleSlider: React.FC<ItemCardVerticleSliderProps> = ({
  titleHeader = 'Latest products',
  titleHeaderStyle,
  ListHeaderComponent,
}) => {
  const item: Array<{
    id: number;
    cardImage: string;
    title: string;
    price: string;
    rating: number;
  }> = [
    {
      id: 1,
      cardImage:
        'https://images.pexels.com/photos/592815/pexels-photo-592815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'LOREM Black Dummy Watch',
      price: '45,999',
      rating: 4.8,
    },
    {
      id: 2,
      cardImage:
        'https://images.pexels.com/photos/592815/pexels-photo-592815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'LOREM Black Dummy Watch',
      price: '45,999',
      rating: 4.8,
    },
    {
      id: 3,
      cardImage:
        'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'LOREM Black Dummy Watch',
      price: '45,999',
      rating: 4.8,
    },
    {
      id: 4,
      cardImage:
        'https://images.pexels.com/photos/592815/pexels-photo-592815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'LOREM Black Dummy Watch',
      price: '45,999',
      rating: 4.8,
    },
    {
      id: 5,
      cardImage:
        'https://images.pexels.com/photos/592815/pexels-photo-592815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'LOREM Black Dummy Watch',
      price: '45,999',
      rating: 4.8,
    },
  ];

  // const {data, loading, error} = useQuery(getPublicItems);

  return (
    <View style={styles.miniCardContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            {ListHeaderComponent}
            <SectionHeader
              onPress={() => console.log('PRessing')}
              isIcon={true}
              title={titleHeader}
              titleFontSize={18}
              titleHeight={22}
              style={titleHeaderStyle}></SectionHeader>
            <Spacer height={10}></Spacer>
          </>
        )}
        numColumns={2}
        data={item}
        renderItem={({item, index}) => (
          <View
            key={index}
            id={`${index}`}
            style={{
              paddingTop: index % 2 === 0 ? 0 : 10,
            }}>
            <ItemMiniCard
              id={`${item.id}`}
              key={index}
              margin={8}
              cardImage={item.cardImage}
              title={item.title}
              price={item.price}
              rating={item.rating}
            />
          </View>
        )}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // marginHorizontal: AreaMapper({
    //   value: 14,
    //   scaleBy: 'average',
    // }),
  },
  miniCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});
