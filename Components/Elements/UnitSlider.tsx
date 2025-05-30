import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, ViewStyle} from 'react-native';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue} from 'react-native-reanimated';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {TextComponet} from './TextComponet';
interface UnitSliderProps {
  sliderOption: {
    max: number;
    min: number;
    minimumTrackTintColor: string;
    maximumTrackTintColor: string;
  };
  style?: ViewStyle;
  label: string;
}

export const UnitSlider: React.FC<UnitSliderProps> = ({
  style,
  sliderOption,
  label,
}) => {
  const {colors} = useTheme();
  const [value, setValue] = useState<number>(1);
  const progress = useSharedValue(30);
  const min = useSharedValue(sliderOption.min);
  const max = useSharedValue(10);

  return (
    <View
      style={{
        marginBottom: SamagraScaller({
          value: 12,
          scaleBy: 'height',
        }),
      }}>
      <TextComponet
        title={label}
        fontVariant="regular"
        customStyle={{
          marginBottom: SamagraScaller({
            value: 8,
            scaleBy: 'height',
          }),
        }}></TextComponet>
      <Slider
        containerStyle={{
          height: 2,
        }}
        theme={{
          disableMinTrackTintColor: '#fff',
          maximumTrackTintColor: 'gray',
          minimumTrackTintColor: colors.primary,
          cacheTrackTintColor: '#333',
          bubbleBackgroundColor: '#666',
          heartbeatColor: '#999',
        }}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        bubble={(value: any) => {
          return `${Math.round(value * 100) / 100}`;
        }}
      />
    </View>
  );
};
