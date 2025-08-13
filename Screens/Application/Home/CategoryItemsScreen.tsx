import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {getPublicItems} from '../../../GraphQL/Queries/ItemQueries';
import {NetworkStatus, useQuery} from '@apollo/client';
import {FlatListScreen} from '../../../Layout/ScreenLayout/FlatListScreenLayout';
import {size} from '../../../Prefrences/Prefrences';
import {ItemMiniCardMolecule} from '../../../Components/Molecules/Cards/ItemMiniCardMolecule';
import {ItemImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {SamagraLoaderElement} from '../../../Components/Elements/SamagraLoaderElement';
import {SpacerElement} from '../../../Components/Elements/SpacerElement';
interface CategoryItemsScreenProps {}

export const CategoryScreenItems: React.FC<CategoryItemsScreenProps> = ({}) => {
  const {colors} = useTheme();
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
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);
  const isLoadingInitialData =
    loading && !data && networkStatus === NetworkStatus.loading;

  const isFetchingMore =
    networkStatus === NetworkStatus.fetchMore || paginationLoading;

  return (
    <>
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
        data={data?.getPublicItems?.edges || []}
        isSectioHeader
        headerTitle="Popular"
        contentContainerStyle={{
          paddingHorizontal: size.spacing.s,
          paddingBottom: size.spacing.s,
        }}
        renderItem={({item, index}) => {
          if (!item?.node) return null;

          return (
            <>
              <ItemMiniCardMolecule
                id={item.node.id || 'Not Mentioned'}
                cardImage={item.node.imageUrls?.[0] || ItemImageNotFound}
                title={item.node.name || 'Not Mentioned'}
                price={item.node.price || 'Not Mentioned'}
                rating={item.node.starRating}
              />
            </>
          );
        }}
        ListFooterComponent={
          isFetchingMore ? <SamagraLoaderElement></SamagraLoaderElement> : null
        }></FlatListScreen>
    </>
  );
};
