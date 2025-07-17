import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { AreaMapper } from '../../Utilities/CustomMethods';

export const ScrollableLayout = ({
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
    fontSize: AreaMapper({value: 4, scaleBy: 'height'}),
    fontWeight: 700,
    marginBottom: AreaMapper({value: 4, scaleBy: 'height'}),
    paddingTop: AreaMapper({value: 4, scaleBy: 'height'}),
  },
  wrapper: {
    flex: 1,
    paddingLeft: AreaMapper({value: 2, scaleBy: 'width'}),
    paddingRight: AreaMapper({value: 2, scaleBy: 'width'}),
  },
});
