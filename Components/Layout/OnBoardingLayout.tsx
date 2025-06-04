import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export const OnBoardingLayout = ({
  children,
  header,
}: {
  children: React.ReactNode;
  header?: string;
}) => {
  const {colors} = useTheme();
  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollArea}
        automaticallyAdjustKeyboardInsets={true}>
        <View style={styles.wrapper}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  scrollArea: {
    flex: 1,
  },
  header: {
    fontSize: heightPercentageToDP(4),
    fontWeight: 700,
    marginBottom: heightPercentageToDP(4),
    paddingTop: heightPercentageToDP(4),
  },
  wrapper: {
    flex: 1,
    paddingLeft: heightPercentageToDP(2),
    paddingRight: heightPercentageToDP(2),
  },
});
