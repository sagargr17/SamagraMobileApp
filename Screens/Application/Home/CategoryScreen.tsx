import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {ItemCategoryCardSlider} from '../../../Components/Organism/ItemCategorySlider';
import {SamagraLoader} from '../../../Components/Elements/SamagraLoader';
import {FlatList, Text, View} from 'react-native';
import {BubbleCard} from '../../../Components/Molecules/Cards/BubbleCard';
import {size} from '../../../Prefrences/Prefrences';
import {AppText} from '../../../Components/Elements/AppText';
import {Spacer} from '../../../Components/Elements/Spacer';
interface CategoryScreenProps {}

export const CategoryScreen: React.FC<CategoryScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();

  const categories = [
    {
      name: 'Plumbing',
    },
    {
      name: 'Tutoring',
    },
    {
      name: 'Cleaning',
    },
    {
      name: 'Painting',
    },
    {
      name: 'Gardening',
    },
    {
      name: 'IT Support',
    },
    {
      name: 'Auto Repair',
    },
    {
      name: 'Music Lesson',
    },
    {
      name: 'Photography',
    },
  ];

  return (
    <View
      style={{
        marginHorizontal: size.spacing.xs,
        marginTop: size.spacing.xs,
        borderRadius: 10,
      }}>
      <Spacer height={15}></Spacer>
      <AppText
        title="Please Select Your Category"
        fontSizeVariant="display"
        fontVariant="regular"></AppText>
      <Spacer height={15}></Spacer>
      <FlatList
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({item, index}) => (
          <View
            style={{
              marginRight: size.spacing.s,
            }}>
            <BubbleCard
              onPress={() => {
                navigation.navigate('ApplicationOverlay', {
                  // screen: 'ItemAddedScreen',
                  screen: 'AddItemScreen',
                });
              }}
              customStyle={
                {
                  // elevation: 1,
                  // shadowColor: 'orange',
                  // shadowRadius: 100,
                  // shadowOffset: {width: 0, height: 1},
                }
              }
              key={index}
              variant="small"
              title={item.name}></BubbleCard>
          </View>
        )}></FlatList>
    </View>
  );
};
