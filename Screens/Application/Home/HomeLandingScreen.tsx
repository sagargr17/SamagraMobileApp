import React, {useState} from 'react';
import {AppHeader} from '../../../Components/Layout/AppHeader';
import {ServiceCategoryCardSlider} from '../../../Components/Layout/ServiceCategorySlider';
import {Spacer} from '../../../Components/Elements/Spacer';
import {Divider, Searchbar} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import {SamagraScaller} from '../../../Utilities/CustomMethods';

interface HomeLandingScreenProps {}

export const HomeLandingScreen: React.FC<HomeLandingScreenProps> = ({}) => {
  const {fonts} = useTheme();
  const [searchedItem, setSearchedItem] = useState<string>('');

  return (
    <>
      <AppHeader currentPosition="relative"></AppHeader>
      <Spacer height={30}></Spacer>
      <Divider></Divider>
      <Spacer height={15}></Spacer>
      <Spacer></Spacer>
      <Searchbar
        style={{
          backgroundColor: '#EFF1F3',
          fontFamily: fonts.regular.fontFamily,
          marginHorizontal: SamagraScaller({
            scaleBy: 'average',
            value: 16,
          }),
          fontSize: SamagraScaller({
            value: 12,
            scaleBy: 'average',
          }),
        }}
        placeholderTextColor={'#C0C0C0'}
        placeholder="Search Anything..."
        onChangeText={strokes => {
          setSearchedItem(strokes);
        }}
        value={searchedItem}
      />
      <Spacer></Spacer>
      <ServiceCategoryCardSlider></ServiceCategoryCardSlider>
    </>
  );
};
