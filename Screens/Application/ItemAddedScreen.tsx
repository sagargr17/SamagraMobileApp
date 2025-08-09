import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {AppText} from '../../Components/Elements/AppText';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import DateTimeToAgoTime, {AreaMapper} from '../../Utilities/CustomMethods';
import {Spacer} from '../../Components/Elements/Spacer';
import {size} from '../../Prefrences/Prefrences';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import AppButton from '../../Components/Elements/Button';
import {useAppSelector} from '../../StateManagement/hooks';
interface ItemAddedScreenProps {}

export const ItemAddedScreen: React.FC<ItemAddedScreenProps> = ({}) => {
  const {colors} = useTheme();
  const item = useAppSelector(state => state.user.addItemStates);
  const {TickSign} = Logos;
  const navigation = useNavigation<any>();

  return (
    <>
      <View
        style={{
          marginHorizontal: size.spacing.xs,
        }}>
        <AppText
          customStyle={{
            fontSize: AreaMapper({value: 28}),
            textAlign: 'center',
            padding: 20,
          }}
          title="Your Service is live!"
          fontSizeVariant="display"
          fontVariant="heavy"></AppText>
        <Spacer height={12}></Spacer>
        <View
          style={{
            alignItems: 'center',
          }}>
          <TickSign
            height={AreaMapper({value: 106})}
            width={AreaMapper({value: 112})}></TickSign>
          <Spacer height={15}></Spacer>
          <AppText
            fontSizeVariant="title"
            fontVariant="medium"
            customStyle={{
              textAlign: 'center',
              paddingHorizontal: size.spacing.xs,
              width: AreaMapper({value: 350}),
            }}
            title="Your service is now visible to potential clients. You can view or edit it anytime."></AppText>
        </View>
        <Spacer height={30}></Spacer>
        <AppText
          customStyle={{
            textAlign: 'left',
          }}
          title="Service Details"
          fontSizeVariant="display"
          fontVariant="bold"></AppText>
        <Spacer height={17}></Spacer>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          marginHorizontal: size.spacing.xs,
        }}>
        <RowFlexLayout
          customStyle={{
            borderBottomWidth: 1,
            paddingHorizontal: size.spacing.s,
            paddingVertical: size.spacing.s,
            borderColor: 'gray',
          }}>
          <AppText
            fontSizeVariant="regular"
            fontVariant="medium"
            title="Service Name"></AppText>
          <AppText
            fontSizeVariant="regular"
            fontVariant="medium"
            title={item.item.name}></AppText>
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={{
            borderBottomWidth: 1,
            paddingHorizontal: size.spacing.s,
            paddingVertical: size.spacing.s,
            borderColor: 'gray',
          }}>
          <AppText
            fontSizeVariant="regular"
            fontVariant="medium"
            title="Category"></AppText>
          <AppText
            fontSizeVariant="regular"
            fontVariant="medium"
            title={item.item.category}></AppText>
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={{
            borderBottomWidth: 1,
            paddingHorizontal: size.spacing.s,
            paddingVertical: size.spacing.s,
            borderColor: 'gray',
          }}>
          <AppText
            fontSizeVariant="regular"
            fontVariant="medium"
            title="Description"></AppText>
          <AppText
            fontSizeVariant="regular"
            fontVariant="medium"
            title={item.item.Descriptionn}></AppText>
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={{
            borderBottomWidth: 1,
            paddingHorizontal: size.spacing.s,
            paddingVertical: size.spacing.s,
            borderColor: 'gray',
          }}>
          <AppText
            fontSizeVariant="regular"
            fontVariant="medium"
            title="Description"></AppText>
          <AppText
            fontSizeVariant="regular"
            fontVariant="medium"
            title={`Npr.${item.item.price}`}></AppText>
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={{
            paddingHorizontal: size.spacing.s,
            paddingVertical: size.spacing.s,
            borderColor: 'gray',
          }}>
          <AppText
            fontSizeVariant="regular"
            fontVariant="medium"
            title="Availability"></AppText>
          <AppText
            fontSizeVariant="regular"
            fontVariant="medium"
            title={`${DateTimeToAgoTime(
              Date.now().toLocaleString(),
            )}`}></AppText>
        </RowFlexLayout>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 15,
          width: AreaMapper({value: 395}),
          marginHorizontal: size.spacing.xs,
        }}>
        <AppButton
          onPress={() => {
            // Alert.alert('asdsad');
            navigation.navigate('BottomTab', {
              screen: 'Home',
              params: {
                screen: 'ManageServices',
              },
            });
          }}>
          View Services
        </AppButton>
      </View>
    </>
  );
};
