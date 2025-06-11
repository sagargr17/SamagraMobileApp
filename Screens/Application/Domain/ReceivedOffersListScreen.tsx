import {useMutation, useSubscription} from '@apollo/client';
import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {getSubscribedData} from '../../../GraphQL/Subscription/Subscription';
import {FlatList, Text} from 'react-native';
import {ReceivedOrderListScreen} from '../More/Shop/ReceivedOrdersListScreen';
import {ProviderCardSkeleton} from '../../../Components/Skeletons/ProviderCardSkeleton';
import {TextComponet} from '../../../Components/Elements/TextComponet';
import {ProviderCard} from '../../../Components/Molecules/Cards/ProviderCard';
import {SingnlePageError} from '../../../Components/Molecules/SinglePageError';
import {EmptyErrorMessage} from '../../../Constants/UI/Messages';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {DummyServiceProviderURL} from '../../../Constants/UI/AssetsUrls';
import {CreateItemRequestMutation} from '../../../GraphQL/Mutation/ItemRequestMutation';
import {useAppSelector} from '../../../StateManagement/hooks';
import {store} from '../../../StateManagement/Store';
interface ReceivedOffersListScreenProps {}

export const ReceivedOffersListScreen: React.FC<
  ReceivedOffersListScreenProps
> = ({}) => {
  const [offerList, setOfferList] = useState<Array<any>>([]);
  const {NoItemFound} = Logos;
  const [personalUserDetail, setPersonalDetail] = useState<React.ReactNode>();
  const [noItemFound, setNoItemFound] = useState<boolean>(false);
  // RequestedItem Order
  const requestedItem = useAppSelector(
    state => state.sentOrderParams.itemParams,
  );

  const [
    createItemRequestFn,
    {
      data: createItemRequestData,
      loading: createItemRequestLoading,
      error: createItemRequestError,
    },
  ] = useMutation(CreateItemRequestMutation, {
    variables: {
      categoryID: '1',
      itemName: requestedItem.name,
    },
  });

  useEffect(() => {
    createItemRequestFn();
  }, []);

  setTimeout(() => {
    setNoItemFound(true);
  }, 5000);

  const {data, loading, error} = useSubscription(getSubscribedData, {
    onData: ({client, data}) => {
      console.log('DATA', data);
      if (
        data.data &&
        data.data.events?.eventName &&
        data.data.events.data?.itemRequestOfferReceived &&
        data.data.events.data?.itemRequestOfferReceived.itemRequestId ===
          createItemRequestData?.createItemRequest?.id
      ) {
        setOfferList([data.data, ...offerList]);
      }
    },
  });



  
  console.log('Subscription Update', data, loading, error);

  const SkeletonLoading = (
    <>
      <ProviderCardSkeleton></ProviderCardSkeleton>
      <ProviderCardSkeleton></ProviderCardSkeleton>
      <ProviderCardSkeleton></ProviderCardSkeleton>
      <ProviderCardSkeleton></ProviderCardSkeleton>
      <ProviderCardSkeleton></ProviderCardSkeleton>
    </>
  );

  return (
    <>
      <>
        {offerList.length > 0 ? (
          <FlatList
            data={offerList}
            renderItem={({item, index}) => (
              <ProviderCard
                isProgressBarEnable={false}
                onAcceptButtonPress={() => {
                  console.log('');
                }}
                setIsProfileTapped={() => console.log('REEEE')}
                setPersonalDetaile={setPersonalDetail}
                priceperhour={Math.floor(Math.random() * 5) + 1}
                distance={Math.floor(Math.random() * 5) + 1}
                rating={Math.floor(Math.random() * 5) + 1}
                titleName={
                  item.events?.sender?.username
                    ? item.events.sender.username + item.events.id
                    : 'Loading...'
                }
                image={DummyServiceProviderURL}></ProviderCard>
            )}></FlatList>
        ) : noItemFound ? (
          <SingnlePageError
            detail={{
              icon: <NoItemFound></NoItemFound>,
              title: EmptyErrorMessage,
              onButtonPress: () => {},
              buttonTitle: 'Go to home',
            }}></SingnlePageError>
        ) : (
          SkeletonLoading
        )}
      </>
    </>
  );
};
