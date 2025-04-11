import React, {useState} from 'react';
import {AppHeader} from '../../../Components/Layout/AppHeader';
import {ItemCategoryCardSlider} from '../../../Components/Layout/ItemCategorySlider';
import {Spacer} from '../../../Components/Elements/Spacer';
import {Divider, Searchbar} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import SamagraBanner from '../../../Components/Sections/SamagraBanner';
import {SamagraScaller} from '../../../Utilities/CustomMethods';
import {ScrollView} from 'moti';
import {View} from 'react-native';
import {ItemCard} from '../../../Components/Sections/ItemCard';
import {ItemVerticleListView} from '../../../Components/Layout/ItemVerticleListView';

interface HomeLandingScreenProps {}

export const HomeLandingScreen: React.FC<HomeLandingScreenProps> = ({}) => {
  const {fonts} = useTheme();
  const [searchedItem, setSearchedItem] = useState<string>('');

  return (
    <ScrollView
      style={{
        flex: 1,
      }}>
      <AppHeader currentPosition="relative"></AppHeader>

      <Spacer height={30}></Spacer>
      <Divider></Divider>
      <Spacer height={15}></Spacer>

      <Searchbar
        style={{
          backgroundColor: '#EFF1F3',
          fontFamily: fonts.regular.fontFamily,
          marginHorizontal: SamagraScaller({
            scaleBy: 'average',
            value: 16,
          }),
          fontSize: SamagraScaller({
            value: 2,
            scaleBy: 'average',
          }),

          flex: 0.2,
          height: SamagraScaller({
            value: 54,
            scaleBy: 'height',
          }),
        }}
        inputStyle={{
          minHeight: 0,
          fontFamily: fonts.regular.fontFamily,
          fontSize: SamagraScaller({
            value: 15,
            scaleBy: 'height',
          }),
          lineHeight: 22,
        }}
        placeholderTextColor={'#C0C0C0'}
        placeholder="Search Anything..."
        onChangeText={strokes => {
          setSearchedItem(strokes);
        }}
        value={searchedItem}
      />
      <SamagraBanner></SamagraBanner>

      <Spacer></Spacer>

      <ItemCategoryCardSlider></ItemCategoryCardSlider>
      <Spacer></Spacer>
      <Divider></Divider>
      <ItemVerticleListView></ItemVerticleListView>
      <Spacer></Spacer>
    </ScrollView>
  );
};
