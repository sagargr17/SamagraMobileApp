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
          backgroundColor: "gray",
          borderColor:colors.border,
          marginVertical:SamagraScaller({
            value:2,
            scaleBy:"average"
          }),
          padding:SamagraScaller({
            value:8,
            scaleBy:"average"
          })
        }}>
        <TextComponet
          title={commentor}
          fontVariant="medium" fontSize={18} lineHeight={18}></TextComponet>
        <TextComponet
        fontSize={14}
          title={commentDescription}
          fontVariant="medium" lineHeight={18}></TextComponet>
      </View>
    </>
  );
};
