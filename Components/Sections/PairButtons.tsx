import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import AppButton from '../Elements/Button';

interface PairButtonsProps {
  onAcceptPress: () => void;
  onDeclinPress: () => void;
  onAccepTitle?:string,
  onDeclineTitle?:string

}

export const PairButtons: React.FC<PairButtonsProps> = ({
  onAcceptPress,
  onDeclinPress,
  onAccepTitle="Accept",
  onDeclineTitle="Decline"
}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.actionContainer}>
      <AppButton
        mode="outlined"
        onPress={() => {
          onDeclinPress();
        }}
        style={[styles.action]}>
        Decline
      </AppButton>
      <AppButton
        onPress={() => {
          onDeclinPress();
        }}
        style={[styles.action]}>
        Accept
      </AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
  },
  action: {
    flex: 0.4,
  },
});
