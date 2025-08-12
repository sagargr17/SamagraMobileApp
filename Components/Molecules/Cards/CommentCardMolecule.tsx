import React, {useState} from 'react';
import {View} from 'react-native';

import {AppTextElement} from '../../Elements/AppTextElement';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {useTheme} from '@react-navigation/native';
import {InputElement} from '../../Elements/InputElement';
import {Icon} from 'react-native-paper';
interface CommentCardProps {
  commentor: string;
  commentDescription: string;
  starter?: boolean;
}

export const CommentCardMolecule: React.FC<CommentCardProps> = ({
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
          <AppTextElement
            title={commentor}
            fontVariant="medium"
            fontSizeVariant={'regular'}></AppTextElement>

          <AppTextElement
            fontSizeVariant={'regular'}
            title={commentDescription}
            fontVariant="regular"></AppTextElement>
        </View>
        {isReplyCommentVisible ? (
          <InputElement
            mode="outlined"
            onBlur={() => setIsReplyCommentVisible(!isReplyCommentVisible)}
            // placeholderTextColor={'gray'}
            height={40}
            placeholder="Reply....."
            right={
              <Icon color={'red'} size={40} source={'feather'}></Icon>
            }></InputElement>
        ) : null}
      </View>
    </>
  );
};
