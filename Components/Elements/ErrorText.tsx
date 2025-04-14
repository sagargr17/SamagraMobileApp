import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {SamagraScaller} from '../../Utilities/CustomMethods';

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
        },
      ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: SamagraScaller({
      value: 15,
      scaleBy: 'average',
    }),
    color: 'red',
  },
});
