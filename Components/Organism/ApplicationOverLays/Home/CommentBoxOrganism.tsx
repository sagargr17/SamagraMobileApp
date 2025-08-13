import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppTextElement} from '../../../Elements/AppTextElement';

import {useTheme} from '@react-navigation/native';
import {AreaMapper} from '../../../../Utilities/CustomMethods';
import {CommentCardMolecule} from '../../../Molecules/Cards/CommentCardMolecule';
import {AppBottomSheetMolecule} from '../../../Molecules/Global/AppBottomSheetMolecule';
interface CommentLayoutProps {
  onCloseHandle?: (status: any) => void;
}

export const CommentLayout: React.FC<CommentLayoutProps> = ({
  onCloseHandle,
}) => {
  const {colors} = useTheme();
  const [isCommentOpen, setIsCommentopen] = useState<boolean>(false);
  const [selectedcommentCardDetails, setCommentDetails] = useState<string>('');

  const dummyData = [
    {
      commentor: 'Ram Dhakal',
      commentDescription:
        'Qui ad non ullamco   ullamco nostr  ullamco nostr  ullamco nostr  ullamco nostr nostr',
    },
    {
      commentor: 'Sagar Thapa',
      commentDescription:
        'Qui ad non ullamco nostrud incididunt veniam reprehenderit ullamco deserunt ad dolor officia elit. Fugiat id tempor cillum sunt est elit eiusmod magna eiusmod. Consectetur ut nostrud ea excepteur. Irure consectetur anim reprehenderit exercitation occaecat cupidatat occaecat nulla.',
    },
    {
      commentor: 'Ram Dhakal',
      commentDescription:
        'Qui ad non ullamco   ullamco nostr  ullamco nostr  ullamco nostr  ullamco nostr nostr',
    },
    {
      commentor: 'Sagar Thapa',
      commentDescription:
        'Qui ad non ullamco nostrud incididunt veniam reprehenderit ullamco deserunt ad dolor officia elit. Fugiat id tempor cillum sunt est elit eiusmod magna eiusmod. Consectetur ut nostrud ea excepteur. Irure consectetur anim reprehenderit exercitation occaecat cupidatat occaecat nulla.',
    },
    {
      commentor: 'Sagar Thapa',
      commentDescription:
        'Qui ad non ullamco nostrud incididunt veniam reprehenderit ullamco deserunt ad dolor officia elit. Fugiat id tempor cillum sunt est elit eiusmod magna eiusmod. Consectetur ut nostrud ea excepteur. Irure consectetur anim reprehenderit exercitation occaecat cupidatat occaecat nulla.',
    },
    {
      commentor: 'Sagar Thapa',
      commentDescription:
        'Qui ad non ullamco nostrud incididunt veniam reprehenderit ullamco deserunt ad dolor officia elit. Fugiat id tempor cillum sunt est elit eiusmod magna eiusmod. Consectetur ut nostrud ea excepteur. Irure consectetur anim reprehenderit exercitation occaecat cupidatat occaecat nulla.',
    },
    {
      commentor: 'Sagar Thapa',
      commentDescription:
        'Qui ad non ullamco nostrud incididunt veniam reprehenderit ullamco deserunt ad dolor officia elit. Fugiat id tempor cillum sunt est elit eiusmod magna eiusmod. Consectetur ut nostrud ea excepteur. Irure consectetur anim reprehenderit exercitation occaecat cupidatat occaecat nulla.',
    },
  ];

  return (
    <>
      <View>
        {/*This is the layout of the Item Screenn  */}
        <TouchableOpacity
          style={{
            marginVertical: 10,
          }}
          onPress={() => {
            setIsCommentopen(!isCommentOpen);
            onCloseHandle ? onCloseHandle(isCommentOpen) : null;
          }}>
          <AppTextElement
            customStyle={{
              color: colors.text,
            }}
            title="Rating and Reviews"
            fontSizeVariant={'title'}
            fontVariant="bold"></AppTextElement>

          <CommentCardMolecule
            starter={isCommentOpen}
            commentor={dummyData[0].commentor}
            commentDescription={
              dummyData[0].commentDescription
            }></CommentCardMolecule>
          <CommentCardMolecule
            starter={isCommentOpen}
            commentor={dummyData[1].commentor}
            commentDescription={
              dummyData[0].commentDescription
            }></CommentCardMolecule>
        </TouchableOpacity>
      </View>

      {isCommentOpen ? (
        <AppBottomSheetMolecule
          onClose={() => {
            setIsCommentopen(!isCommentOpen);
            onCloseHandle ? onCloseHandle(isCommentOpen) : null;
          }}
          isOppen={isCommentOpen}
          pannigGesture={true}
          children={() => (
            <FlatList
              data={dummyData}
              renderItem={({item, index}) => (
                <CommentCardMolecule
                  commentor={item.commentor}
                  commentDescription={item.commentDescription}
                  key={index}></CommentCardMolecule>
              )}></FlatList>
          )}></AppBottomSheetMolecule>
      ) : null}
    </>
  );
};

const style = StyleSheet.create({
  // viewContainer: {
  //   marginHorizontal: AreaMapper({
  //     value: 12,
  //     scaleBy: 'average',
  //   }),
  // },

  textStyle: {
    marginVertical: AreaMapper({
      value: 10,
      scaleBy: 'height',
    }),
  },
});
