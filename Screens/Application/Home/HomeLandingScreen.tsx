import { useNavigation, useTheme } from '@react-navigation/native';
import { ScrollView } from 'moti';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import { Spacer } from '../../../Components/Elements/Spacer';
import { AppHeader } from '../../../Components/Layout/AppHeader';
import { ItemCardVerticleSlider } from '../../../Components/Layout/ItemCardVerticleSlider';
import { ItemCategoryCardSlider } from '../../../Components/Layout/ItemCategorySlider';
import AppBanner from '../../../Components/Sections/AppBanner';
import { AppSerchBar } from '../../../Components/Sections/AppSerchBar';

interface HomeLandingScreenProps {}

export const HomeLandingScreen: React.FC<HomeLandingScreenProps> = ({}) => {
  const {fonts} = useTheme();
  const navigation: any = useNavigation();
  const {colors} = useTheme();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
      <AppHeader currentPosition="relative"></AppHeader>

      <Spacer height={10}></Spacer>
      <Divider></Divider>
      <Spacer height={15}></Spacer>

      <AppSerchBar
        onPress={() =>
          navigation.navigate('ItemDetailScreen', {
            name: 'Titan Watch',
          })
        }></AppSerchBar>
      <AppBanner></AppBanner>

      <Spacer></Spacer>

      <ItemCategoryCardSlider size="large"></ItemCategoryCardSlider>
      <Spacer></Spacer>
      <Divider></Divider>
      <ItemCardVerticleSlider></ItemCardVerticleSlider>
      <Spacer></Spacer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
