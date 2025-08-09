import {NetworkStatus, useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {SamagraLoader} from '../../Components/Elements/SamagraLoader';
import {Spacer} from '../../Components/Elements/Spacer';
import {ItemMiniCard} from '../../Components/Molecules/Cards/ItemMiniCard';
import AppBanner from '../../Components/Molecules/Global/AppBanner';
import {AppSerchBar} from '../../Components/Molecules/Global/AppSerchBar';
import {AppHeader} from '../../Components/Organism/AppHeader';
import {ItemCategoryCardSlider} from '../../Components/Organism/ItemCategorySlider';
import {HomeLandingSkeleton} from '../../Components/Skeletons/Layout/HomeLandingSkeleton';
import {ItemImageNotFound} from '../../Constants/UI/AssetsUrls';
import {getPublicItems} from '../../GraphQL/Queries/ItemQueries';
import {FlatListScreen} from '../../Layout/ScreenLayout/FlatListScreenLayout';
import {size} from '../../Prefrences/Prefrences';

interface ActiveBuyerHomeScreenProps {}

export const ActiveBuyerHomeScreen: React.FC<
  ActiveBuyerHomeScreenProps
> = ({}) => {
  const navigation: any = useNavigation();

  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);

  const {data, loading, error, fetchMore, networkStatus} = useQuery(
    getPublicItems,
    {
      notifyOnNetworkStatusChange: true,
      variables: {endCursor: null},
      onCompleted: () => {
        setPaginationLoading(false);
      },
      onError: () => {
        setPaginationLoading(false);
      },
    },
  );

  const isLoadingInitialData =
    loading && !data && networkStatus === NetworkStatus.loading;

  const isFetchingMore =
    networkStatus === NetworkStatus.fetchMore || paginationLoading;

  const handleNavigation = useCallback(() => {
    console.log('ERror');

    navigation.navigate('ApplicationOverlay', {
      screen: 'SearchItemScreen',
      params: {
        itemType: 'public',
      },
    });
  }, []);

  const headerComponent = (
    <>
      <AppHeader currentPosition="static"></AppHeader>
      <Spacer height={30}></Spacer>
      <Divider></Divider>
      <Spacer height={17}></Spacer>
      <AppSerchBar onPress={handleNavigation}></AppSerchBar>
      <Spacer height={18}></Spacer>
      <AppBanner></AppBanner>
      <Spacer height={18}></Spacer>
      <ItemCategoryCardSlider sizes="large"></ItemCategoryCardSlider>
      <Spacer height={25}></Spacer>
      <Divider></Divider>
    </>
  );

  if (isLoadingInitialData) {
    return <HomeLandingSkeleton></HomeLandingSkeleton>;
  }

  if (error) {
    return (
      <Text style={{color: 'red', textAlign: 'center', marginTop: 20}}>
        Error: {error.message}
      </Text>
    );
  }

  return (
    <FlatListScreen
      onEndReached={() => {
        if (data?.getPublicItems?.pageInfo.hasNextPage && !isFetchingMore) {
          fetchMore({
            variables: {endCursor: data?.getPublicItems?.pageInfo.endCursor},
          });
        }
      }}
      onEndReachedThreshold={0.6}
      numColumns={2}
      headerComponent={headerComponent}
      data={data?.getPublicItems?.edges || []}
      isSectioHeader
      headerTitle="Popular"
      contentContainerStyle={{
        paddingHorizontal: size.spacing.xs,
      }}
      renderItem={({item, index}) => {
        if (!item?.node) return null;

        return (
          <>
            <View
              style={{
                paddingTop: index % 2 === 0 ? 0 : size.spacing.xs,
                flex: 1,
                marginHorizontal: 5,
              }}>
              <ItemMiniCard
                id={item.node.id || 'Not Mentioned'}
                cardImage={item.node.imageUrls?.[0] || ItemImageNotFound}
                title={item.node.name || 'Not Mentioned'}
                price={item.node.price || 'Not Mentioned'}
                rating={item.node.starRating}
              />
            </View>
          </>
        );
      }}
      ListFooterComponent={
        isFetchingMore ? <SamagraLoader></SamagraLoader> : null
      }></FlatListScreen>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  footerLoader: {
    paddingVertical: size.spacing.xs,
  },
});
