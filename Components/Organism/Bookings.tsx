import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {SectionHeader} from '../Molecules/Global/SectionHeader';
import {ListCard} from '../Molecules/Cards/ListCard';
import {AppText} from '../Elements/AppText';
import {size} from '../../Prefrences/Prefrences';
import {RowFlexLayout} from '../../Layout/PartationLayout/RowFlexLayout';
import {Spacer} from '../Elements/Spacer';
interface BookingsProps {}

export const Bookings: React.FC<BookingsProps> = ({}) => {
  const {colors} = useTheme();

  return (
    <>
      <SectionHeader
        style={{
          fontSize: 20,
          lineHeight: 25,
        }}
        title="Bookings"
        isIcon={false}
        onPress={() => {}}></SectionHeader>
      <Spacer height={10}></Spacer>
      <RowFlexLayout
        customStyle={{
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <ListCard
          customStyle={{
            backgroundColor: colors.background,
          }}
          id="1"
          imageUrl=""
          list={[
            {
              value: 'Plumbing',
              type: 'regular',
              fontVariant: 'medium',
            },
            {
              value: 'Tomorrow, 2PM',
              type: 'caption',
            },
          ]}></ListCard>
        <TouchableOpacity
          onPress={() => {
            // Alert.alert('aslkasdsaddj');
          }}>
          <AppText
            customStyle={{
              backgroundColor: colors.card,
              paddingVertical: size.spacing.xxs,
              paddingHorizontal: size.spacing.xs,
              right: 80,
              borderRadius: size.borderRadius.s,
            }}
            title="Reschedule"></AppText>
        </TouchableOpacity>
      </RowFlexLayout>
      <RowFlexLayout
        customStyle={{
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <ListCard
          customStyle={{
            backgroundColor: colors.background,
          }}
          id="1"
          imageUrl=""
          list={[
            {
              value: 'Home Cleaning',
              type: 'regular',
              fontVariant: 'medium',
            },
            {
              value: 'Completed:1 week ago',
              type: 'caption',
            },
          ]}></ListCard>
        <TouchableOpacity
          onPress={() => {
            // Alert.alert('aslkasdsaddj');
          }}>
          <AppText
            customStyle={{
              backgroundColor: colors.card,
              paddingVertical: size.spacing.xxs,
              paddingHorizontal: size.spacing.xs,
              right: 80,
              borderRadius: size.borderRadius.s,
            }}
            title="Reschedule"></AppText>
        </TouchableOpacity>
      </RowFlexLayout>
    </>
  );
};
