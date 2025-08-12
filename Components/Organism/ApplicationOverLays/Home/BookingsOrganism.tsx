import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { RowFlexLayout } from '../../../../Layout/PartationLayout/RowFlexLayout';
import { size } from '../../../../Prefrences/Prefrences';
import { AppTextElement } from '../../../Elements/AppTextElement';
import { SpacerElement } from '../../../Elements/SpacerElement';
import { ListCardMolecule } from '../../../Molecules/Cards/ListCardMolecule';
import { SectionHeaderMolecule } from '../../../Molecules/Global/SectionHeaderMolecule';
interface BookingsOrganismProps {}

export const BookingsOrganism: React.FC<BookingsOrganismProps> = ({}) => {
  const {colors} = useTheme();

  return (
    <>
      <SectionHeaderMolecule
        style={{
          fontSize: 20,
          lineHeight: 25,
        }}
        title="Bookings"
        isIcon={false}
        onPress={() => {}}></SectionHeaderMolecule>
      <SpacerElement height={10}></SpacerElement>
      <RowFlexLayout
        customStyle={{
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <ListCardMolecule
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
          ]}></ListCardMolecule>
        <TouchableOpacity
          onPress={() => {
            // Alert.alert('aslkasdsaddj');
          }}>
          <AppTextElement
            customStyle={{
              backgroundColor: colors.card,
              paddingVertical: size.spacing.xxs,
              paddingHorizontal: size.spacing.xs,
              right: 80,
              borderRadius: size.borderRadius.s,
            }}
            title="Reschedule"></AppTextElement>
        </TouchableOpacity>
      </RowFlexLayout>
      <RowFlexLayout
        customStyle={{
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <ListCardMolecule
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
          ]}></ListCardMolecule>
        <TouchableOpacity
          onPress={() => {
            // Alert.alert('aslkasdsaddj');
          }}>
          <AppTextElement
            customStyle={{
              backgroundColor: colors.card,
              paddingVertical: size.spacing.xxs,
              paddingHorizontal: size.spacing.xs,
              right: 80,
              borderRadius: size.borderRadius.s,
            }}
            title="Reschedule"></AppTextElement>
        </TouchableOpacity>
      </RowFlexLayout>
    </>
  );
};
