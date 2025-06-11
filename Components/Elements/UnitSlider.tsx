import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue} from 'react-native-reanimated';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {TextComponet} from './TextComponet';
import {size} from '../../Prefrences/Prefrences';
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
    <View style={styles.wrapper}>
      <TextComponet
        fontSizeVariant="regular"
        title={label}
        fontVariant="regular"
        customStyle={styles.wrapper}></TextComponet>
      <Slider
        containerStyle={styles.sliderStyle}
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

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 0,
    marginVertical:size.spacing.xs
  },

  titleStyle: {
    // marginBottom: AreaMapper({
    //   value: 8,
    //   scaleBy: 'height',
    // }),
  },

  sliderStyle: {
    height: 2,
  },
});
