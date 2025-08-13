import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {SectionHeaderMolecule} from '../../../Molecules/Global/SectionHeaderMolecule';
import {RowFlexLayout} from '../../../../Layout/PartationLayout/RowFlexLayout';
import {AppTextElement} from '../../../Elements/AppTextElement';
import {SpacerElement} from '../../../Elements/SpacerElement';
import {Logos} from '../../../../Assets/SVG/Exports/Exports';
import {AreaMapper} from '../../../../Utilities/CustomMethods';
import {shouldCanonizeResults} from '@apollo/client/cache/inmemory/helpers';
import {size} from '../../../../Prefrences/Prefrences';

interface RecomendationOrganismProps {}

export const RecommendationOrganism: React.FC<
  RecomendationOrganismProps
> = ({}) => {
  const {colors} = useTheme();
  const {HouseKeeping} = Logos;

  return (
    <>
      <SpacerElement height={20}></SpacerElement>
      <SectionHeaderMolecule
        title="Recomendation for You"
        isIcon={false}
        onPress={() => {}}></SectionHeaderMolecule>
      <SpacerElement height={12}></SpacerElement>
      <RowFlexLayout
        customStyle={[
          {
            alignItems: 'flex-start',
          },
        ]}>
        <View>
          <SpacerElement></SpacerElement>
          <AppTextElement
            title="Deep Cleaning"
            fontSizeVariant="title"
            fontVariant="heavy"></AppTextElement>
          <AppTextElement
            title="Last booked:2 weeks ago"
            fontSizeVariant="caption"
            customStyle={{
              color: '#61758A',
            }}></AppTextElement>
          <SpacerElement height={16}></SpacerElement>
          <AppTextElement
            title="Rebook"
            fontSizeVariant="title"
            customStyle={{
              backgroundColor: '#F0F2F5',
              padding: size.spacing.s,
              borderRadius: size.spacing.m,
              textAlign: 'center',
            }}></AppTextElement>
        </View>
        <View>
          <HouseKeeping
            height={AreaMapper({value: 93, scaleBy: 'height'})}
            width={AreaMapper({value: 100})}></HouseKeeping>
        </View>
      </RowFlexLayout>
    </>
  );
};
