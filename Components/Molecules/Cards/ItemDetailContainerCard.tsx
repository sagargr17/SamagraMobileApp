import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';
import {AreaMapper, titleCase} from '../../../Utilities/CustomMethods';
import {Rating} from '../../Elements/Rating';
import {Spacer} from '../../Elements/Spacer';
import {AppText} from '../../Elements/AppText';
import {Counter} from '../Global/Counter';
interface ItemDetailContainerCardProps {}

export const ItemDetailContainerCard: React.FC<
  ItemDetailContainerCardProps
> = ({}) => {
  const {colors} = useTheme();
  const [totalPrice, setTotalPrice] = useState<number>(320);

  const handleTotalPrice = (Quantity: number) => {
    setTotalPrice(320 * Quantity);
  };

  return (
    <View
      style={{
        paddingLeft: AreaMapper({
          value: 16,
          scaleBy: 'average',
        }),
        paddingRight: AreaMapper({
          value: 16,
          scaleBy: 'average',
        }),
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: 'orange',
          justifyContent: 'space-between',
        }}>
        <AppText
          fontSizeVariant={24}
          lineHeight={20}
          title={titleCase(name)}
          fontVariant="regular"
          customStyle={{
            margin: 0,
            padding: 0,
          }}></AppText>
        <IconButton
          icon="heart-outline"
          size={24}
          onPress={() => console.log('Added to wishlist')}
          iconColor={colors.notification}
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <AppText
          customStyle={{
            backgroundColor: 'gray',
            color: colors.background,
            paddingHorizontal: AreaMapper({
              value: 8,
              scaleBy: 'height',
            }),
          }}
          fontSizeVariant={14}
          title={titleCase('423 Sold')}
          fontVariant="regular"></AppText>
        <Rating></Rating>
      </View>
      <Spacer height={12}></Spacer>
      <View>
        <AppText
          fontSizeVariant={16}
          lineHeight={21}
          title={titleCase('Description')}
          fontVariant="medium"></AppText>
        <Spacer height={8}></Spacer>
        <AppText
          fontSizeVariant={14}
          title={titleCase(
            'Lorem ipsum dolor sit amet consectetur. Malesuada faucibus viverra eget ridiculus a nec amet in. In turpis etiam tristique sit enim proin pulvinar.',
          )}
          fontVariant="regular"></AppText>
      </View>

      <Spacer height={25}></Spacer>
      <Counter
        setTotal={(Quantity: number) => handleTotalPrice(Quantity)}></Counter>

      <Spacer height={10}></Spacer>
      <Divider></Divider>
    </View>
  );
};
