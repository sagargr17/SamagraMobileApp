import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {AppTextElement} from '../../Components/Elements/AppTextElement';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import DateTimeToAgoTime, {AreaMapper} from '../../Utilities/CustomMethods';
import {SpacerElement} from '../../Components/Elements/SpacerElement';
import {size} from '../../Prefrences/Prefrences';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import AppButtonElement from '../../Components/Elements/ButtonElement';
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
        <AppTextElement
          customStyle={{
            fontSize: AreaMapper({value: 28}),
            textAlign: 'center',
            padding: 20,
          }}
          title="Your Service is live!"
          fontSizeVariant="display"
          fontVariant="heavy"></AppTextElement>
        <SpacerElement height={12}></SpacerElement>
        <View
          style={{
            alignItems: 'center',
          }}>
          <TickSign
            height={AreaMapper({value: 106})}
            width={AreaMapper({value: 112})}></TickSign>
          <SpacerElement height={15}></SpacerElement>
          <AppTextElement
            fontSizeVariant="title"
            fontVariant="medium"
            customStyle={{
              textAlign: 'center',
              paddingHorizontal: size.spacing.xs,
              width: AreaMapper({value: 350}),
            }}
            title="Your service is now visible to potential clients. You can view or edit it anytime."></AppTextElement>
        </View>
        <SpacerElement height={30}></SpacerElement>
        <AppTextElement
          customStyle={{
            textAlign: 'left',
          }}
          title="Service Details"
          fontSizeVariant="display"
          fontVariant="bold"></AppTextElement>
        <SpacerElement height={17}></SpacerElement>
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
          <AppTextElement
            fontSizeVariant="regular"
            fontVariant="medium"
            title="Service Name"></AppTextElement>
          <AppTextElement
            fontSizeVariant="regular"
            fontVariant="medium"
            title={item.item.name}></AppTextElement>
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={{
            borderBottomWidth: 1,
            paddingHorizontal: size.spacing.s,
            paddingVertical: size.spacing.s,
            borderColor: 'gray',
          }}>
          <AppTextElement
            fontSizeVariant="regular"
            fontVariant="medium"
            title="Category"></AppTextElement>
          <AppTextElement
            fontSizeVariant="regular"
            fontVariant="medium"
            title={item.item.category}></AppTextElement>
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={{
            borderBottomWidth: 1,
            paddingHorizontal: size.spacing.s,
            paddingVertical: size.spacing.s,
            borderColor: 'gray',
          }}>
          <AppTextElement
            fontSizeVariant="regular"
            fontVariant="medium"
            title="Description"></AppTextElement>
          <AppTextElement
            fontSizeVariant="regular"
            fontVariant="medium"
            title={item.item.description}></AppTextElement>
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={{
            borderBottomWidth: 1,
            paddingHorizontal: size.spacing.s,
            paddingVertical: size.spacing.s,
            borderColor: 'gray',
          }}>
          <AppTextElement
            fontSizeVariant="regular"
            fontVariant="medium"
            title="Description"></AppTextElement>
          <AppTextElement
            fontSizeVariant="regular"
            fontVariant="medium"
            title={`Npr.${item.item.price}`}></AppTextElement>
        </RowFlexLayout>
        <RowFlexLayout
          customStyle={{
            paddingHorizontal: size.spacing.s,
            paddingVertical: size.spacing.s,
            borderColor: 'gray',
          }}>
          <AppTextElement
            fontSizeVariant="regular"
            fontVariant="medium"
            title="Availability"></AppTextElement>
          <AppTextElement
            fontSizeVariant="regular"
            fontVariant="medium"
            title={`${DateTimeToAgoTime(
              Date.now().toLocaleString(),
            )}`}></AppTextElement>
        </RowFlexLayout>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 15,
          width: AreaMapper({value: 395}),
          marginHorizontal: size.spacing.xs,
        }}>
        <AppButtonElement
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
        </AppButtonElement>
      </View>
    </>
  );
};
