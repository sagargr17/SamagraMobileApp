import React from 'react';
import {Alert, View} from 'react-native';
import {IconButton, TextInput} from 'react-native-paper';
import {TextComponet} from '../../Elements/TextComponet';
import {AreaMapper, titleCase} from '../../../Utilities/CustomMethods';
import {useTheme} from '@react-navigation/native';

interface CounterProps {
  setTotal: (Quantity: number) => void;
}

export const Counter: React.FC<CounterProps> = ({setTotal}) => {
  const [quantity, setText] = React.useState<number>(1);
  const {colors} = useTheme();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        height: AreaMapper({
          value: 40,
          scaleBy: 'height',
        }),
      }}>
      <TextComponet
        fontSizeVariant={'regular'}
        title={titleCase('Quantity')}
        fontVariant="medium"></TextComponet>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 0.7,
          backgroundColor: '#F4F4F4',
          height: AreaMapper({
            value: 40,
            scaleBy: 'height',
          }),
          borderBottomColor: colors.primary,
          borderBottomWidth: AreaMapper({
            value: 1,
            scaleBy: 'height',
          }),
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <TextComponet
            customStyle={{
              marginLeft: 10,
            }}
            fontSizeVariant={'regular'}
            title={`${quantity}`}
            fontVariant="medium"></TextComponet>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: AreaMapper({
              value: 4,
              scaleBy: 'average',
            }),
          }}>
          <IconButton
            icon={'minus'}
            size={16}
            onPress={() => {
              if (quantity > 1) {
                setText(quantity - 1);
                setTotal(quantity - 1);
              }
            }}></IconButton>
          <View
            style={{
              width: AreaMapper({
                value: 4,
                scaleBy: 'average',
              }),
            }}></View>
          <IconButton
            icon={'plus'}
            size={16}
            onPress={() => {
              setText(quantity + 1);
              setTotal(quantity + 1);
            }}></IconButton>
        </View>
      </View>
    </View>
  );
};
