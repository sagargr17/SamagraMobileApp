import {useNavigation, useTheme} from '@react-navigation/native';
import {ScrollView} from 'moti';
import React from 'react';
import {Divider} from 'react-native-paper';
import {Spacer} from '../../../Components/Elements/Spacer';
import {AppHeader} from '../../../Components/Layout/AppHeader';
import {ItemCategoryCardSlider} from '../../../Components/Layout/ItemCategorySlider';
import {ItemCardVerticleSlider} from '../../../Components/Layout/ItemCardVerticleSlider';
import SamagraBanner from '../../../Components/Sections/SamagraBanner';
import {SamagraSerchBar} from '../../../Components/Sections/SamagraSerchBar';
import {HomeStackNavigationProp} from '../../../Navigators/Stack/HomeStackNavigator';

interface HomeLandingScreenProps {}

export const HomeLandingScreen: React.FC<HomeLandingScreenProps> = ({}) => {
  const {fonts} = useTheme();
  const navigation: any = useNavigation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
      }}>
      <AppHeader currentPosition="relative"></AppHeader>

      <Spacer height={30}></Spacer>
      <Divider></Divider>
      <Spacer height={15}></Spacer>

      <SamagraSerchBar
        onPress={() =>
          navigation.navigate('ItemDetailScreen', {
            name: 'Titan Watch',
          })
        }></SamagraSerchBar>
      <SamagraBanner></SamagraBanner>

      <Spacer></Spacer>

      <ItemCategoryCardSlider size="large"></ItemCategoryCardSlider>
      <Spacer></Spacer>
      <Divider></Divider>
      <ItemCardVerticleSlider></ItemCardVerticleSlider>
      <Spacer></Spacer>
    </ScrollView>
  );
};
