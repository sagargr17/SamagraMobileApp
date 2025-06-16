import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {size} from '../../Prefrences/Prefrences';
import {TextComponet} from '../Elements/TextComponet';
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

  useEffect(() => {
    dispatch(hideLoader());
  }, []);

  return (
    <ColumnFlexScreenlayout>
      <Store height={200} width={200}></Store>
      <TextComponet
        title={ShopCreatedSuccessfullMessage}
        fontSizeVariant="title"
        fontVariant="bold"
        customStyle={{
          marginTop: size.spacing.xl,
          fontSize: 19,
          // marginBottom: size.spacing.s,
        }}
      />
      <TextComponet
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
        style={[
          {
            marginTop: size.spacing.xxl,
            width: 200,
          },
          size.elevation.m,
        ]}>
        Visit Shop
      </AppButton>
    </ColumnFlexScreenlayout>
  );
};
