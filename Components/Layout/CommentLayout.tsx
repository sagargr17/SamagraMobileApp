import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextComponet} from '../Elements/TextComponet';

import {SamagraScaller} from '../../Utilities/CustomMethods';
import {CommentCard} from '../Sections/Cards/CommentCard';
import {useTheme} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
interface CommentLayoutProps {}

export const CommentLayout: React.FC<CommentLayoutProps> = ({}) => {
  const {colors} = useTheme();

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
  ];

  return (
    <>
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

      {/* {
        <FlatList
          data={dummyData}
          contentContainerStyle={{
            height:200
          }}
          renderItem={({item, index}) => (
            <CommentCard
              commentor={item.commentor}
              commentDescription={item.commentDescription}
              key={index}></CommentCard>
          )}></FlatList>
      } */}

      {dummyData.map((item, index) => (
        <CommentCard
          commentor={item.commentor}
          commentDescription={item.commentDescription}
          key={index}></CommentCard>
      ))}
    </>
  );
};
