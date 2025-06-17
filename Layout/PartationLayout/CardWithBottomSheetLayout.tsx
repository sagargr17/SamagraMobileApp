import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatListProps, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { AppText } from '../../Components/Elements/AppText';
import { AppBottomSheet } from '../../Components/Molecules/Global/AppBottomSheet';
interface CardWithBottomSheetLayoutProps<ItemT> extends FlatListProps<ItemT> {
  data: ArrayLike<any> | null | undefined;
  headerComponnet: React.ReactNode;
  listComponent: React.ReactNode;
  headerTitle: string;
  onHeaderPressed: () => void;
}

export const CardWithBottomSheetLayout = <ItemT,>({
  headerComponnet,
  data,
  headerTitle,
  listComponent,
  ...rest
}: CardWithBottomSheetLayoutProps<ItemT>) => {
  const {colors} = useTheme();
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  return (
    <>
      <View style={[style.wrapper]}>
        {/*This is the layout of the Item Screenn  */}
        <TouchableOpacity
          style={{
            marginVertical: 10,
          }}
          onPress={() => {
            setIsListOpen(!isListOpen);
          }}>
          <AppText
            customStyle={{
              color: colors.text,
            }}
            title="Rating and Reviews"
            fontSizeVariant={'regular'}
            fontVariant="medium"></AppText>
        </TouchableOpacity>
        {headerComponnet}
      </View>

      {isListOpen ? (
        <AppBottomSheet
          onClose={() => {}}
          customStyle={{
            zIndex: 200,
            padding: 0,
          }}
          isOppen={isListOpen}
          pannigGesture={true}
          flexHeight={1}
          title="Reviews"
          children={() => (
            <FlatList data={data} {...rest}></FlatList>
          )}></AppBottomSheet>
      ) : null}
    </>
  );
};

const style = StyleSheet.create({
  wrapper: {
    marginHorizontal: 12,
  },
});
