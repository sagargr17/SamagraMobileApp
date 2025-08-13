import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {Icon, IconButton} from 'react-native-paper';
import {Logos} from '../../../Assets/SVG/Exports/Exports';
import {RowFlexLayout} from '../../../Layout/PartationLayout/RowFlexLayout';
import {size} from '../../../Prefrences/Prefrences';
import {useAppDispatch, useAppSelector} from '../../../StateManagement/hooks';
import {AppTextElement} from '../../Elements/AppTextElement';
import {NotificationIconElement} from '../../Elements/NotificationIconElement';
import {SpacerElement} from '../../Elements/SpacerElement';
import {titleCase} from '../../../Utilities/CustomMethods';
import {TouchableOpacity} from 'react-native';

interface AppHeaderOrganismProps {
  currentPosition: 'absolute' | 'relative' | 'static';
}

export const AppHeaderOrganism: React.FC<AppHeaderOrganismProps> = ({
  currentPosition = 'relative',
}) => {
  const {Location} = Logos;
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const location = useAppSelector(state => state.user.userLocation?.address);

  return (
    <>
      <SpacerElement></SpacerElement>
      <SpacerElement></SpacerElement>
      <RowFlexLayout>
        <NotificationIconElement></NotificationIconElement>
        <RowFlexLayout
          customStyle={[
            {
              borderColor: colors.border,
              borderRadius: size.borderRadius.full,
              backgroundColor: colors.background,
              flex: 0.8,
              justifyContent: 'flex-start',
              padding: size.spacing.s + 2,
              alignItems: 'center',
            },
            size.elevation.s,
          ]}>
          <Location height={size.iconSize.small}></Location>
          <AppTextElement
            customStyle={{
              marginLeft: size.spacing.xs + 2,
            }}
            title={`${titleCase(location)}`}
            fontVariant="medium"
            fontSizeVariant="title"></AppTextElement>
        </RowFlexLayout>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ApplicationOverlay', {
              screen: 'CartScreen',
            })
          }
          style={[
            {
              borderWidth: size.borderWidth.xs,
              borderRadius: size.borderRadius.full,
              alignItems: 'center',
              paddingHorizontal: size.spacing.s - 1,
              paddingVertical: size.spacing.xs + 5,
              backgroundColor: colors.background,
              borderColor: colors.border,
            },

            size.elevation.s,
          ]}>
          <Icon size={size.iconSize.large} source={'cart-outline'}></Icon>
        </TouchableOpacity>
      </RowFlexLayout>
    </>
  );
};
