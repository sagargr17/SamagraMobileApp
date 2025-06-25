import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {size} from '../../Prefrences/Prefrences';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {AppText} from '../Elements/AppText';
import AppButton from '../Elements/Button';
import {Icon} from 'react-native-paper';
import {Spacer} from '../Elements/Spacer';

export interface SingnlePageInfoProps {
  icon: any;
  detail: {
    title: string;
    message?: string;
    onButtonPress: () => void;
    buttonTitle: string;
  };
}

export const SingnlePageInfo: React.FC<SingnlePageInfoProps> = ({
  detail,
  icon,
}) => {
  const {colors} = useTheme();

  return (
    <View style={[style.parentContainer]}>
      {icon}
      <Spacer height={20}></Spacer>
      <View>
        <AppText
          customStyle={{
            textAlign: 'center',
          }}
          title={detail.title}
          fontVariant="bold"
          fontSizeVariant={'title'}></AppText>
        {detail.message ? (
          <AppText
            customStyle={{
              textAlign: 'center',
              width: AreaMapper({
                value: 300,
              }),
            }}
            title={detail.message}
            fontVariant="medium"
            fontSizeVariant={'regular'}></AppText>
        ) : null}
      </View>
      <Spacer height={20}></Spacer>
      <AppButton
        rippleColor={'#f2fcf8'}
        onPress={detail.onButtonPress}
        style={style.buttonStyle}>
        {detail.buttonTitle}
      </AppButton>
    </View>
  );
};

const style = StyleSheet.create({
  parentContainer: {
    flex: 1, // Add this to make the container take up all available space
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    flexDirection: 'column',
    marginTop: AreaMapper({value: 180}),
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
