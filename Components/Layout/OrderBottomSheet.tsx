import React, {Children} from 'react';
import {SamagraBottomSheet} from '../Sections/SamagraBottomSheet';
import {Text, View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Input} from '../Elements/Input';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {TextInput} from 'react-native-paper';
import {DropdownComponent} from '../Sections/DropDownSection';
import AppButton from '../Elements/Button';
import {ApplicationOverlayStackNavigationProp} from '../../Navigators/Stack/ApplicationOverlayStackNavigator';
import {BottomTabProps} from '../../Navigators/BottomTab/BottomTabNavigator';
import {RootStackNavigationProp} from '../../Navigators/RootStackNavigator';
import {ItemCategoryCardSlider} from './ItemCategorySlider';

interface OrderBottomSheetProps {
  navigation: RootStackNavigationProp<'ApplicationOverlay'> | any;
}

export const OrderBottomSheet: React.FC<OrderBottomSheetProps> = ({
  navigation,
}) => {
  type childrenContent = () => React.ReactNode;
  const childrenContent = () => {
    const serviceData = [
      {label: 'Laundry', value: '1'},
      {label: 'House Keeping', value: '2'},
    ];
    const timeData = [
      {label: '2Hr', value: '1'},
      {label: '1Hr', value: '2'},
    ];

    return (
      <View style={styles.childrenContainer}>
        <ItemCategoryCardSlider size="regular"></ItemCategoryCardSlider>

        <Input
          label="Your Location"
          placeholder=""
          left={
            <TextInput.Icon
              icon="map-marker-outline"
              size={SamagraScaller({value: 22, scaleBy: 'average'})}
            />
          }></Input>

        <DropdownComponent
          data={serviceData}
          labelTitle="Please Select the Service"></DropdownComponent>
        <DropdownComponent
          data={timeData}
          labelTitle="Time"></DropdownComponent>
        <AppButton
          onPress={() => {
            navigation.navigate('ApplicationOverlay', {
              screen: 'ServiceListScreen',
            });
          }}>
          Search
        </AppButton>
      </View>
    );
  };

  return (
    <>
      <SamagraBottomSheet
        isOppen={true}
        flexHeight={0}
        pannigGesture={false}
        title="Request for House Keeping Service"
        children={childrenContent}></SamagraBottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  childrenContainer: {
    paddingVertical: SamagraScaller({
      scaleBy: 'average',
      value: 10,
    }),
  },
});
