import {View} from 'moti';
import React from 'react';
import {NotifcaitonIcon} from '../Elements/NotifcaitonIcon';
import {TextComponet} from '../Elements/TextComponet';
import {Logos} from '../../Assets/SVG/Exports/Exports';
import {useTheme} from '@react-navigation/native';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {StyleSheet} from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import {Button} from 'react-native-paper';

interface AppHeaderProps {}

export const AppHeader: React.FC<AppHeaderProps> = ({}) => {
  const {Location} = Logos;
  const {colors} = useTheme();
  return (
    <>
      <View style={[styles.headerConntainer]}>
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
            flex: 1,
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
            borderWidth: 0.1,
            marginHorizontal: SamagraScaller({
              value: 16,
              scaleBy: 'width',
            }),
            alignItems: 'center',
          }}>
          <Location></Location>
          <TextComponet
            title="Baneswor, Kathmandu"
            fontVariant="regular"></TextComponet>
        </View>
        <View>
          <Button
            onPress={() => console.log('Presing image')}
            buttonColor={'transparent'}>
            <FastImage
              resizeMode="cover"
              style={{
                height: SamagraScaller({
                  value: 52,
                  scaleBy: 'average',
                }),
                width: SamagraScaller({
                  value: 52,
                  scaleBy: 'average',
                }),
                borderWidth: 2,
                borderColor: colors.background,
                borderRadius: 45,
              }}
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}></FastImage>
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerConntainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: 1,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: SamagraScaller({
      scaleBy: 'width',
      value: 10,
    }),
  },
});
