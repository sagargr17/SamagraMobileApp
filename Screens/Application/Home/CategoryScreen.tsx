import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {CardSliderMoleCule} from '../../../Components/Molecules/Cards/CardSliderMolecule';
import {SamagraLoaderElement} from '../../../Components/Elements/SamagraLoaderElement';
import {FlatList, Text, View} from 'react-native';
import {BubbleCardMolecule} from '../../../Components/Molecules/Cards/BubbleCardMoleCule';
import {size} from '../../../Prefrences/Prefrences';
import {AppTextElement} from '../../../Components/Elements/AppTextElement';
import {SpacerElement} from '../../../Components/Elements/SpacerElement';
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
      <SpacerElement height={15}></SpacerElement>
      {/* <AppText
        customStyle={{
          textAlign: 'center',
        }}
        title="Please Select Your Category"
        fontSizeVariant="title"
        fontVariant="regular"></AppText> */}
      <SpacerElement height={15}></SpacerElement>
      <FlatList
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({item, index}) => (
          <View
            style={{
              marginRight: size.spacing.s,
            }}>
            <BubbleCardMolecule
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
              title={item.name}></BubbleCardMolecule>
          </View>
        )}></FlatList>
    </View>
  );
};
