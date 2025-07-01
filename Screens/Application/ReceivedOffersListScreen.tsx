import {useLazyQuery, useSubscription} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList} from 'react-native';

import {showMessage} from 'react-native-flash-message';
import {ProviderCard} from '../../Components/Molecules/Cards/ProviderCard';
import {
  DummyServiceProviderURL,
  ImageNotFound,
} from '../../Constants/UI/AssetsUrls';
import {NotMentioned} from '../../Constants/UI/Messages';
import {getPublicItemsById} from '../../GraphQL/Queries/ItemQueries';
import {getSubscribedData} from '../../GraphQL/Subscription/Subscription';
import {responseTheme} from '../../Prefrences/Prefrences';
import {GetDataSubscription} from '../../src/__generated__/graphql';
import {showLoader} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {postPlaceOrderparams} from '../../StateManagement/Orders/PlaceOrderDetailsParams';
import {ProviderCardSkeleton} from '../../Components/Skeletons/Components/ProviderCardSkeleton';

interface ReceivedOffersListScreenProps {}

export const ReceivedOffersListScreen: React.FC<
  ReceivedOffersListScreenProps
> = ({}) => {
  const [offerList, setOfferList] = useState<Array<GetDataSubscription>>([]);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [
    getMyItemFn,
    {data: myItem, loading: myItemLoading, error: myItemError},
  ] = useLazyQuery(getPublicItemsById);

  // RequestedItem Order
  const requestedItem = useAppSelector(state => state.sentOrderParams);

  const {data, loading, error} = useSubscription(getSubscribedData, {
    onData: ({client, data}) => {
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
      data={offerList}
      renderItem={({item, index}) => (
        <ProviderCard
          list={[
            {
              value:
                item.events?.data?.itemRequestOfferReceived?.itemId ?? 'Item',
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
      )}
      ListFooterComponent={
        loading ? <ProviderCardSkeleton></ProviderCardSkeleton> : null
      }></FlatList>
  );
};
