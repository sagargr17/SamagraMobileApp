import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSubscription} from '@apollo/client';
import {getSubscribedData} from '../../../GraphQL/Subscription/Subscription';
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

  console.log('LOG', data);

  const {colors} = useTheme();

  return <></>;
};
