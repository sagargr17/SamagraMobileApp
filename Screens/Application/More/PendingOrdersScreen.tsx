import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {SingnlePageInfo} from '../../../Components/Organism/SinglePageInfo';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import DateTimeToAgoTime, {
  AreaMapper,
  titleCase,
} from '../../../Utilities/CustomMethods';
import {
  NoCartItemTitle,
  NoItemInShop,
  NotMentioned,
} from '../../../Constants/UI/Messages';
import {FlatListScreen} from '../../../Layout/ScreenLayout/FlatListScreenLayout';
import {ListCard} from '../../../Components/Molecules/Cards/ListCard';
import {ImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {useQuery} from '@apollo/client';
import {getMyOrdersItem} from '../../../GraphQL/Queries/PrivateShopQueries';
import {ListCardSkeleton} from '../../../Components/Skeletons/Layout/ListCardSkeleton';
import {size} from '../../../Prefrences/Prefrences';
import {AppSerchBar} from '../../../Components/Molecules/Global/AppSerchBar';

interface OrderScreenProps {}

export const PendingOrderScreen: React.FC<OrderScreenProps> = ({}) => {
  const {colors} = useTheme();
  const route = useRoute<any>();
  const {NoItemFound} = Logos;
  const navigation = useNavigation<any>();
  const {data, loading, error} = useQuery(getMyOrdersItem);

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
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <FlatListScreen
        ListHeaderComponent={
          <View
            style={{
              marginVertical: size.spacing.xxs,
            }}>
            <AppSerchBar
              placeHolder="Search By Buyer Name"
              onPress={() => console.log('>>')}></AppSerchBar>
          </View>
        }
        contentContainerStyle={{
          paddingHorizontal: size.spacing.xs,
        }}
        ListEmptyComponent={emptyNode}
        data={data?.getOrders?.nodes}
        renderItem={({item, index}) => (
          <ListCard
            customImageStyle={{
              height: AreaMapper({value: 100}),
            }}
            surfaceLevel={1}
            id={item?.id ?? NotMentioned}
            imageUrl={ImageNotFound}
            list={[
              {
                type: 'regular',
                value: titleCase(item?.itemName ?? NotMentioned),
                fontVariant: 'bold',
              },
              {
                type: 'regular',
                value: titleCase(item?.address ?? NotMentioned),
                fontVariant: 'regular',
              },

              {
                type: 'regular',
                value: DateTimeToAgoTime(item?.dateTime),
                style: {
                  color: colors.notification,
                },
                fontVariant: 'regular',
              },
              {
                type: 'regular',
                value: `Qty: ${item?.quantity ?? NotMentioned}`,
                fontVariant: 'regular',
                style: {
                  color: colors.background,
                  backgroundColor: 'gray',
                  borderRadius: size.borderRadius.full,
                  paddingHorizontal: size.spacing.xs,
                  paddingVertical: size.spacing.xxs,
                  left: AreaMapper({value: 200}),
                },
              },
            ]}></ListCard>
        )}></FlatListScreen>
    </SafeAreaView>
  );
};
