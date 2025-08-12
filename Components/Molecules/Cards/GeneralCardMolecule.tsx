import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {AppTextElement} from '../../Elements/AppTextElement';
import {size} from '../../../Prefrences/Prefrences';
import {Surface} from 'react-native-paper';
import {SpacerElement} from '../../Elements/SpacerElement';
import FastImage from '@d11/react-native-fast-image';

interface GeneralCardMoleculeProps {
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

export const GeneralCardMolecule: React.FC<GeneralCardMoleculeProps> = ({
  title,
  imageSize,
  frame,
  onPress,
  containerStyle,
  comment,
}) => {
  const {colors} = useTheme();
  const navigation: any = useNavigation();

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
      <SpacerElement height={16}></SpacerElement>
      <View
        style={{
          marginHorizontal: size.spacing.m - 1,
        }}>
        <AppTextElement
          title={title}
          fontSizeVariant="title"
          fontVariant="medium"></AppTextElement>
        {comment ? (
          <AppTextElement
            title={comment}
            fontSizeVariant="regular"></AppTextElement>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
