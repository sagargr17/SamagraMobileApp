import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {TextComponet} from '../Elements/TextComponet';

interface SamagraBottomSheetProps {
  children: () => React.ReactNode;
  title: string;
  pannigGesture: boolean;
  flexHeight: number;
  isOppen: boolean;
  onClose?: () => void;
  customStyle?: ViewStyle;
}

export const SamagraBottomSheet: React.FC<SamagraBottomSheetProps> = ({
  children,
  title,
  pannigGesture,
  flexHeight,
  isOppen,
  onClose,
  customStyle,
}) => {
  console.log('IS PROFIE TAB', isOppen);

  const {colors} = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = isOppen ? ['90%'] : ['10%'];

  useEffect(() => {
    if (isOppen) {
      bottomSheetRef.current?.snapToIndex(0);
      console.log('it is open');
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOppen]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log('handleSheetChanges', index);
      if (index === -1 && onClose) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={pannigGesture ? (isOppen ? 0 : -1) : 0} // Initial index based on isOppen
      snapPoints={snapPoints}
      enableDynamicSizing={true}
      animateOnMount={true}
      enablePanDownToClose={pannigGesture}
      backgroundStyle={{backgroundColor: colors.card}}
      enableContentPanningGesture={pannigGesture}
      onChange={handleSheetChanges}
      style={[
        {
          borderRadius: 10,
          borderColor: colors.border,
          flex: 0.01,
          borderWidth: 1,
        },
        customStyle,
      ]}>
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={[
          {
            borderColor: colors.border,
            paddingHorizontal: SamagraScaller({
              value: 20,
              scaleBy: 'average',
            }),
            flex: 100,
          },
        ]}>
        {children()}
      </BottomSheetScrollView>
    </BottomSheet>
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
