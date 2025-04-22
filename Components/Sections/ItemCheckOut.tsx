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
          paddingTop: SamagraScaller({
            value: 10,
            scaleBy: 'average',
          }),

          paddingBottom: SamagraScaller({
            value: 15,
            scaleBy: 'average',
          }),
          paddingHorizontal:SamagraScaller({
            value: 16,
            scaleBy: 'average',
          }),
          
        }}>
        <View>
          <TextComponet
            fontSize={16}
            lineHeight={26}
            title={'TOTAL PRICE'}
            fontVariant="bold"></TextComponet>
          <TextComponet
            fontSize={20}
            lineHeight={20}
            title={`₹ ${totalPrice}`}
            customStyle={{
              color:colors.primary
            }}
            fontVariant="bold"></TextComponet>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 0.95,
            alignItems: 'center',
            justifyContent: 'space-around',
            marginLeft:SamagraScaller({
              value:10,
              scaleBy:"width"
            })
          }}>
          <AppButton
            onPress={() => null}
            style={{
              
              alignItems: 'center',
              backgroundColor: 'orange',
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
