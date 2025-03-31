import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export const OnBoardingLayout = ({
  children,
  header,
}: {
  children: React.ReactNode;
  header?: string;
}) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollArea}>
      <View style={styles.wrapper}>
        {header && <Text style={styles.header}>{header}</Text>}
        {children}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
  },
  header: {
    fontSize: heightPercentageToDP(4),
    fontWeight: 700,
    marginBottom: heightPercentageToDP(4),
    paddingTop: heightPercentageToDP(4),
    color: '#1D1D1D',
  },
  wrapper: {
    flex: 1,
    paddingTop: heightPercentageToDP(1.6),
    paddingLeft: heightPercentageToDP(2),
    paddingRight: heightPercentageToDP(2),
    backgroundColor: '#FDFDFD',
  },
});
