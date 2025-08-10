import {NetworkStatus, useQuery} from '@apollo/client';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {SamagraLoader} from '../../../Components/Elements/SamagraLoader';
import {ListCard} from '../../../Components/Molecules/Cards/ListCard';
import {SingnlePageInfo} from '../../../Components/Organism/SinglePageInfo';
import {ListCardSkeleton} from '../../../Components/Skeletons/Layout/ListCardSkeleton';
import {ItemImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {
  NoCartItemTitle,
  NoItemInShop,
  NotMentioned,
} from '../../../Constants/UI/Messages';
import {FlatListScreen} from '../../../Layout/ScreenLayout/FlatListScreenLayout';
import {size} from '../../../Prefrences/Prefrences';
import {AreaMapper, titleRange} from '../../../Utilities/CustomMethods';
import {getAllPersonalItems} from '../../../GraphQL/Queries/ItemQueries';
import {Switch} from 'react-native-paper';
import {AppText} from '../../../Components/Elements/AppText';
import {Spacer} from '../../../Components/Elements/Spacer';

interface MyShopItemsScreenProps {}

export const MyShopItemsScreen: React.FC<MyShopItemsScreenProps> = ({}) => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);
  const {NoItemFound} = Logos;
  const {colors} = useTheme();

  const {data, loading, error, refetch, networkStatus, fetchMore} = useQuery(
    getAllPersonalItems,
    {
      variables: {after: null},
      onCompleted: () => {
        setPaginationLoading(false);
      },
      onError: () => {
        setPaginationLoading(false);
      },
      fetchPolicy: 'network-only',
    },
  );

  const [localItemStatus, setLocalItemStatus] = useState<boolean[]>([]);

  useEffect(() => {
    if (data?.getItems?.edges) {
      const initialStatus = data.getItems.edges.map(
        (edge: any) => edge?.node?.isActive ?? false,
      );
      setLocalItemStatus(initialStatus);
    }
  }, [data]);

  const isLoadingInitialData =
    loading && !data && networkStatus === NetworkStatus.loading;
  const isFetchingMore =
    networkStatus === NetworkStatus.fetchMore || paginationLoading;

  if (isLoadingInitialData)
    return <ListCardSkeleton numberOfList={7}></ListCardSkeleton>;
  if (!error && !data) return <Text>Error</Text>;

  const handleAddItem = () => {
    navigation.navigate('CategoriesScreen');
  };

  const onToggleSwitch = (index: number) => {
    setLocalItemStatus(prevStatus => {
      const newStatus = [...prevStatus];
      newStatus[index] = !newStatus[index];
      return newStatus;
    });
  };

  return (
    <>
      {data &&
      data.getItems &&
      data.getItems.edges &&
      data?.getItems?.edges?.length <= 0 ? (
        <SingnlePageInfo
          icon={<NoItemFound height={AreaMapper({value: 150})} />}
          detail={{
            title: NoCartItemTitle,
            message: NoItemInShop,
            onButtonPress: () => handleAddItem(),
            buttonTitle: 'Add Item',
          }}></SingnlePageInfo>
      ) : (
        <>
          <Spacer height={10}></Spacer>

          <AppText
            customStyle={{
              fontSize: AreaMapper({value: 22}),
              lineHeight: AreaMapper({value: 35}),
              marginHorizontal: size.spacing.m,
            }}
            title="Active Services"
            fontSizeVariant="display"
            fontVariant="medium"></AppText>
          <Spacer height={10}></Spacer>
          <FlatListScreen
            contentContainerStyle={{}}
            onEndReached={() => {
              if (data?.getItems?.pageInfo.hasNextPage) {
                fetchMore({
                  variables: {after: data?.getItems?.pageInfo.endCursor},
                });
              }
            }}
            onEndReachedThreshold={0.6}
            scrollEnabled
            data={data?.getItems?.edges}
            renderItem={({item, index}) => (
              <ListCard
                child={
                  <Switch
                    color={colors.primary}
                    style={{
                      zIndex: 2,
                    }}
                    value={localItemStatus[index] ?? false}
                    onValueChange={() => onToggleSwitch(index)}></Switch>
                }
                customImageStyle={{
                  height: AreaMapper({value: 95}),
                  width: AreaMapper({value: 85}),
                }}
                id={item?.node?.id ?? NotMentioned}
                key={index}
                imageUrl={item.node?.imageUrls?.[0] ?? ItemImageNotFound}
                list={[
                  {
                    value: titleRange(item?.node?.name ?? NotMentioned),
                    type: 'display',
                    fontVariant: 'medium',
                  },
                  {
                    value: `Npr.${item?.node?.price ?? NotMentioned} per ${
                      item?.node?.unit ?? NotMentioned
                    }  `,

                    type: 'regular',
                    fontVariant: 'medium',
                  },

                  {
                    value: titleRange(`${'House Keeping'}`),
                    type: 'regular',
                    fontVariant: 'medium',
                    style: {
                      color: '#7ba5e8',
                    },
                  },
                ]}
                customStyle={{
                  paddingVertical: size.spacing.xs,
                  paddingHorizontal: size.spacing.m,
                  backgroundColor: colors.card,
                }}></ListCard>
            )}
            ListFooterComponent={
              <>{isFetchingMore ? <SamagraLoader /> : null}</>
            }></FlatListScreen>
        </>
      )}
    </>
  );
};
