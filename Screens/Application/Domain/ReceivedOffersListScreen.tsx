import {useSubscription} from '@apollo/client';
import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {getSubscribedData} from '../../../GraphQL/Subscription/Subscription';
import {Text} from 'react-native';
import {ReceivedOrderListScreen} from '../More/Shop/ReceivedOrdersListScreen';
interface ReceivedOffersListScreenProps {}

export const ReceivedOffersListScreen: React.FC<
  ReceivedOffersListScreenProps
> = ({}) => {
  const [offerList, setOfferList] = useState<Array<any>>([]);

  return <></>;
};
