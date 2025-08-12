import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {size} from '../../../../Prefrences/Prefrences';
import {useAppSelector} from '../../../../StateManagement/hooks';
import {AreaMapper} from '../../../../Utilities/CustomMethods';
import {AppTextElement} from '../../../Elements/AppTextElement';
import {SpacerElement} from '../../../Elements/SpacerElement';
import {SerchBarMolecule} from '../../../Molecules/Global/AppSerchBarMolecule';
import {AppHeaderOrganism} from '../AppHeaderOrganism';
import {BookingsOrganism} from './BookingsOrganism';
import {OfferDiscount} from './OfferDiscountOrganism';
import {PopularSevices} from './PopularServicesOrganism';
import {Reviews} from './ReviewOrganism';
import {RecommendationOrganism} from './RecommendationOrganism';

interface BuyerHomeLandingScreenProps {}

export const BuyerHomeLandingScreen: React.FC<
  BuyerHomeLandingScreenProps
> = ({}) => {
  const navigation: any = useNavigation();
  const user = useAppSelector(state => state.user.Profile);
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);

  const handleNavigation = useCallback(() => {
    navigation.navigate('ApplicationOverlay', {
      screen: 'SearchItemScreen',
      params: {
        itemType: 'public',
      },
    });
  }, []);

  const headerComponent = useMemo(() => {
    return (
      <View
        style={{
          // marginHorizontal: size.spacing.m,
        }}>
        <AppHeaderOrganism currentPosition="static" />
        <SpacerElement height={30}></SpacerElement>
        <Divider></Divider>
        <SpacerElement height={17}></SpacerElement>
        <AppTextElement
          title={`Hi, ${user.username}`}
          fontSizeVariant="display"
          fontVariant="heavy"
          customStyle={{
            fontSize: AreaMapper({value: 30}),
            lineHeight: AreaMapper({value: 35}),
          }}></AppTextElement>
        <SpacerElement height={20}></SpacerElement>
        <SpacerElement height={10}></SpacerElement>
        <SerchBarMolecule onPress={handleNavigation}></SerchBarMolecule>
        <SpacerElement height={18}></SpacerElement>
        <PopularSevices></PopularSevices>
        <SpacerElement height={15}></SpacerElement>
      </View>
    );
  }, []);

  const body = useMemo(() => {
    return (
      <View
        style={{
          marginHorizontal: size.spacing.m,
        }}>
        <RecommendationOrganism />
        <SpacerElement height={20}></SpacerElement>
        <SpacerElement height={20}></SpacerElement>
        <OfferDiscount></OfferDiscount>
        <BookingsOrganism></BookingsOrganism>
        <SpacerElement height={20}></SpacerElement>
        <Reviews></Reviews>
      </View>
    );
  }, []);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {headerComponent}
        {body}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  footerLoader: {
    paddingVertical: size.spacing.xs,
  },
});
