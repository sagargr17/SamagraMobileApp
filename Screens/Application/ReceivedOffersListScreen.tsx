import { useMutation, useSubscription } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Logos } from '../../Assets/SVG/Exports/Exports';
import { ProviderCard } from '../../Components/Molecules/Cards/ProviderCard';
import { SingnlePageInfo } from '../../Components/Organism/SinglePageInfo';
import { ProviderCardSkeleton } from '../../Components/Skeletons/Components/ProviderCardSkeleton';
import { DummyServiceProviderURL } from '../../Constants/UI/AssetsUrls';
import { EmptyMessage } from '../../Constants/UI/Messages';
import { CreateItemRequestMutation } from '../../GraphQL/Mutation/ItemRequestMutation';
import { getSubscribedData } from '../../GraphQL/Subscription/Subscription';
import { useAppSelector } from '../../StateManagement/hooks';

interface ReceivedOffersListScreenProps {}

export const ReceivedOffersListScreen: React.FC<
  ReceivedOffersListScreenProps
> = ({}) => {
  const [offerList, setOfferList] = useState<Array<any>>([]);
  const {NoItemFound} = Logos;
  const [personalUserDetail, setPersonalDetail] = useState<React.ReactNode>();
  const [noItemFound, setNoItemFound] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  // RequestedItem Order
  const requestedItem = useAppSelector(state => state.sentOrderParams);

  const navigationnBackHandle = () => {
    navigation.goBack();
  };

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

  // useEffect(() => {
  //   createItemRequestFn();
  // }, []);

  setTimeout(() => {
    setNoItemFound(true);
  }, 10000);

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
                  navigation.navigate('ApplicationOverlay', {
                    screen: 'PlaceOrderScreen',
                  });
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
          <SingnlePageInfo
            detail={{
              icon: <NoItemFound></NoItemFound>,
              title: EmptyMessage,
              onButtonPress: () => {
                navigationnBackHandle();
              },
              buttonTitle: 'Go to home',
            }}></SingnlePageInfo>
        ) : (
          SkeletonLoading
        )}
      </>
    </>
  );
};
