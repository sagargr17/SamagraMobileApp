import {useQuery} from '@apollo/client';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {ItemListtCard} from '../../../Components/Molecules/Cards/ItemListCard';
import {SingnlePageInfo} from '../../../Components/Organism/SinglePageInfo';
import {ListCardSkeleton} from '../../../Components/Skeletons/Layout/ListSkeleton';
import {ImageNotFound} from '../../../Constants/UI/AssetsUrls';
import {NoCartItemTitle, NoItemInShop} from '../../../Constants/UI/Messages';
import {GetItemsByShopId} from '../../../GraphQL/Queries/ItemQueries';
import {FlatListScreen} from '../../../Layout/ScreenLayout/FlatListScreenLayout';
import {ApplicationOverlayStackNavigationProp} from '../../../Navigators/Stack/ApplicationOverlayStackNavigator';
import {AreaMapper} from '../../../Utilities/CustomMethods';

interface MyShopItemsScreenProps {}

export const MyShopItemsScreen: React.FC<MyShopItemsScreenProps> = ({}) => {
  const isFocused = useIsFocused();
  const navigation =
    useNavigation<ApplicationOverlayStackNavigationProp<'AddItemScreen'>>();
  const route = useRoute<any>();
  // const shopName = useAppSelector(state => state.user.shopData?);
  const {data, loading, error, refetch} = useQuery(GetItemsByShopId, {
    variables: {
      shopId: route.params.shopId,
    },
  });

  if (loading) return <ListCardSkeleton numberOfList={7}></ListCardSkeleton>;
  if (!error && !data) return <Text>Error</Text>;

  // Handle Item
  const handleAddItem = () => {
    navigation.navigate('AddItemScreen', {
      shopId: route.params.shopId,
      shopName: route.params.shopName,
    });
  };

  const {NoItemFound} = Logos;
  return (
    <FlatListScreen
      scrollEnabled
      ListEmptyComponent={
        <SingnlePageInfo
          icon={<NoItemFound height={AreaMapper({value: 150})} width={'90%'} />}
          detail={{
            title: NoCartItemTitle,
            message: NoItemInShop,
            onButtonPress: () => handleAddItem(),
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
