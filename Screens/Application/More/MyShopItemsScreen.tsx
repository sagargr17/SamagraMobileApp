import {useQuery} from '@apollo/client';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {View} from 'moti';
import React, {use, useEffect, useRef, useState} from 'react';
import {AppState, FlatList, Text} from 'react-native';
import {ItemListtCard} from '../../../Components/Molecules/Cards/ItemListCard';
import {SamagraLoader} from '../../../Components/Molecules/Response/SamagraLoader';
import {SliderSwitcher} from '../../../Components/Organism/SliderSwitcher';
import {
  ImageNotFound,
  ItemImageNotFound,
} from '../../../Constants/UI/AssetsUrls';
import {getPersonalItems} from '../../../GraphQL/Queries/ItemQueries';
import {ApplicationOverlayStackNavigationProp} from '../../../Navigators/Stack/ApplicationOverlayStackNavigator';
import {GetAuthenticateClient} from '../../../client/Graphql/AuthenticatedClient';
import {UserProfileCard} from '../../../Components/Molecules/Cards/UserProfileCard';
import {ListCardSkeleton} from '../../../Components/Skeletons/ListSkeleton';
import {FlatListScreen} from '../../../Layout/ScreenLayout/FlatListScreenLayout';
import {SingnlePageInfo} from '../../../Components/Organism/SinglePageInfo';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {NoCartItemTitle, NoItemInShop} from '../../../Constants/UI/Messages';
import {AreaMapper} from '../../../Utilities/CustomMethods';

interface MyShopItemsScreenProps {}

export const MyShopItemsScreen: React.FC<MyShopItemsScreenProps> = ({}) => {
  const isFocused = useIsFocused();
  const navigation =
    useNavigation<ApplicationOverlayStackNavigationProp<'AddItemScreen'>>();

  const {data, loading, error, refetch} = useQuery(getPersonalItems);

  // const [data, setData] = useState<any>();
  // const authenticateClient = GetAuthenticateClient;

  // useEffect(() => {
  //   // refetch();
  //   let query = async () => {

  //     authenticateClient
  //       .query({
  //         query: getPersonalItems,
  //       })
  //       .then(x => console.log('Thenn', x));
  //   };

  //   query();
  // }, []);

  console.log('DATA', data, loading, error);

  if (loading) return <ListCardSkeleton numberOfList={7}></ListCardSkeleton>;

  if (!error && !data) return <Text>Error</Text>;

  // refetch();
  // const appState = useRef(AppState.currentState);
  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     // If the app was inactive/background and is now active (foreground)
  //       // if (
  //       //   appState.current.match(/inactive|background/) &&
  //       //   nextAppState === 'active'
  //       // ) {
  //       //   console.log('App has come to the foreground!');
  //       //   // Trigger the refetch here
  //       // }

  //       // appState.current = nextAppState;
  //   });

  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     subscription.remove();
  //   };
  // }, [refetch]);

  // refetch();

  const handleItem = () => {
    navigation.navigate('AddItemScreen', {
      shopId: 'laskjdlksajd',
    });
  };

  const {NoItemFound} = Logos;
  return (
    <FlatListScreen
      contentContainerStyle={{
        flex: 1,
      }}
      ListEmptyComponent={
        <SingnlePageInfo
          icon={<NoItemFound height={AreaMapper({value: 150})} width={'90%'} />}
          detail={{
            title: NoCartItemTitle,
            message: NoItemInShop,
            onButtonPress: () => console.log('>>>'),
            buttonTitle: 'Add Item',
          }}></SingnlePageInfo>
      }
      data={data?.getItems?.nodes}
      renderItem={({item, index}) => (
        <ItemListtCard
          key={index}
          item={{
            name: item?.name ? item.name : 'not found',
            price: item?.price ? item?.price : 'not found',
            imageUrl: ImageNotFound,
            rating: item?.starRating ? item.starRating : 3,
            stocks: item && item.stockQuantity ? item?.stockQuantity : 10,
            shop: {
              name: item?.shop && item.shop.name ? item.shop.name : 'not found',
            },
          }}></ItemListtCard>
      )}></FlatListScreen>
  );
};
