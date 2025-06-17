import React, {useState} from 'react';
import {View} from 'react-native';

import {AppText} from '../../Elements/AppText';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {useTheme} from '@react-navigation/native';
import {Input} from '../../Elements/Input';
import {Icon} from 'react-native-paper';
interface CommentCardProps {
  commentor: string;
  commentDescription: string;
  starter?: boolean;
}

export const CommentCard: React.FC<CommentCardProps> = ({
  commentor,
  commentDescription,
  starter = false,
}) => {
  const {colors} = useTheme();
  const [isReplyCommentVisible, setIsReplyCommentVisible] =
    useState<boolean>(false);

  return (
    <>
      <View
        style={{
          backgroundColor: colors.card,
          borderColor: isReplyCommentVisible ? colors.primary : colors.border,
          marginVertical: AreaMapper({
            value: 5,
            scaleBy: 'average',
          }),
          padding: AreaMapper({
            value: 8,
            scaleBy: 'average',
          }),
          borderRadius: AreaMapper({
            value: 8,
            scaleBy: 'average',
          }),
          borderWidth: isReplyCommentVisible ? 0.7 : 0.3,
        }}>
        <View
          onTouchEnd={() => setIsReplyCommentVisible(!isReplyCommentVisible)}>
          <AppText
            title={commentor}
            fontVariant="medium"
            fontSizeVariant={'regular'}></AppText>

          <AppText
            fontSizeVariant={'regular'}
            title={commentDescription}
            fontVariant="regular"></AppText>
        </View>
        {isReplyCommentVisible ? (
          <Input
            onBlur={() => setIsReplyCommentVisible(!isReplyCommentVisible)}
            placeholderTextColor={'gray'}
            outlineStyle={{
              borderWidth: 0.4,
            }}
            height={40}
            placeholder="Reply....."
            right={
              <Icon color={'red'} size={40} source={'feather'}></Icon>
            }></Input>
        ) : null}
      </View>
    </>
  );
};
