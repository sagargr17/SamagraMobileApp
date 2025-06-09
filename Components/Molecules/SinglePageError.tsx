import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {TextComponet} from '../Elements/TextComponet';
import AppButton from '../Elements/Button';
import {AreaMapper} from '../../Utilities/CustomMethods';
interface SingnlePageErrorProps {
  detail: {
    icon: any;
    title: string;
    onButtonPress: () => void;
    buttonTitle: string;
  };
}

export const SingnlePageError: React.FC<SingnlePageErrorProps> = ({detail}) => {
  const {colors} = useTheme();

  return (
    <>
      <View style={[style.parentContainer]}>
        <View
          style={{
            alignItems: 'center',
          }}>
          {detail.icon}
          <TextComponet
            customStyle={{
              alignContent: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              marginHorizontal: 43,
            }}
            title={detail.title}
            fontVariant="medium"
            fontSizeVariant={'regular'}></TextComponet>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: AreaMapper({
              value: 21,
              scaleBy: 'height',
            }),
          }}>
          <AppButton
            rippleColor={'#f2fcf8'}
            onPress={detail.onButtonPress}
            style={style.buttonStyle}>
            {detail.buttonTitle}
          </AppButton>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
