import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {TextComponet} from '../Elements/TextComponet';

interface SamagraBottomSheetProps {
  children: () => React.ReactNode;
  title: string;
  pannigGesture: boolean;
}

// This is the section component where element is not working at all
export const SamagraBottomSheet: React.FC<SamagraBottomSheetProps> = ({
  children,
  title,
  pannigGesture = false,
}) => {
  const {colors} = useTheme();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <>
      <BottomSheet
        enableDynamicSizing={true}
        animateOnMount={true}
        enablePanDownToClose={false}
        backgroundStyle={{backgroundColor: colors.card}}
        enableContentPanningGesture={false}
        snapPoints={['100%']}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        style={{
          elevation: 0.2,
        }}
        containerStyle={{
          borderRadius: 2,
        }}>
        <View
          style={[
            styles.titleCotainer,
            {
              borderColor: colors.border,
            },
          ]}>
          <TextComponet
            customStyle={{
              padding: SamagraScaller({
                value: 10,
                scaleBy: 'average',
              }),
            }}
            fontSize={SamagraScaller({
              value: 16,
              scaleBy: 'average',
            })}
            title={'Request for ' + title}
            fontVariant="bold"></TextComponet>
        </View>
        <BottomSheetView
          style={[
            {
              borderColor: colors.border,
              paddingHorizontal: SamagraScaller({
                value: 20,
                scaleBy: 'average',
              }),
              flex: 0.07,
            },
          ]}>
          {children()}
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  titleCotainer: {
    alignItems: 'center',
    shadowOffset: {
      height: 2,
      width: 2,
    },
    borderWidth: SamagraScaller({
      value: 1,
      scaleBy: 'average',
    }),
    boxShadow: '2',
    borderRadius: SamagraScaller({
      value: 10,
      scaleBy: 'average',
    }),

    marginHorizontal: SamagraScaller({
      value: 20,
      scaleBy: 'average',
    }),
  },
});
