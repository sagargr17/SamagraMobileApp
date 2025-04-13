import React from 'react';
import {Alert, View} from 'react-native';
import {IconButton, TextInput} from 'react-native-paper';
import {TextComponet} from '../Elements/TextComponet';
import {SamagraScaller, titleCase} from '../../Utilities/CustomMethods';
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

        height: SamagraScaller({
          value: 40,
          scaleBy: 'height',
        }),
      }}>
      <TextComponet
        fontSize={18}
        lineHeight={36}
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
          height: SamagraScaller({
            value: 40,
            scaleBy: 'height',
          }),
          borderBottomColor: colors.primary,
          borderBottomWidth: SamagraScaller({
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
            fontSize={16}
            lineHeight={36}
            title={`${quantity}`}
            fontVariant="medium"></TextComponet>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SamagraScaller({
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
              width: SamagraScaller({
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
