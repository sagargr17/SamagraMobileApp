import {useRoute, useTheme} from '@react-navigation/native';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import {AimatedStore} from '../../Components/Organism/AnimatedStore';
import {ColumnFlexScreenlayout} from '../../Layout/ScreenLayout/ColumnFlexScreenLayout';
import AppButton from '../../Components/Elements/Button';

interface ShopCreatedScreenProps {}

export const ShopCreatedScreen: React.FC<ShopCreatedScreenProps> = ({}) => {
  const {colors} = useTheme();
  const screenWidth = Dimensions.get('window').width; // Get screen width
  const route = useRoute();
  console.log('Route', route.params);

  return (
    <ColumnFlexScreenlayout>
      <View style={styles.confettiStyle}>
        <ConfettiCannon
          count={150}
          origin={{x: screenWidth / 2, y: 0}}
          explosionSpeed={0}
          fallSpeed={2500}
          fadeOut={true}
          autoStart={true}
        />
      </View>
      <AimatedStore></AimatedStore>
    </ColumnFlexScreenlayout>
  );
};

const styles = StyleSheet.create({
  confettiStyle: {
    position: 'absolute',
    top: -200,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
});
