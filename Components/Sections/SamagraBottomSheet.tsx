import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useTheme} from '@react-navigation/native';
import React, {useCallback, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {TextComponet} from '../Elements/TextComponet';

interface SamagraBottomSheetProps {
  children: () => React.ReactNode;
  title: string;
}

export const SamagraBottomSheet: React.FC<SamagraBottomSheetProps> = ({
  children,
  title,
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
          enablePanDownToClose={false}
          backgroundStyle={{backgroundColor: colors.card}}
          enableContentPanningGesture={false}
          snapPoints={['100%']}
          ref={bottomSheetRef}
          onChange={handleSheetChanges}>
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
          <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
            style={[
              {
                borderColor: colors.border,
                paddingHorizontal: SamagraScaller({
                  value: 20,
                  scaleBy: 'average',
                }),
                flex: 0.5,
              },
            ]}>
            {children()}
          </BottomSheetScrollView>
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
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
