import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {Spacer} from '../../../Components/Elements/Spacer';
import {ItemMiniCard} from '../../../Components/Molecules/Cards/ItemMiniCard';
import AppBanner from '../../../Components/Molecules/Global/AppBanner';
import {AppSerchBar} from '../../../Components/Molecules/Global/AppSerchBar';
import {AppHeader} from '../../../Components/Organism/AppHeader';
import {ItemCategoryCardSlider} from '../../../Components/Organism/ItemCategorySlider';
import {ImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {getPublicItems} from '../../../GraphQL/Queries/ItemQueries';
import {FlatListScreen} from '../../../Layout/ScreenLayout/FlatListScreenLayout';
import {size} from '../../../Prefrences/Prefrences';
import {HomeLandingSkeleton} from '../../../Components/Skeletons/Layout/HomeLandingSkeleton';

interface HomeLandingScreenProps {}

export const HomeLandingScreen: React.FC<HomeLandingScreenProps> = ({}) => {
  const navigation: any = useNavigation();
  const {data, loading, error} = useQuery(getPublicItems, {
    fetchPolicy: 'cache-first',
  });

  const handleNavigation = useCallback((searchedItem: string) => {
    navigation.navigate('ApplicationOverlay', {
      screen: 'ItemDetailScreen',
      params: {
        name: `${searchedItem}`,
        id: '1',
      },
    });
  }, []);

  const headerComponent = (
    <>
      <AppHeader currentPosition="static"></AppHeader>
      <Spacer height={30}></Spacer>
      <Divider></Divider>
      <Spacer height={17}></Spacer>
      <AppSerchBar
        onPress={(searchedItem: string) =>
          handleNavigation(searchedItem)
        }></AppSerchBar>
      <AppBanner></AppBanner>
      <Spacer height={18}></Spacer>
      <ItemCategoryCardSlider sizes="large"></ItemCategoryCardSlider>
      <Spacer height={25}></Spacer>
      <Divider></Divider>
    </>
  );

  if (loading) return <HomeLandingSkeleton></HomeLandingSkeleton>;
  if (error) return <Text>{error.message}</Text>;

  return (
    <FlatListScreen
      scrollEnabled
      numColumns={2}
      headerComponent={headerComponent}
      data={data?.getPublicItems?.nodes}
      isSectioHeader
      headerTitle="Popular"
      contentContainerStyle={{
        paddingHorizontal: size.spacing.xs,
      }}
      renderItem={({item, index}) => (
        <View
          style={{
            paddingTop: index % 2 === 0 ? 0 : size.spacing.xs,
          }}>
          <ItemMiniCard
            id={item?.id ? item.id : 'Not Mentioned'}
            key={index}
            cardImage={
              item?.imageUrls?.[0] ? item?.imageUrls[0] : ImageNotFound
            }
            title={item?.name ? item.name : 'Not Mentioned'}
            price={item?.price ? item.price : 'Not Mentioned'}
            rating={item?.starRating}
          />
        </View>
      )}></FlatListScreen>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
