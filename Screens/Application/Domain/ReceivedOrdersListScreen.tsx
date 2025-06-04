import React, {useState} from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {ProviderCard} from '../../../Components/Sections/Cards/ProviderCard';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {AppBottomSheet} from '../../../Components/Sections/AppBottomSheet';
import {TextComponet} from '../../../Components/Elements/TextComponet';
import {PairButtons} from '../../../Components/Sections/PairButtons';
import {SingnlePageError} from '../../../Components/Layout/SinglePageError';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {useMutation, useSubscription} from '@apollo/client';
import {getSubscribedData} from '../../../GraphQL/Subscription/Subscription';
import {GetDataSubscription} from '../../../src/__generated__/graphql';
import {useNavigation} from '@react-navigation/native';
import {ProviderCardSkeleton} from '../../../Components/Sections/Loading/Skeletons/ProviderCardSkeleton';

interface ReceivedOrderListScreenProps {}

export const ReceivedOrderListScreen: React.FC<
  ReceivedOrderListScreenProps
> = ({}) => {
  const [personalUserDetail, setPersonalDetail] = useState<React.ReactNode>();
  const [isProfileTapped, setIsProfileTapped] = useState<boolean>(false);
  const [orderlist, setOrderList] = useState<Array<GetDataSubscription>>([]);
  const navigation = useNavigation<any>();
  const {NoItemFound} = Logos;
  // const {data, loading, error} = useSubscription(getSubscribedData, {
  //   onData: ({client, data}) => {
  //     console.log('Result', data);

  //     if (data.data && data.data.events) {
  //       if (data.data?.events?.eventName === 'orderRecieved') {
  //         setOrderList([data.data, ...orderlist]);
  //       }
  //     }
  //   },
  // });

  // const [aaceptOrderFn, {data, loading, error}] = useMutation();

  const onAcceptHandle = () => {
    console.log('Result.....');
  };

  return (
    <>
      <View
        style={{
          paddingTop: AreaMapper({
            value: 10,
            scaleBy: 'height',
          }),
          paddingBottom: AreaMapper({
            value: 10,
            scaleBy: 'height',
          }),
        }}>
        {!loading && !error ? (
          orderlist.length > 0 ? (
            <FlatList
              data={orderlist}
              renderItem={({item, index}) => (
                <ProviderCard
                  isProgressBarEnable={false}
                  onAcceptButtonPress={onAcceptHandle}
                  setIsProfileTapped={setIsProfileTapped}
                  setPersonalDetaile={setPersonalDetail}
                  priceperhour={Math.floor(Math.random() * 5) + 1}
                  distance={Math.floor(Math.random() * 5) + 1}
                  rating={Math.floor(Math.random() * 5) + 1}
                  titleName={
                    !loading && item && item.events && !error && item.events.id
                      ? item.events.id
                      : 'loading..'
                  }
                  image="https://nepalcleaningsolution.com/wp-content/uploads/2023/01/about-us.jpg"></ProviderCard>
              )}></FlatList>
          ) : (
            <>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <SingnlePageError
                  detail={{
                    icon: <NoItemFound></NoItemFound>,
                    title:
                      'Oops! We couldn’t find any laundry services nearby. Try changing your location or searching again later',
                    onButtonPress: () => {
                      navigation.navigate('ApplicationOverlay', {
                        screen: 'OrderListScreen',
                      });
                    },
                    buttonTitle: 'Go to home',
                  }}></SingnlePageError>
              </View>
            </>
          )
        ) : (
          <>
            <ProviderCardSkeleton></ProviderCardSkeleton>
            <ProviderCardSkeleton></ProviderCardSkeleton>
            <ProviderCardSkeleton></ProviderCardSkeleton>
            <ProviderCardSkeleton></ProviderCardSkeleton>
            <ProviderCardSkeleton></ProviderCardSkeleton>
          </>
        )}
      </View>

      {isProfileTapped ? (
        <AppBottomSheet
          onClose={() => setIsProfileTapped(!isProfileTapped)}
          isOppen={isProfileTapped}
          // indexValue={isProfileTapped ? 0 : -1}
          flexHeight={0.17}
          pannigGesture={isProfileTapped ? true : false}
          title="Profile Details"
          children={() => (
            <>
              {personalUserDetail}
              <View
                style={{
                  paddingHorizontal: AreaMapper({
                    value: 16,
                    scaleBy: 'average',
                  }),
                  flex: 1,
                }}>
                <View
                  style={{
                    marginVertical: AreaMapper({
                      value: 6,
                      scaleBy: 'average',
                    }),
                  }}>
                  <TextComponet
                    title={'E-mail:'}
                    fontVariant="regular"
                    fontSize={18}
                    lineHeight={24}></TextComponet>
                  <TextComponet
                    title={'Ram@gmail.com'}
                    fontVariant="medium"
                    fontSize={18}
                    lineHeight={24}></TextComponet>
                </View>
                <View>
                  <TextComponet
                    title={'Location:'}
                    fontVariant="regular"
                    fontSize={18}
                    lineHeight={24}></TextComponet>
                  <TextComponet
                    title={'Baneswor, Bhimsengola'}
                    fontVariant="medium"
                    fontSize={18}
                    lineHeight={24}></TextComponet>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginVertical: 10,
                  }}>
                  <PairButtons
                    onAcceptPress={() => {
                      console.log('Hello World');
                    }}
                    onDeclinPress={() => {
                      console.log('Hello World');
                    }}></PairButtons>
                </View>
              </View>
            </>
          )}></AppBottomSheet>
      ) : null}
    </>
  );
};
