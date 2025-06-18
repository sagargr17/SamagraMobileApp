import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RootStackNavigationProp} from '../../Navigators/RootStackNavigator';
import {useAppDispatch, useAppSelector} from '../../StateManagement/hooks';
import {
  postOrderparams,
  SentordersParams,
} from '../../StateManagement/Orders/SentOrderParams';
import {Input} from '../Elements/Input';
import {AppBottomSheet} from '../Molecules/Global/AppBottomSheet';
import {AppForm} from './AppForm';
import {ItemCategoryCardSlider} from './ItemCategorySlider';
import {UnitSlider} from '../Elements/UnitSlider';
import {CreateStoreInputViewModelInput} from '../../src/__generated__/graphql';
import {showLoader} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
import {Icon} from 'react-native-paper';
import { size } from '../../Prefrences/Prefrences';

interface OrderBottomSheetProps {
  navigation: RootStackNavigationProp<'ApplicationOverlay'> | any;
}

export const OrderBottomSheet: React.FC<OrderBottomSheetProps> = ({
  navigation,
}) => {
  type childrenContent = () => React.ReactNode;
  const dispatch = useAppDispatch();
  const handleSubmit = (data: SentordersParams) => {
    dispatch(showLoader());

    dispatch(
      postOrderparams({
        location: data.location,
        description: data.description,
        requiredTime: '2',
        name: data.name,
        category: '1',
      }),
    );

    //  Navigation
    navigation.navigate('ApplicationOverlay', {
      screen: 'ReceivedOfferListScreen',
    });
  };

  const childrenContent = () => {
    const userLocation = useAppSelector(state => state.user.user?.location);

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
              name: 'description',
              type: 'text',
              label: 'Name',
              rules: {
                required: 'Name is required',
              },
            },
            {
              name: 'name',
              type: 'text',
              label: 'Note',
              rules: {
                required: 'Note is required',
              },
            },
          ]}
          onFormSubmit={handleSubmit}
          // onFormSubmit={() => console.log('sadlksajdlkjasd')}
          submitButtonText="Search"></AppForm>
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
