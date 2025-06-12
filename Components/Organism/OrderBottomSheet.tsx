import {useMutation} from '@apollo/client';
import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {CreateItemRequestMutation} from '../../GraphQL/Mutation/ItemRequestMutation';
import {RootStackNavigationProp} from '../../Navigators/RootStackNavigator';
import {AreaMapper} from '../../Utilities/CustomMethods';
import AppButton from '../Elements/Button';
import {Input} from '../Elements/Input';
import {UnitSlider} from '../Elements/UnitSlider';
import {AppBottomSheet} from '../Molecules/Global/AppBottomSheet';
import {ItemCategoryCardSlider} from './ItemCategorySlider';
import {AppForm} from './AppForm';
import {useAppDispatch} from '../../StateManagement/hooks';
import {
  postOrderparams,
  SentordersParams,
} from '../../StateManagement/Orders/SentOrderParams';

interface OrderBottomSheetProps {
  navigation: RootStackNavigationProp<'ApplicationOverlay'> | any;
}

export const OrderBottomSheet: React.FC<OrderBottomSheetProps> = ({
  navigation,
}) => {
  const {colors} = useTheme();
  type childrenContent = () => React.ReactNode;
  const [pressedElement, setPressedElement] = useState<string>('global');
  const dispatch = useAppDispatch();
  const handleSubmit = (data: SentordersParams) => {
    dispatch(
      postOrderparams({
        itemParams: {
          location: data.itemParams.location,
          description: data.itemParams.description,
          requiredTime: '2',
          name: data.itemParams.name,
          category: '1',
        },
      }),
    );

    //  Navigation
    navigation.navigate('ApplicationOverlay', {
      screen: 'ReceivedOfferListScreen',
    });
  };

  const childrenContent = () => {
    // Testing Datas are below
    const serviceData = [
      {label: 'Laundry', value: '1'},
      {label: 'House Keeping', value: '2'},
    ];
    const timeData = [
      {label: '2Hr', value: '1'},
      {label: '1Hr', value: '2'},
      {label: '3Hr', value: '3'},
      {label: '4Hr', value: '4'},
    ];

    type inputElement = () => React.ReactNode;
    const inputElement = (info: {
      label: string;
      placeHolder: string;
      icon?: React.ReactElement;
    }) => {
      return (
        <Input
          onPress={() => setPressedElement('location')}
          label={info.label}
          placeholder={info.placeHolder}
          left={info.icon ?? info.icon}></Input>
      );
    };

    return (
      <View style={styles.childrenContainer}>
        {/* {pressedElement === 'global' || 'location'
          ? inputElement({
              label: 'Location',
              placeHolder: 'Baneswor',
              icon: (
                <TextInput.Icon
                  color={colors.primary}
                  size={AreaMapper({
                    value: 22,
                    scaleBy: 'average',
                  })}
                  icon={'map-marker-radius-outline'}></TextInput.Icon>
              ),
            })
          : null}

        {pressedElement === 'global' || 'description'
          ? inputElement({
              label: 'Description',
              placeHolder: 'Please Chito aaunu na hai',
              icon: (
                <TextInput.Icon
                  color={colors.primary}
                  size={AreaMapper({
                    value: 22,
                    scaleBy: 'average',
                  })}
                  icon={'comment-edit-outline'}></TextInput.Icon>
              ),
            })
          : null}
        {pressedElement === 'global' || 'time' ? (
          <UnitSlider
            label="Time in hour"
            sliderOption={{
              max: 4,
              min: 1,
              maximumTrackTintColor: 'gray',
              minimumTrackTintColor: colors.primary,
            }}></UnitSlider>
        ) : null}

        <AppButton
          disabled={loading}
          onPress={() => {
            navigation.navigate('ApplicationOverlay', {
              screen: 'ReceivedOfferListScreen',
            });
          }}>
          {loading ? (
            <ActivityIndicator color={'white'}></ActivityIndicator>
          ) : (
            'Search'
          )}

        </AppButton> */}

        <AppForm<SentordersParams>
          formConfig={[
            {
              name: 'itemParams.location',
              type: 'text',
              label: 'Location',
              rules: {
                required: 'Location is required',
              },
            },
            {
              name: 'itemParams.description',
              type: 'text',
              label: 'Name',
              rules: {
                required: 'Name is required',
              },
            },
            {
              name: 'itemParams.name',
              type: 'text',
              label: 'Description',
              rules: {
                required: 'Description is required',
              },
            },
          ]}
          onFormSubmit={handleSubmit}
          submitButtonText="Search"
          ></AppForm>
      </View>
    );
  };

  return (
    <>
      <AppBottomSheet
        isOppen={true}
        flexHeight={0}
        pannigGesture={false}
        title="Request for House Keeping Service"
        children={childrenContent}></AppBottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  childrenContainer: {
    paddingVertical: AreaMapper({
      scaleBy: 'average',
      value: 10,
    }),
  },
});
