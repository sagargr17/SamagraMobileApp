import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {SectionHeader} from '../Molecules/Global/SectionHeader';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {AppText} from '../Elements/AppText';
import {Spacer} from '../Elements/Spacer';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {AreaMapper} from '../../Utilities/CustomMethods';
interface SingleRecomendationProps {}

export const SingleRecomendation: React.FC<SingleRecomendationProps> = ({}) => {
  const {colors} = useTheme();
  const {HouseKeeping} = Logos;

  return (
    <>
      <SectionHeader
        style={{
          fontSize: 20,
          lineHeight: 25,
        }}
        title="Recomendation for You"
        isIcon={false}
        onPress={() => {}}></SectionHeader>
      <Spacer height={20}></Spacer>
      <RowFlexLayout>
        <View>
          <AppText
            title="Deep Cleaning"
            fontSizeVariant="title"
            fontVariant="medium"></AppText>
          <AppText
            title="Last booked:2 weeks ago"
            fontSizeVariant="caption"></AppText>
        </View>
        <View>
          <HouseKeeping
            height={AreaMapper({value: 70, scaleBy: 'height'})}
            width={AreaMapper({value: 70, scaleBy: 'width'})}></HouseKeeping>
        </View>
      </RowFlexLayout>
    </>
  );
};
