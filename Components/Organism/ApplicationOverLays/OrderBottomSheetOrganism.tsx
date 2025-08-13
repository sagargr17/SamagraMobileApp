import {useMutation} from '@apollo/client';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {CreateItemRequestMutation} from '../../../GraphQL/Mutation/ItemRequestMutation';
import {RootStackNavigationProp} from '../../../Navigators/RootStackNavigator';
import {responseTheme, size} from '../../../Prefrences/Prefrences';
import {showLoader} from '../../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {useAppDispatch, useAppSelector} from '../../../StateManagement/hooks';
import {
  postOrderparams,
  SentordersParams,
} from '../../../StateManagement/Orders/SentOrderDetailSlice';
import {SpacerElement} from '../../Elements/SpacerElement';
import {BubbleCardMolecule} from '../../Molecules/Cards/BubbleCardMoleCule';
import {AppBottomSheetMolecule} from '../../Molecules/Global/AppBottomSheetMolecule';

import {ItemCategoryCardSlider} from './Order/ItemCategorySliderOrganism';
import {AppFormOrganism} from './AppFormOrganism';

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
  const {colors} = useTheme();

  const handleSubmit = (data: SentordersParams) => {
    dispatch(showLoader());
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

    navigation.navigate('ApplicationOverlay', {
      screen: 'ReceivedOfferListScreen',
    });
  };

  const childrenContent = () => {
    const userLocation = useAppSelector(
      state => state.user.userLocation?.address,
    );

    return (
      <View
        style={[
          {
            backgroundColor: colors.background,
            paddingHorizontal: size.spacing.xxs,
          },
        ]}>
        <SpacerElement height={20}></SpacerElement>
        <ItemCategoryCardSlider sizes="regular"></ItemCategoryCardSlider>
        <SpacerElement height={15}></SpacerElement>
        <AppFormOrganism<SentordersParams>
          formConfig={[
            {
              name: 'location',
              type: 'text',
              label: 'Location',

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
          customBottonPositionStyle={{
            marginBottom: size.spacing.s,
          }}
          onFormSubmit={handleSubmit}
          disabled={loading ? true : false}
          submitButtonText={`${
            loading ? 'loading' : 'Search'
          }`}></AppFormOrganism>
      </View>
    );
  };

  return (
    <AppBottomSheetMolecule
      isOppen={true}
      pannigGesture={false}
      children={childrenContent}
      // flexHeight={1}
      // title="Buy"
    ></AppBottomSheetMolecule>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: size.spacing.xs,
  },
});
