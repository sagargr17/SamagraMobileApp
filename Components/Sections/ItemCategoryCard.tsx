import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextComponet} from '../Elements/TextComponet';
import {useTheme} from '@react-navigation/native';
import {SamagraScaller} from '../../Utilities/CustomMethods';

interface ItemCategoryCardProps {
  title: string;
  icon: any;
}

export const ItemCategoryCard: React.FC<ItemCategoryCardProps> = ({
  title,
  icon,
}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: colors.primary,
          height: SamagraScaller({
            value: 100,
            scaleBy: 'average',
          }),

          marginRight: SamagraScaller({
            value: 13,
            scaleBy: 'average',
          }),
          // paddingHorizontal: SamagraScaller({
          //   value: 17,
          //   scaleBy: 'average',
          // }),
          paddingVertical: SamagraScaller({
            value: 23,
            scaleBy: 'average',
          }),
          borderRadius: SamagraScaller({
            value: 12,
            scaleBy: 'average',
          }),
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          width: SamagraScaller({
            value: 100,
            scaleBy: 'average',
          }),
        },
      ]}>
      {icon}
      <TextComponet
        fontVariant="medium"
        fontSize={16}
        lineHeight={30}
        customStyle={{
          color: colors.background,
        }}
        title={title}></TextComponet>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  viewContainer: {},
});
