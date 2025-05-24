import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {ViewStyle} from 'react-native';
import {TextComponet} from './TextComponet';
import {useSharedValue} from 'react-native-reanimated';
import {Slider} from 'react-native-awesome-slider';
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
  const max = useSharedValue(sliderOption.max);
  return (
    <>
      <TextComponet
        title={label + progress.value}
        fontVariant="regular"></TextComponet>
      <Slider progress={progress} minimumValue={min} maximumValue={max} />
    </>
  );
};
