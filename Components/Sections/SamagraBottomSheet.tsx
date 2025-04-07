import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useTheme} from '@react-navigation/native';
import React, {useCallback, useRef} from 'react';
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
      <GestureHandlerRootView style={styles.container}>
        <BottomSheet
          enableDynamicSizing={true}
          animateOnMount={true}
          enablePanDownToClose={false}
          backgroundStyle={{backgroundColor: colors.card}}
          // enableContentPanningGesture={pannigGesture}
          enableHandlePanningGesture={false}
          snapPoints={['100%']}
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          index={0}>
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
                  value: 6,
                  scaleBy: 'average',
                }),
              }}
              fontSize={SamagraScaller({
                value: 18,
                scaleBy: 'average',
              })}
              title={'Request for ' + title}
              fontVariant="bold"></TextComponet>
          </View>
          <BottomSheetView
            // showsVerticalScrollIndicator={false}
            style={[
              {
                borderColor: colors.border,
                paddingHorizontal: SamagraScaller({
                  value: 20,
                  scaleBy: 'average',
                }),
              },
            ]}>
            {children()}
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 40,
  },
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
      value: 8,
      scaleBy: 'average',
    }),
    marginHorizontal: SamagraScaller({
      value: 20,
      scaleBy: 'average',
    }),
  },
});
