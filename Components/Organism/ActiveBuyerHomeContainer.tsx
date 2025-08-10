import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {size} from '../../Prefrences/Prefrences';
import {useAppSelector} from '../../StateManagement/hooks';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {AppText} from '../Elements/AppText';
import {Spacer} from '../Elements/Spacer';
import AppBanner from '../Molecules/Global/AppBanner';
import {AppSerchBar} from '../Molecules/Global/AppSerchBar';
import {AppHeader} from './AppHeader';
import {PopularSevices} from './PopularServices';
import {Bookings} from './Bookings';
import {SingleRecomendation} from './SinglRecommendation';
import {OfferDiscount} from './OfferDiscount';
import {CategoryScreen} from '../../Screens/Application/Home/CategoryScreen';
import {Reviews} from './Review';

interface ActiveBuyerHomeScreenProps {}

export const ActiveBuyerHomeScreen: React.FC<
  ActiveBuyerHomeScreenProps
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
          marginHorizontal: size.spacing.m,
        }}>
        <AppHeader currentPosition="static"></AppHeader>
        <Spacer height={30}></Spacer>
        <Divider></Divider>
        <Spacer height={17}></Spacer>
        <AppText
          title={`Hi, ${user.username}`}
          fontSizeVariant="display"
          fontVariant="heavy"
          customStyle={{
            fontSize: AreaMapper({value: 30}),
            lineHeight: AreaMapper({value: 35}),
          }}></AppText>
        <Spacer height={20}></Spacer>
        <Spacer height={10}></Spacer>
        <AppSerchBar onPress={handleNavigation}></AppSerchBar>
        <Spacer height={18}></Spacer>
        <PopularSevices></PopularSevices>
        <Spacer height={15}></Spacer>
      </View>
    );
  }, []);

  const body = useMemo(() => {
    return (
      <View
        style={{
          marginHorizontal: size.spacing.m,
        }}>
        <SingleRecomendation></SingleRecomendation>
        <Spacer height={20}></Spacer>
        <Spacer height={20}></Spacer>
        <OfferDiscount></OfferDiscount>
        <Bookings></Bookings>
        <Spacer height={20}></Spacer>
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
