import React from 'react';
import {View} from 'react-native';
import {TextComponet} from '../Elements/TextComponet';
import AppButton from '../Elements/Button';
import {Icon} from 'react-native-paper';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useTheme} from '@react-navigation/native';

interface ItemCheckOutProps {
  totalPrice: number;
}

export const ItemCheckOut: React.FC<ItemCheckOutProps> = ({totalPrice = 0}) => {
  const {colors} = useTheme();
  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={
            {
              // flex:0.3
            }
          }>
          <TextComponet
            fontSize={16}
            lineHeight={36}
            title={'TOTAL PRICE'}
            fontVariant="medium"></TextComponet>
          <TextComponet
            fontSize={20}
            lineHeight={36}
            title={`₹ ${totalPrice}`}
            fontVariant="medium"></TextComponet>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex:0.9,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <AppButton
            onPress={() => null}
            style={{
              // flex: 0.8,
              alignItems: 'center',
            }}>
            Buy Now
            <View>
              <Icon
                color={colors.background}
                source={'chevron-right'}
                size={SamagraScaller({
                  value: 30,
                  scaleBy: 'average',
                })}></Icon>
            </View>
          </AppButton>

          <AppButton
            onPress={() => null}
            style={{
              // flex: 0.8,
              alignItems: 'center',
            }}>
            Check Out
            <View>
              <Icon
                color={colors.background}
                source={'chevron-right'}
                size={SamagraScaller({
                  value: 30,
                  scaleBy: 'average',
                })}></Icon>
            </View>
          </AppButton>
        </View>
      </View>
    </>
  );
};
