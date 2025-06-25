import {useSubscription} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {SingnlePageInfo} from '../../Components/Organism/SinglePageInfo';
import {ProviderCardSkeleton} from '../../Components/Skeletons/Components/ProviderCardSkeleton';
import {EmptyMessage} from '../../Constants/UI/Messages';
import {getSubscribedData} from '../../GraphQL/Subscription/Subscription';
import {useAppSelector} from '../../StateManagement/hooks';
import {ProviderCard} from '../../Components/Molecules/Cards/ProviderCard';
import {DummyServiceProviderURL} from '../../Constants/UI/AssetsUrls';
import {GetDataSubscription} from '../../src/__generated__/graphql';

interface ReceivedOffersListScreenProps {}

export const ReceivedOffersListScreen: React.FC<
  ReceivedOffersListScreenProps
> = ({}) => {
  const [offerList, setOfferList] = useState<Array<GetDataSubscription>>([]);
  const {NoItemFound} = Logos;
  const [noItemFound, setNoItemFound] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  // RequestedItem Order
  const requestedItem = useAppSelector(state => state.sentOrderParams);

  const navigationnBackHandle = () => {
    navigation.goBack();
  };

  setTimeout(() => {
    setNoItemFound(true);
  }, 15000);

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

  const SkeletonLoading = (
    <>
      <ProviderCardSkeleton></ProviderCardSkeleton>
    </>
  );

  return (
    <>
      {offerList.length > 0 ? (
        <FlatList
          data={offerList}
          renderItem={({item, index}) => (
            <ProviderCard
              list={[
                {
                  value: 'aslkdjaslkdj',
                  type: 'regular',
                },
              ]}
              isProgressBarEnable={false}
              onAcceptButtonPress={() => {
                navigation.navigate('ApplicationOverlay', {
                  screen: 'PlaceOrderScreen',
                });
              }}
              setProfileTapped={() => console.log('REEEE')}
              imageUrl={DummyServiceProviderURL}></ProviderCard>
          )}></FlatList>
      ) : noItemFound ? (
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
      ) : (
        SkeletonLoading
      )}
    </>
  );
};
