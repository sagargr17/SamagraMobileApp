import React from 'react';
import {View} from 'react-native';
import {AppTextElement} from '../../Elements/AppTextElement';
import AppButtonElement from '../../Elements/ButtonElement';
import {Icon} from 'react-native-paper';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useTheme} from '@react-navigation/native';
import {useMutation} from '@apollo/client';
import {addItemToBasket} from '../../../GraphQL/Mutation/CheckOutMutation';
import {showMessage} from 'react-native-flash-message';
import {size} from '../../../Prefrences/Prefrences';

interface ItemCheckOutBarMoleculeProps {
  totalPrice: number;
  onBuyNow: () => void;
  itemID: string;
}

export const ItemCheckOutBarMolecule: React.FC<ItemCheckOutBarMoleculeProps> = ({
  totalPrice = 0,
  onBuyNow,
  itemID,
}) => {
  const {colors} = useTheme();

  const [addToBasketFn, {data, loading, error}] = useMutation(addItemToBasket);

  const addToBasketHandnle = async () => {
    console.log('ITem ID:::', itemID);

    try {
      const response = await addToBasketFn({
        variables: {
          itemID: itemID,
        },
      });
      if (response.data) {
        showMessage({
          type: 'success',
          message: 'Added To Basket Complete ',
        });
      }
      if (response.errors) {
        console.log('Error1:::', response.errors);
        showMessage({
          type: 'danger',
          message: 'Something Went Wrong!',
        });
      }
    } catch (e) {
      console.log('Error2:::', e);

      showMessage({
        type: 'danger',
        message: 'Something Went Wrong!',
      });
    }
  };

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: AreaMapper({
            value: 10,
            scaleBy: 'average',
          }),

          paddingBottom: AreaMapper({
            value: 15,
            scaleBy: 'average',
          }),
          paddingHorizontal: AreaMapper({
            value: 16,
            scaleBy: 'average',
          }),
        }}>
        <View>
          <AppTextElement
            fontSizeVariant={'regular'}
            title={'TOTAL PRICE'}
            fontVariant="bold"></AppTextElement>
          <AppTextElement
            fontSizeVariant={'regular'}
            title={`₹ ${totalPrice}`}
            customStyle={{
              color: colors.primary,
            }}
            fontVariant="bold"></AppTextElement>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            // flex: 0.95,
            alignItems: 'center',
            justifyContent: 'space-around',
            marginLeft: AreaMapper({
              value: 10,
              scaleBy: 'width',
            }),
          }}>
          <AppButtonElement
            onPress={onBuyNow}
            style={{
              alignItems: 'center',
              backgroundColor: 'orange',
            }}>
            Buy Now
            <View>
              <Icon
                color={colors.background}
                source={'chevron-right'}
                size={size.spacing.l}></Icon>
            </View>
          </AppButtonElement>

          <AppButtonElement
            onPress={addToBasketHandnle}
            style={{
              marginLeft: AreaMapper({
                value: 2,
                scaleBy: 'average',
              }),
              alignItems: 'center',
            }}>
            Add to Cart
            <View>
              <Icon
                color={colors.background}
                source={'chevron-right'}
                size={size.spacing.l}></Icon>
            </View>
          </AppButtonElement>
        </View>
      </View>
    </>
  );
};
