import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AreaMapper} from '../../../Utilities/CustomMethods';
import {AppText} from '../../Elements/AppText';
import {size} from '../../../Prefrences/Prefrences';

interface SamagraBottomSheetProps {
  children: () => React.ReactNode;
  title: string;
  pannigGesture: boolean;
  flexHeight: number;
  isOppen: boolean;
  onClose?: () => void;
  customStyle?: ViewStyle;
}

export const AppBottomSheet: React.FC<SamagraBottomSheetProps> = ({
  children,
  pannigGesture,
  isOppen,
  onClose,
}) => {
  const {colors} = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = isOppen ? ['100%'] : ['10%'];

  useEffect(() => {
    if (isOppen) {
      bottomSheetRef.current?.snapToIndex(0);
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
      animateOnMount={false}
      enablePanDownToClose={pannigGesture}
      backgroundStyle={{backgroundColor: colors.background}}
      enableContentPanningGesture={pannigGesture}
      onChange={handleSheetChanges}
      style={[
        {
          borderRadius: 10,
          borderColor: colors.border,
          flex: 0.01,
          borderWidth: 1,
          backgroundColor: colors.background,
        },
      ]}>
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={[
          {
            borderColor: colors.border,
            paddingHorizontal: size.spacing.xs,
            backgroundColor: colors.background,
            paddingBottom: size.spacing.l,
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
    borderWidth: AreaMapper({
      value: 1,
      scaleBy: 'average',
    }),
    boxShadow: '2',
    borderRadius: AreaMapper({
      value: 10,
      scaleBy: 'average',
    }),
    marginHorizontal: AreaMapper({
      value: 20,
      scaleBy: 'average',
    }),
  },
});
