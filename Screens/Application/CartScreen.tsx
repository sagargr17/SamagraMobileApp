import React from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {TextComponet} from '../../Components/Elements/TextComponet';
import {size} from '../../Prefrences/Prefrences';
interface CartScreenProps {}

export const CartScreen: React.FC<CartScreenProps> = ({}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();

  return (
    <>
      <FlatList
        contentContainerStyle={{
          padding: size.spacing.s,
        }}
        data={[1, 2, 3]}
        ListHeaderComponent={
          <TextComponet
            customStyle={{
              margin: size.spacing.xs,
            }}
            fontSizeVariant="display"
            fontVariant="bold"
            title={`CART`}></TextComponet>
        }
        renderItem={({item, index}) => (
          <View
            key={index}
            style={{
              backgroundColor: colors.card,
              borderWidth: size.borderWidth.s,
              padding: size.spacing.xs,
              margin: size.spacing.xs,
            }}>
            <TextComponet
              fontSizeVariant="regular"
              fontVariant="bold"
              title={`ITEM::${index}`}></TextComponet>
            <TextComponet
              fontSizeVariant="regular"
              fontVariant="bold"
              title={`Price:200`}></TextComponet>
            <TextComponet
              fontSizeVariant="regular"
              fontVariant="bold"
              title={`Butwal Amarpath`}></TextComponet>
            <Button
              title="Place Order"
              onPress={() => {
                navigation.navigate('ApplicationOverlay', {
                  screen: 'PlaceOrderScreen',
                });
              }}></Button>
          </View>
        )}></FlatList>
    </>
  );
};
