import {useNavigation, useTheme} from '@react-navigation/native';
import {ScrollView} from 'moti';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {Spacer} from '../../../Components/Elements/Spacer';
import {AppHeader} from '../../../Components/Layout/AppHeader';
import {ItemCardVerticleSlider} from '../../../Components/Layout/ItemCardVerticleSlider';
import {ItemCategoryCardSlider} from '../../../Components/Layout/ItemCategorySlider';
import AppBanner from '../../../Components/Sections/AppBanner';
import {AppSerchBar} from '../../../Components/Sections/AppSerchBar';

interface HomeLandingScreenProps {}

export const HomeLandingScreen: React.FC<HomeLandingScreenProps> = ({}) => {
  const {fonts} = useTheme();
  const navigation: any = useNavigation();
  const {colors} = useTheme();

  const renderHeader = (
    <>
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
    </>
  );

  return (
    <View>
      <ItemCardVerticleSlider
        titleHeader="Popular"
        titleHeaderStyle={{
          marginHorizontal: 25,
        }}
        ListHeaderComponent={renderHeader}></ItemCardVerticleSlider>
      <Spacer></Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
