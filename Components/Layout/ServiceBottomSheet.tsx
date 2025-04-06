import React from 'react';
import {SamagraBottomSheet} from '../Sections/SamagraBottomSheet';
import {Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Input} from '../Elements/Input';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {TextInput} from 'react-native-paper';
import DropdownComponent from '../Sections/DropDownSection';

interface ServiceBottomSheetProps {}

export const ServiceBottomSheet: React.FC<ServiceBottomSheetProps> = ({}) => {
  type childrenContent = () => React.ReactNode;
  const childrenContent = () => {
    return (
      <View
        style={{
          paddingVertical: SamagraScaller({
            scaleBy: 'average',
            value: 10,
          }),
        }}>
        <DropdownComponent></DropdownComponent>
        <Input
          label="Please Select the service"
          placeholder="Enter Your Location"
          left={
            <TextInput.Icon
              icon="map-marker-outline"
              size={SamagraScaller({value: 22, scaleBy: 'average'})}
            />
          }></Input>
        <Input
          label="Please Select the service"
          placeholder="Enter Your Location"
          left={
            <TextInput.Icon
              icon="map-marker-outline"
              size={SamagraScaller({value: 22, scaleBy: 'average'})}
            />
          }></Input>
        <Input
          label="Please Select the service"
          placeholder="Enter Your Location"
          left={
            <TextInput.Icon
              icon="map-marker-outline"
              size={SamagraScaller({value: 22, scaleBy: 'average'})}
            />
          }></Input>
        <Input
          label="Please Select the service"
          placeholder="Enter Your Location"
          left={
            <TextInput.Icon
              icon="map-marker-outline"
              size={SamagraScaller({value: 22, scaleBy: 'average'})}
            />
          }></Input>
        <Input
          label="Please Select the service"
          placeholder="Enter Your Location"
          left={
            <TextInput.Icon
              icon="map-marker-outline"
              size={SamagraScaller({value: 22, scaleBy: 'average'})}
            />
          }></Input>
      </View>
    );
  };

  return (
    <>
      <SamagraBottomSheet
        title="Laundry Service"
        children={childrenContent}></SamagraBottomSheet>
    </>
  );
};
