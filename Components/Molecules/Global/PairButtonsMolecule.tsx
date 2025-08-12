import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import AppButtonElement from '../../Elements/ButtonElement';

interface PairButtonsProps {
  onAcceptPress: () => void;
  onDeclinPress: () => void;
  onAccepTitle?: string;
  onDeclineTitle?: string;
}

export const PairButtonsMolecule: React.FC<PairButtonsProps> = ({
  onAcceptPress,
  onDeclinPress,
  onAccepTitle = 'Accept',
  onDeclineTitle = 'Decline',
}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.actionContainer}>
      <AppButtonElement
        mode="outlined"
        onPress={() => {
          onDeclinPress();
        }}
        style={[styles.action]}>
        Decline
      </AppButtonElement>
      <AppButtonElement
        onPress={() => {
          onAcceptPress();
        }}
        style={[styles.action]}>
        Accept
      </AppButtonElement>
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
