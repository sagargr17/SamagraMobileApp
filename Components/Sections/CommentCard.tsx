import React from 'react';
import {View} from 'react-native';

import {TextComponet} from '../Elements/TextComponet';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import { useTheme } from '@react-navigation/native';
interface CommentCardProps {
  commentor: string;
  commentDescription: string;
}

export const CommentCard: React.FC<CommentCardProps> = ({
  commentor,
  commentDescription,
}) => {
  const {colors} = useTheme();

  return (
    <>
      <View
        style={{
          backgroundColor: colors.card,
          borderColor:colors.border,
          marginVertical:SamagraScaller({
            value:2,
            scaleBy:"average"
          }),
          padding:SamagraScaller({
            value:8,
            scaleBy:"average"
          }),
          borderRadius:SamagraScaller({
            value:8,
            scaleBy:"average"
          }),
          borderWidth:0.2
        }}>
        <TextComponet
          title={commentor}
          fontVariant="medium" fontSize={16} lineHeight={22}></TextComponet>
        <TextComponet
        fontSize={14}
          title={commentDescription}
          fontVariant="regular" lineHeight={18}></TextComponet>
      </View>
    </>
  );
};
