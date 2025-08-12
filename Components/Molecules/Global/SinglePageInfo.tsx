import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {AppTextElement} from '../../Elements/AppTextElement';
import AppButtonElement from '../../Elements/ButtonElement';
import {SpacerElement} from '../../Elements/SpacerElement';

export interface SingnlePageInfoProps {
  icon: any;
  detail: {
    title: string;
    message?: string;
    onButtonPress: () => void;
    buttonTitle: string;
  };
}

export const SingnlePageInfoMolecule: React.FC<SingnlePageInfoProps> = ({
  detail,
  icon,
}) => {
  const {colors} = useTheme();

  return (
    <View style={[style.parentContainer]}>
      {icon}
      <SpacerElement height={20}></SpacerElement>
      <View>
        <AppTextElement
          customStyle={{
            textAlign: 'center',
          }}
          title={detail.title}
          fontVariant="bold"
          fontSizeVariant={'title'}></AppTextElement>
        {detail.message ? (
          <AppTextElement
            customStyle={{
              textAlign: 'center',
              width: AreaMapper({
                value: 400,
              }),
            }}
            title={detail.message}
            fontVariant="medium"
            fontSizeVariant={'regular'}></AppTextElement>
        ) : null}
      </View>
      <SpacerElement height={20}></SpacerElement>
      <AppButtonElement
        rippleColor={'#f2fcf8'}
        onPress={detail.onButtonPress}
        style={style.buttonStyle}>
        {detail.buttonTitle}
      </AppButtonElement>
    </View>
  );
};

const style = StyleSheet.create({
  parentContainer: {
    flex: 1, // Add this to make the container take up all available space
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    flexDirection: 'column',
  },

  buttonStyle: {
    width: AreaMapper({
      value: 220,
      scaleBy: 'width',
    }),
  },

  descriptionTitle: {
    alignItems: 'center',
    textAlign: 'justify',

    marginHorizontal: AreaMapper({
      value: 43,
      scaleBy: 'width',
    }),
  },
});
