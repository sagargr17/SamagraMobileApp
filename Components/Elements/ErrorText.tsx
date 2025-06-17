import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {AppText} from './AppText';
import {size} from '../../Prefrences/Prefrences';

interface ErrorTextProps {
  children: React.ReactNode;
}
export const ErrorText = ({children}: ErrorTextProps) => {
  const {fonts} = useTheme();

  return (
    <Text
      style={[
        styles.text,
        {
          fontFamily: fonts.regular.fontFamily,
          marginLeft:size.spacing.xxs
        },
      ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: size.textVariants.caption.fontSize,
    color: 'red',
  },
});
