import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {SingnlePageInfo} from '../../../Components/Organism/SinglePageInfo';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {AreaMapper, titleCase} from '../../../Utilities/CustomMethods';
import {
  NoCartItemTitle,
  NoItemInShop,
  NotMentioned,
} from '../../../Constants/UI/Messages';
import {FlatListScreen} from '../../../Layout/ScreenLayout/FlatListScreenLayout';
import {ListCard} from '../../../Components/Molecules/Cards/ListCard';
import {ImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {useQuery} from '@apollo/client';
import {getMyOrders} from '../../../GraphQL/Queries/PrivateShopQueries';
import {ListCardSkeleton} from '../../../Components/Skeletons/Layout/ListCardSkeleton';
import {size} from '../../../Prefrences/Prefrences';

interface OrderScreenProps {}

export const PendingOrderScreen: React.FC<OrderScreenProps> = ({}) => {
  const {colors} = useTheme();
  const route = useRoute<any>();
  const {NoItemFound} = Logos;
  const navigation = useNavigation<any>();
  const {data, loading, error} = useQuery(getMyOrders);

  const handleNavigation = () => {
    // Navigation navigate
    navigation.navigate('ApplicationOverlay', {
      screen: 'AddItemScreen',
      params: {
        shopId: route.params.shopId,
        shopName: 'Add Item',
      },
    });
  };

  if (loading) return <ListCardSkeleton numberOfList={6}></ListCardSkeleton>;
  if (error) return <Text>Error</Text>;

  const emptyNode = (
    <SingnlePageInfo
      icon={<NoItemFound height={AreaMapper({value: 150})} width={'90%'} />}
      detail={{
        title: NoCartItemTitle,
        message: NoItemInShop,
        onButtonPress: () => handleNavigation(),
        buttonTitle: 'Add Item',
      }}></SingnlePageInfo>
  );

  return (
    <FlatListScreen
      contentContainerStyle={{
        paddingHorizontal: size.spacing.xs,
      }}
      ListEmptyComponent={emptyNode}
      data={data?.getOrders?.nodes}
      renderItem={({item, index}) => (
        <ListCard
          customImageStyle={{
            height: AreaMapper({value: 140}),
          }}
          surfaceLevel={1}
          id={item?.id ?? NotMentioned}
          imageUrl={ImageNotFound}
          list={[
            {
              type: 'title',
              value: titleCase(item?.itemName ?? NotMentioned),
              fontVariant: 'medium',
            },
            {
              type: 'regular',
              value: `${item?.quantity ?? NotMentioned}`,
            },
            {
              type: 'regular',
              value: `${item?.isCompleted === true ? 'Completed' : 'Pending'}`,
              style: {
                color:
                  item?.isCompleted === true
                    ? colors.primary
                    : colors.notification,
              },
              fontVariant: 'regular',
            },
          ]}></ListCard>
      )}></FlatListScreen>
  );
};
