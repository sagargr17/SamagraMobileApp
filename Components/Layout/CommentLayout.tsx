import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextComponet} from '../Elements/TextComponet';

import {SamagraScaller} from '../../Utilities/CustomMethods';
import {CommentCard} from '../Sections/Cards/CommentCard';
import {useTheme} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {SamagraBottomSheet} from '../Sections/SamagraBottomSheet';
interface CommentLayoutProps {}

export const CommentLayout: React.FC<CommentLayoutProps> = ({}) => {
  const {colors} = useTheme();
  const [isCommentOpen, setIsCommentopen] = useState<boolean>(false);

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
  ];

  return (
    <>
      <View
        
        style={{
          marginHorizontal: SamagraScaller({
            value: 12,
            scaleBy: 'average',
          }),
          
        }}>
        {/*This is the layout of the Item Screenn  */}
        <TouchableOpacity onPress={() => setIsCommentopen(!isCommentOpen)}>
          <TextComponet
            customStyle={{
              marginVertical: SamagraScaller({
                value: 10,
                scaleBy: 'height',
              }),
              color: colors.text,
            }}
            title="Rating and Reviews"
            fontSize={16}
            lineHeight={22}
            fontVariant="bold"></TextComponet>
          <CommentCard
            commentor={dummyData[0].commentor}
            commentDescription={dummyData[0].commentDescription}></CommentCard>
        </TouchableOpacity>
      </View>

      <SamagraBottomSheet
        onClose={() => setIsCommentopen(!isCommentOpen)}
        customStyle={{
          zIndex:100
        }}
        isOppen={isCommentOpen}
        pannigGesture={true}
        flexHeight={2}
        title="Reviews"
        children={() =>
          dummyData.map((item, index) => (
            <CommentCard
              commentor={item.commentor}
              commentDescription={item.commentDescription}
              key={index}></CommentCard>
          ))
        }></SamagraBottomSheet>
    </>
  );
};
