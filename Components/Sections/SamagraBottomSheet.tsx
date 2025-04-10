// import BottomSheet, {
//   BottomSheetScrollView,
//   BottomSheetView,
// } from '@gorhom/bottom-sheet';
// import {useTheme} from '@react-navigation/native';
// import React, {useCallback, useEffect, useRef} from 'react';
// import {StyleSheet, View} from 'react-native';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {SamagraScaller} from '../../Utilities/CustomMethods';
// import {TextComponet} from '../Elements/TextComponet';

// interface SamagraBottomSheetProps {
//   children: () => React.ReactNode;
//   title: string;
//   pannigGesture: boolean;
//   flexHeight: number;
//   indexValue: 0 | -1;
//   isOppen: boolean;
// }

// // This is the section component where element is not working at all
// export const SamagraBottomSheet: React.FC<SamagraBottomSheetProps> = ({
//   children,
//   title,
//   pannigGesture,
//   flexHeight,
//   indexValue = -1,
//   isOppen,
// }) => {
//   const {colors} = useTheme();
//   // ref
//   const bottomSheetRef = useRef<BottomSheet>(null);
//   console.log('bottom Screenn', pannigGesture);

//   // callbacks
//   const handleSheetChanges = useCallback((index: number) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   console.log('INdexxx value', indexValue);

//   return (
//     <>
//       <BottomSheet
//         index={indexValue}
//         enableDynamicSizing={true}
//         animateOnMount={true}
//         enablePanDownToClose={pannigGesture}
//         backgroundStyle={{backgroundColor: colors.card}}
//         enableContentPanningGesture={pannigGesture}
//         ref={bottomSheetRef}
//         snapPoints={['100%']}
//         onChange={handleSheetChanges}
//         style={{
//           borderWidth: 0.1,
//           borderRadius: 10,
//           borderColor: colors.border,
//           flex: 0.01,
//         }}>
//         <View
//           style={[
//             styles.titleCotainer,
//             {
//               borderColor: colors.border,
//             },
//           ]}>
//           <TextComponet
//             customStyle={{
//               padding: SamagraScaller({
//                 value: 10,
//                 scaleBy: 'average',
//               }),
//             }}
//             fontSize={SamagraScaller({
//               value: 16,
//               scaleBy: 'average',
//             })}
//             title={title}
//             fontVariant="bold"></TextComponet>
//         </View>
//         <BottomSheetView
//           style={[
//             {
//               borderColor: colors.border,
//               paddingHorizontal: SamagraScaller({
//                 value: 20,
//                 scaleBy: 'average',
//               }),
//               flex: flexHeight,
//             },
//           ]}>
//           {children()}
//         </BottomSheetView>
//       </BottomSheet>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   titleCotainer: {
//     alignItems: 'center',
//     shadowOffset: {
//       height: 2,
//       width: 2,
//     },
//     borderWidth: SamagraScaller({
//       value: 1,
//       scaleBy: 'average',
//     }),
//     boxShadow: '2',
//     borderRadius: SamagraScaller({
//       value: 10,
//       scaleBy: 'average',
//     }),

//     marginHorizontal: SamagraScaller({
//       value: 20,
//       scaleBy: 'average',
//     }),
//   },
// });

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
  flexHeight: number;
  isOppen: boolean;
  onClose?: () => void;
}

export const SamagraBottomSheet: React.FC<SamagraBottomSheetProps> = ({
  children,
  title,
  pannigGesture,
  flexHeight,
  isOppen,
  onClose,
}) => {
  console.log('IS PROFIE TAB', isOppen);

  const {colors} = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = isOppen ? ['90%'] : ['0%'];

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
      style={{
        borderRadius: 10,
        borderColor: colors.border,
        flex: 0.01,
        borderWidth: 1,
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
          title={title}
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
            flex: flexHeight,
          },
        ]}>
        {children()}
      </BottomSheetView>
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
