import {useSubscription} from '@apollo/client';
import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {getSubscribedData} from '../../../GraphQL/Subscription/Subscription';
import {Text} from 'react-native';
import {ReceivedOrderListScreen} from './ReceivedOrdersListScreen';
interface ReceivedOffersListScreenProps {}

export const ReceivedOffersListScreen: React.FC<
  ReceivedOffersListScreenProps
> = ({}) => {
  const [offerList, setOfferList] = useState<Array<any>>([]);
  const {data, loading, error} = useSubscription(getSubscribedData, {
    onData: ({client, data}) => {
      if (data.data && data.data.events) {
        if (data.data?.events?.eventName === '') {
          setOfferList([data.data, ...offerList]);
        }
      }
    },
  });

  const {colors} = useTheme();

  return (
    <>
      <ReceivedOrderListScreen></ReceivedOrderListScreen>
    </>
  );
};
