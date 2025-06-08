import {useTheme} from '@react-navigation/native';
import React from 'react';
import {FlatList, FlatListProps} from 'react-native';
import {size} from '../../Prefrences/Prefrences';
import {SectionHeader} from '../../Components/Molecules/Global/SectionHeader';

interface HorizontalSliderLayoutProps<ItemT> extends FlatListProps<ItemT> {
  headerTitle: string;
  onHeaderPress: () => void;
  data: ArrayLike<any> | null | undefined;
}

export const HorizontalSliderLayout = <ItemT,>({
  headerTitle,
  onHeaderPress,
  data,
  ...rest
}: HorizontalSliderLayoutProps<ItemT>) => {
  const {colors} = useTheme();

  return (
    <>
      <SectionHeader
        onPress={onHeaderPress}
        isIcon={true}
        title={headerTitle}></SectionHeader>
      <FlatList
        contentContainerStyle={{
          paddingVertical: size.spacing.m,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        {...rest}></FlatList>
    </>
  );
};
