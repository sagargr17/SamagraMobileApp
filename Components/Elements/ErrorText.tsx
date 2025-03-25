import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

interface ErrorTextProps {
  children: React.ReactNode;
}
export const ErrorText = ({children}: ErrorTextProps) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: 'red',
    marginTop: 6,
  },
});
