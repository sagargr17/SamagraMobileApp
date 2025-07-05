import {useMutation, useQuery, useSubscription} from '@apollo/client';
import {useIsFocused, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Linking,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {AppText} from '../../Components/Elements/AppText';
import AppButton from '../../Components/Elements/Button';
import {Spacer} from '../../Components/Elements/Spacer';
import {ProviderCard} from '../../Components/Molecules/Cards/ProviderCard';
import {AppBottomSheet} from '../../Components/Molecules/Global/AppBottomSheet';
import {SingnlePageInfo} from '../../Components/Organism/SinglePageInfo';
import {DummyServiceProviderURL} from '../../Constants/UI/AssetsUrls';
import {NoAnyorderItemsFoud, NotMentioned} from '../../Constants/UI/Messages';
import {createItemRequestOfferMutation} from '../../GraphQL/Mutation/ItemRequestMutation';
import {getAllPersonalItems} from '../../GraphQL/Queries/ItemQueries';
import {getSubscribedData} from '../../GraphQL/Subscription/Subscription';
import {size} from '../../Prefrences/Prefrences';
import {
  GetDataSubscription,
  OrderViewModel,
} from '../../src/__generated__/graphql';
import {showLoader} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import DateTimeToAgoTime, {
  AreaMapper,
  titleCase,
} from '../../Utilities/CustomMethods';

interface ReceivedorderListScreenProps {}

export const ReceivedorderListScreen: React.FC<
  ReceivedorderListScreenProps
> = ({}) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const [personalUserDetail, setPersonalDetail] = useState<
    OrderViewModel | any
  >();
  const [orderlist, setOrderList] = useState<Array<GetDataSubscription>>([]);
  const [isProfileTapped, setIsProfileTapped] = useState<boolean>(false);
  const userLocation = useAppSelector(state => state.user.userLocation);
  const isFocoused = useIsFocused();
  const {NoItemFound} = Logos;
  const {data, error} = useSubscription(getSubscribedData, {
    onData: ({data}) => {
      console.log('Orders', data);
      if (
        data.data &&
        data.data.events?.eventName &&
        data.data.events.data?.orderReceived
      ) {
        setOrderList([...orderlist, data.data]);
      }
      if (data.data?.events?.data?.orderReceived) {
        // showMessage(responseTheme('You received order', '', 'success'));
      }
    },
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsProfileTapped(false);
  }, [isFocoused]);

  // Accepting the query
  if (!data && error)
    return (
      <AppText
        fontSizeVariant="regular"
        fontVariant="regular"
        title={error.message}></AppText>
    );

  const profileDetailInfo = (
    <>
      <View style={styles.userInformationContainer}>
        <View style={styles.emailContainer}>
          <AppText
            title={'Name:'}
            fontVariant="regular"
            fontSizeVariant={'regular'}></AppText>
          <AppText
            title={personalUserDetail?.fullName ?? 'Sagar'}
            fontVariant="medium"
            fontSizeVariant={'regular'}></AppText>
        </View>
        <TouchableHighlight
          touchSoundDisabled
          underlayColor={colors.card}
          onPress={async () => {
            Linking.openURL(
              `https://www.google.com/maps/search/?api=1&query=${userLocation?.lat},${userLocation?.long}`,
            );
          }}>
          <View style={styles.locationcontainer}>
            <AppText
              title={'Location:'}
              fontVariant="regular"
              fontSizeVariant={'regular'}></AppText>
            <View>
              <AppText
                title={personalUserDetail?.address ?? 'Baneswor, Kathmandu '}
                fontVariant="medium"
                fontSizeVariant={'regular'}></AppText>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.locationcontainer}>
          <AppText
            title={'Location:'}
            fontVariant="regular"
            fontSizeVariant={'regular'}></AppText>
          <AppText
            title={`${personalUserDetail?.phoneNumber ?? 9841105090}`}
            fontVariant="medium"
            fontSizeVariant={'regular'}></AppText>
        </View>
      </View>
      <Spacer height={20}></Spacer>
      <AppButton
        onPress={() => {
          setIsProfileTapped(!isProfileTapped);
        }}>
        Complete
      </AppButton>
      <Spacer height={20}></Spacer>
    </>
  );

  useEffect(() => {
    let task = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(task);
  }, [loading]);

  if (loading)
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <ActivityIndicator
          color={colors.primary}
          size={'large'}></ActivityIndicator>
        <Spacer height={20}></Spacer>
        <AppText title="Searching Request..."></AppText>
      </View>
    );

  return (
    <>
      <FlatList
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              marginTop: 120,
            }}>
            <SingnlePageInfo
              icon={<NoItemFound></NoItemFound>}
              detail={{
                title: 'No Any Request Currently',
                message: NoAnyorderItemsFoud,
                onButtonPress: () => setLoading(!loading),
                buttonTitle: 'Reload',
              }}></SingnlePageInfo>
          </View>
        }
        data={orderlist}
        renderItem={({item, index}) => (
          <ProviderCard
            list={[
              {
                value:
                  item.events?.data?.orderReceived?.itemName ?? NotMentioned,
                type: 'regular',
                fontVariant: 'medium',
              },
              {
                value:
                  titleCase(item.events?.data?.orderReceived?.fullName) ??
                  NotMentioned,
                type: 'caption',
                fontVariant: 'bold',
              },
              {
                value: `Rs.${
                  item.events?.data?.orderReceived?.price ?? NotMentioned
                }`,
                type: 'caption',
              },
              {
                value: `${
                  DateTimeToAgoTime(
                    item.events?.data?.orderReceived?.dateTime,
                  ) ?? NotMentioned
                }`,
                type: 'caption',
              },
              {
                value: 'Offer Accepted',
                type: 'caption',
                style: {
                  color: 'white',
                  backgroundColor: colors.primary,
                  width: AreaMapper({value: 100}),
                  textAlign: 'center',
                  borderRadius: size.borderRadius.xs - 2,
                  paddingHorizontal: 2,
                  paddingVertical: 3,
                  marginTop: 4,
                },
              },
            ]}
            key={index}
            isProgressBarEnable={false}
            onAcceptButtonPress={() => {
              dispatch(showLoader());
            }}
            setProfileTapped={() => {
              setPersonalDetail(item.events?.data?.orderReceived);
              setIsProfileTapped(!isProfileTapped);
            }}
            imageUrl={DummyServiceProviderURL}
            isButtonVisible={false}></ProviderCard>
        )}></FlatList>

      {/* App BottomSheet */}
      {isProfileTapped ? (
        <AppBottomSheet
          onClose={() => setIsProfileTapped(!isProfileTapped)}
          isOppen={isProfileTapped}
          flexHeight={0.17}
          pannigGesture={true}
          title="Profile Details"
          children={() => <>{profileDetailInfo}</>}></AppBottomSheet>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: size.spacing.xs,
    paddingBottom: size.spacing.xs,
  },
  userInformationContainer: {
    paddingHorizontal: size.spacing.xs,
    flex: 1,
  },

  emailContainer: {
    marginVertical: size.spacing.xs,
  },

  locationcontainer: {
    marginVertical: size.spacing.xs,
  },
});
