import {useTheme} from '@react-navigation/native';
import {View} from 'moti';
import React from 'react';
import {StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {NotifcaitonIcon} from '../Elements/NotifcaitonIcon';
import {TextComponet} from '../Elements/TextComponet';

interface AppHeaderProps {
  currentPosition: 'absolute' | 'relative' | 'static';
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentPosition = 'relative',
}) => {
  const {Location} = Logos;
  const {colors} = useTheme();
  return (
    <>
      <View
        style={[
          styles.headerConntainer,
          {
            position: currentPosition,
          },
        ]}>
        <View
          style={{
            padding: SamagraScaller({
              value: 10,
              scaleBy: 'average',
            }),
            backgroundColor: colors.background,
            borderRadius: SamagraScaller({
              value: 200,
              scaleBy: 'average',
            }),
            borderWidth: 0.3,
            borderColor: colors.border,
          }}>
          <NotifcaitonIcon></NotifcaitonIcon>
        </View>
        <View
          style={{
            flex: 2,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: colors.background,
            paddingVertical: SamagraScaller({
              value: 16,
              scaleBy: 'height',
            }),
            paddingHorizontal: SamagraScaller({
              value: 12,
              scaleBy: 'width',
            }),
            borderRadius: SamagraScaller({
              value: 52,
              scaleBy: 'average',
            }),
            shadowOffset: {
              height: 2,
              width: 2,
            },
            borderWidth: 0.3,
            marginHorizontal: SamagraScaller({
              value: 16,
              scaleBy: 'width',
            }),
            alignItems: 'center',
            borderColor: colors.border,
          }}>
          <Location></Location>
          <TextComponet
            title="Baneswor, Kathmandu"
            fontVariant="regular"></TextComponet>
        </View>
        <View>
          <IconButton
            iconColor={colors.text}
            onPress={() => console.log('TOuched')}
            icon={'cart-outline'}
            size={SamagraScaller({
              value: 28,
              scaleBy: 'average',
            })}
            style={{
              backgroundColor: colors.background,
              borderWidth: 0.3,
              borderColor: colors.border,
            }}></IconButton>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerConntainer: {
    display: 'flex',
    flexDirection: 'row',
    top: 1,
    zIndex: 2,
    alignItems: 'center',
    marginHorizontal: SamagraScaller({
      scaleBy: 'width',
      value: 10,
    }),
    backgroundColor: 'transparent',
  },
});
