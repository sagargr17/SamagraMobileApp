import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {AppText} from '../../Elements/AppText';
import {size} from '../../../Prefrences/Prefrences';
import {Surface} from 'react-native-paper';
import {Spacer} from '../../Elements/Spacer';
import FastImage from '@d11/react-native-fast-image';

interface GeneralCardProps {
  title: string;
  imageSize?: {
    height: number;
    width: number;
  };
  frame: string | React.ReactNode;
  onPress: any;
  containerStyle?: ViewStyle;
  comment?: string;
}

export const GeneralCard: React.FC<GeneralCardProps> = ({
  title,
  imageSize,
  frame,
  onPress,
  // selectedCategory,
  containerStyle,
  comment,
}) => {
  const {colors} = useTheme();
  // const fontVariantSize = variant === 'large' ? 'regular' : 'caption';
  // const height = variant === 'large' ? 95 : 85;
  // const width = variant === 'large' ? 95 : 85;
  const navigation: any = useNavigation();
  // Navigation press
  return (
    <TouchableOpacity style={[containerStyle]}>
      {typeof frame === 'string' ? (
        <FastImage
          style={{
            height: AreaMapper({
              value: imageSize?.height ?? 300,
              scaleBy: 'height',
            }),
            width: AreaMapper({
              value: imageSize?.width ?? 300,
              scaleBy: 'height',
            }),
            borderRadius: size.borderRadius.m,
          }}
          source={{
            uri: frame,
          }}></FastImage>
      ) : (
        <>{frame}</>
      )}
      <Spacer height={16}></Spacer>
      <View
        style={{
          marginHorizontal: size.spacing.m-1,
        }}>
        <AppText
          title={title}
          fontSizeVariant="title"
          fontVariant="medium"></AppText>
        {comment ? (
          <AppText title={comment} fontSizeVariant="regular"></AppText>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  viewContainer: {},
});
