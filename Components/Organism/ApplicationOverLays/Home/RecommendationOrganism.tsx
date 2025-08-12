import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {SectionHeaderMolecule} from '../../../Molecules/Global/SectionHeaderMolecule';
import {RowFlexLayout} from '../../../../Layout/PartationLayout/RowFlexLayout';
import {AppTextElement} from '../../../Elements/AppTextElement';
import {SpacerElement} from '../../../Elements/SpacerElement';
import {Logos} from '../../../../Assets/SVG/Exports/Exports';
import {AreaMapper} from '../../../../Utilities/CustomMethods';



interface RecomendationOrganismProps {}

export const RecommendationOrganism: React.FC<RecomendationOrganismProps> = ({}) => {
  const {colors} = useTheme();
  const {HouseKeeping} = Logos;

  return (
    <>
      <SectionHeaderMolecule
        style={{
          fontSize: 20,
          lineHeight: 25,
        }}
        title="Recomendation for You"
        isIcon={false}
        onPress={() => {}}></SectionHeaderMolecule>
      <SpacerElement height={20}></SpacerElement>
      <RowFlexLayout>
        <View>
          <AppTextElement
            title="Deep Cleaning"
            fontSizeVariant="title"
            fontVariant="medium"></AppTextElement>
          <AppTextElement
            title="Last booked:2 weeks ago"
            fontSizeVariant="caption"></AppTextElement>
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
