import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, TextInput} from 'react-native-paper';
import {RootStackNavigationProp} from '../../Navigators/RootStackNavigator';
import {AreaMapper} from '../../Utilities/CustomMethods';
import AppButton from '../Elements/Button';
import {Input} from '../Elements/Input';
import {DropdownComponent} from '../Sections/DropDownSection';
import {AppBottomSheet} from '../Sections/AppBottomSheet';
import {ItemCategoryCardSlider} from './ItemCategorySlider';
import {UnitSlider} from '../Elements/UnitSlider';

interface OrderBottomSheetProps {
  navigation: RootStackNavigationProp<'ApplicationOverlay'> | any;
}

export const OrderBottomSheet: React.FC<OrderBottomSheetProps> = ({
  navigation,
}) => {
  const {colors} = useTheme();
  type childrenContent = () => React.ReactNode;
  const [pressedElement, setPressedElement] = useState<string>('global');
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
          style={{
            marginBottom: AreaMapper({
              value: 5,
              scaleBy: 'average',
            }),
            backgroundColor: colors.card,
          }}
          onPress={() => setPressedElement('location')}
          label={info.label}
          placeholder={info.placeHolder}
          left={info.icon ?? info.icon}></Input>
      );
    };

    return (
      <View style={styles.childrenContainer}>
        <ItemCategoryCardSlider size="regular"></ItemCategoryCardSlider>

        {pressedElement === 'global' || 'location'
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
              placeHolder: 'Baneswor',
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
            // style={{
            //   marginTop: SamagraScaller({
            //     value: 15,
            //     scaleBy: 'average',
            //   }),
            // }}
            label="Time in hour"
            sliderOption={{
              max: 4,
              min: 1,
              maximumTrackTintColor: 'gray',
              minimumTrackTintColor: colors.primary,
            }}></UnitSlider>
        ) : null}

        <AppButton
          onPress={() => {
            navigation.navigate('ApplicationOverlay', {
              screen: 'ServiceListScreen',
            });
          }}>
          Search
        </AppButton>
        {/* {pressedElement !== 'global' ? (
        ) : null} */}
      </View>
    );
  };

  return (
    <>
      <AppBottomSheet
        customStyle={{
          zIndex: 100,
        }}
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
