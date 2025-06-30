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

  const authenticateClient = GetAuthenticateClient;
  const handleSubmit = (data: SentordersParams) => {
    dispatch(showLoader());
    console.log('Calling the function');
    authenticateClient
      .mutate({
        mutation: CreateItemRequestMutation,
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
    const userLocation = useAppSelector(state => state.user.user?.Userlocation);

    return (
      <View style={styles.wrapper}>
        <ItemCategoryCardSlider sizes="regular"></ItemCategoryCardSlider>
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
    <>
      <AppBottomSheet
        isOppen={true}
        flexHeight={1}
        pannigGesture={false}
        title="Request for House Keeping Service"
        children={childrenContent}></AppBottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: size.spacing.xs,
  },
});
