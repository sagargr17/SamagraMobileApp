import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppText} from '../Elements/AppText';

import {useTheme} from '@react-navigation/native';
import {AreaMapper} from '../../Utilities/CustomMethods';
import {CommentCard} from '../Molecules/Cards/CommentCard';
import {AppBottomSheet} from '../Molecules/Global/AppBottomSheet';
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
          <AppText
            customStyle={{
              color: colors.text,
            }}
            title="Rating and Reviews"
            fontSizeVariant={'regular'}
            fontVariant="bold"></AppText>

          <CommentCard
            starter={isCommentOpen}
            commentor={dummyData[0].commentor}
            commentDescription={dummyData[0].commentDescription}></CommentCard>
        </TouchableOpacity>
      </View>

      {isCommentOpen ? (
        <AppBottomSheet
          onClose={() => {
            setIsCommentopen(!isCommentOpen);
            onCloseHandle ? onCloseHandle(isCommentOpen) : null;
          }}
          customStyle={{
            zIndex: 200,
            padding: 0,
          }}
          isOppen={isCommentOpen}
          pannigGesture={true}
          flexHeight={1}
          title="Reviews"
          children={() => (
            <FlatList
              data={dummyData}
              renderItem={({item, index}) => (
                <CommentCard
                  commentor={item.commentor}
                  commentDescription={item.commentDescription}
                  key={index}></CommentCard>
              )}></FlatList>
          )}></AppBottomSheet>
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
