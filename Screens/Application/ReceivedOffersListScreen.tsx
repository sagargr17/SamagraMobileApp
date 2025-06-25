import {
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {SingnlePageInfo} from '../../Components/Organism/SinglePageInfo';
import {ProviderCardSkeleton} from '../../Components/Skeletons/Components/ProviderCardSkeleton';
import {EmptyMessage, NotMentioned} from '../../Constants/UI/Messages';
import {getSubscribedData} from '../../GraphQL/Subscription/Subscription';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {ProviderCard} from '../../Components/Molecules/Cards/ProviderCard';
import {
  DummyServiceProviderURL,
  ImageNotFound,
} from '../../Constants/UI/AssetsUrls';
import {GetDataSubscription} from '../../src/__generated__/graphql';
import {postPlaceOrderparams} from '../../StateManagement/Orders/PlaceOrderDetailsParams';
import {getPublicItemsById} from '../../GraphQL/Queries/ItemQueries';
import {showMessage} from 'react-native-flash-message';
import {responseTheme} from '../../Prefrences/Prefrences';
import {showLoader} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';

interface ReceivedOffersListScreenProps {}

export const ReceivedOffersListScreen: React.FC<
  ReceivedOffersListScreenProps
> = ({}) => {
  const [offerList, setOfferList] = useState<Array<GetDataSubscription>>([]);
  const {NoItemFound} = Logos;
  const [skeletonLoading, setskeletonLoading] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [
    getMyItemFn,
    {data: myItem, loading: myItemLoading, error: myItemError},
  ] = useLazyQuery(getPublicItemsById);

  // RequestedItem Order
  const requestedItem = useAppSelector(state => state.sentOrderParams);

  const navigationnBackHandle = () => {
    navigation.goBack();
  };

  setTimeout(() => {
    setskeletonLoading(false);
  }, 15000);

  const {data, loading, error} = useSubscription(getSubscribedData, {
    onData: ({client, data}) => {
      console.log('OFFEr DAta');

      if (
        data.data &&
        data.data.events?.eventName &&
        data.data.events.data?.itemRequestOfferReceived &&
        data.data.events.data?.itemRequestOfferReceived.itemRequestId ===
          requestedItem.id
      ) {
        setOfferList([data.data, ...offerList]);
      }
    },
  });

  // Place Order Items
  const placeOrderItemHandle = (itemId: string) => {
    dispatch(showLoader());
    getMyItemFn({
      variables: {
        id: itemId,
      },
    })
      .then(data => {
        dispatch(
          postPlaceOrderparams({
            itemDetails: {
              price: data.data?.getPublicItems?.nodes?.[0]?.price,
              location: 'Butwal',
              description:
                data.data?.getPublicItems?.nodes?.[0]?.description ??
                NotMentioned,
              requiredTime: '3hr',
              name: data.data?.getPublicItems?.nodes?.[0]?.name ?? NotMentioned,
              category: 'Vegitable',
              imageUrl:
                data.data?.getPublicItems?.nodes?.[0]?.imageUrls?.[0] ??
                ImageNotFound,
            },
            sellerDetails: {
              fullName:
                data.data?.getPublicItems?.nodes?.[0]?.shop?.user?.username ??
                NotMentioned,
              address: 'Butwal',
              shopName:
                data.data?.getPublicItems?.nodes?.[0]?.shop?.name ??
                NotMentioned,
              phoneNumber:
                data.data?.getPublicItems?.nodes?.[0]?.shop?.phoneNumber ??
                NotMentioned,
            },
            orderDetail: {
              message: 'chito gardeenu hai',
              orderQuantity: '1',
              itemID: itemId,
            },
          }),
        );
        navigation.navigate('ApplicationOverlay', {
          screen: 'PlaceOrderScreen',
        });
      })
      .catch(error => {
        showMessage(responseTheme('Something went wrong', '', 'danger'));
      });
  };

  return (
    <FlatList
      ListEmptyComponent={
        <SingnlePageInfo
          icon={<NoItemFound></NoItemFound>}
          detail={{
            title: 'No Any Item Found',
            message: EmptyMessage,
            onButtonPress: () => {
              navigationnBackHandle();
            },
            buttonTitle: 'Go to home',
          }}></SingnlePageInfo>
      }
      data={offerList}
      renderItem={({item, index}) => (
        <ProviderCard
          list={[
            {
              value: 'itemmmm',
              type: 'regular',
            },
          ]}
          isProgressBarEnable={false}
          onAcceptButtonPress={() =>
            placeOrderItemHandle(
              item.events?.data?.itemRequestOfferReceived?.itemId ??
                NotMentioned,
            )
          }
          setProfileTapped={() => console.log('REEEE')}
          imageUrl={DummyServiceProviderURL}></ProviderCard>
      )}></FlatList>
  );
};
