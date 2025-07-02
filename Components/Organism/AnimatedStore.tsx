import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {size} from '../../Prefrences/Prefrences';
import {AppText} from '../Elements/AppText';
import {
  ShopBestWishesMessage,
  ShopCreatedSuccessfullMessage,
} from '../../Constants/UI/Messages';
import {ColumnFlexScreenlayout} from '../../Layout/ScreenLayout/ColumnFlexScreenLayout';
import AppButton from '../Elements/Button';
import {useAppDispatch} from '../../StateManagement/hooks';
import {hideLoader} from '../../StateManagement/Error&loadingHandle/LoaderStateSlice';
interface AnimatedStoreProps {}

export const AimatedStore: React.FC<AnimatedStoreProps> = ({}) => {
  const {colors} = useTheme();
  const {Store} = Logos;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  useEffect(() => {
    dispatch(hideLoader());
  }, []);

  // handleVisitShopH
  const handleVisitShopHandle = () => {
    navigation.navigate('BottomTab', {
      screen: 'More',
    });
  };

  return (
    <ColumnFlexScreenlayout>
      <View
        style={{
          alignItems: 'center',
          justifyContent:"center",
          alignContent:"center",
          flex:1
        }}>
        <Store height={200} width={200}></Store>
        <AppText
          title={ShopCreatedSuccessfullMessage}
          fontSizeVariant="title"
          fontVariant="bold"
          customStyle={{
            marginTop: size.spacing.xl,
            fontSize: 19,
            // marginBottom: size.spacing.s,
          }}
        />
        <AppText
          title={ShopBestWishesMessage}
          fontVariant="regular"
          customStyle={{
            alignItems: 'center',
            textAlign: 'justify',
            marginTop: size.spacing.s,
            // marginHorizontal: size.spacing.m,
          }}
          fontSizeVariant="title"
        />
        <AppButton
          onPress={handleVisitShopHandle}
          style={[
            {
              marginTop: size.spacing.xxl,
              width: 200,
            },
            size.elevation.m,
          ]}>
          Visit Shop
        </AppButton>
      </View>
    </ColumnFlexScreenlayout>
  );
};
