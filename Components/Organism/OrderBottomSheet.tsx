import {useMutation} from '@apollo/client';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {CreateItemRequestMutation} from '../../GraphQL/Mutation/ItemRequestMutation';
import {RootStackNavigationProp} from '../../Navigators/RootStackNavigator';
import {responseTheme, size} from '../../Prefrences/Prefrences';
import {showLoader} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {
  postOrderparams,
  SentordersParams,
} from '../../StateManagement/Orders/SentOrderParams';
import {AppBottomSheet} from '../Molecules/Global/AppBottomSheet';
import {AppForm} from './AppForm';
import {ItemCategoryCardSlider} from './ItemCategorySlider';
import {SamagraLoader} from '../Molecules/Response/SamagraLoader';
import {GetAuthenticateClient} from '../../client/Graphql/AuthenticatedClient';
import {ScrollView} from 'react-native-gesture-handler';
import {Spacer} from '../Elements/Spacer';
import {Divider} from 'react-native-paper';
import {BubbleCard} from '../Molecules/Cards/BubbleCard';

interface OrderBottomSheetProps {
  navigation: RootStackNavigationProp<'ApplicationOverlay'> | any;
}

export const OrderBottomSheet: React.FC<OrderBottomSheetProps> = ({
  navigation,
}) => {
  type childrenContent = () => React.ReactNode;
  const dispatch = useAppDispatch();
  const [createItemRequestFn, {loading}] = useMutation(
    CreateItemRequestMutation,
  );

  const handleSubmit = (data: SentordersParams) => {
    dispatch(showLoader());
    console.log('Calling the function');
    createItemRequestFn({
      variables: {
        itemName: data.name,
        categoryID: '1',
      },
    })
      .then(res => {
        console.log('response Create Items', res);
        console.log('Order Created', res.data?.createItemRequest?.id);
        // Dispatch
        dispatch(
          postOrderparams({
            location: data.location,
            description: data.description,
            requiredTime: '2',
            name: data.name,
            category: '1',
            id: res.data?.createItemRequest?.id ?? '',
          }),
        );
        // Navigation
        navigation.navigate('ApplicationOverlay', {
          screen: 'ReceivedOfferListScreen',
        });
      })
      .catch(err => {
        console.log('Message', err);

        showMessage(
          responseTheme('Something Went Wrong', 'PLease Try again', 'danger'),
        );
      });
  };

  const childrenContent = () => {
    const userLocation = useAppSelector(
      state => state.user.userLocation?.address,
    );

    return (
      <View style={styles.wrapper}>
        <Spacer height={55}></Spacer>
        <Spacer height={120}></Spacer>

        <ItemCategoryCardSlider sizes="regular"></ItemCategoryCardSlider>
        {/* <Divider></Divider> */}
        <AppForm<SentordersParams>
          formConfig={[
            {
              name: 'location',
              type: 'text',
              label: 'Location',

              // rules: {
              //   required: 'Location is required',
              // },
              defaultValue: userLocation,
            },
            {
              name: 'name',
              type: 'text',
              label: 'Your Need',
              rules: {
                required: 'Name is required',
              },
            },
            {
              name: 'description',
              type: 'text',
              label: 'Note',
              rules: {
                required: 'Note is required',
              },
            },
          ]}
          onFormSubmit={handleSubmit}
          disabled={loading ? true : false}
          submitButtonText={`${loading ? 'loading' : 'Search'}`}></AppForm>
      </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: size.spacing.xs,
      }}>
      {childrenContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: size.spacing.m,
    marginTop: size.spacing.l,
  },
});
