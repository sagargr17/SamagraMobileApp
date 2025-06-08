{
  /* 
    This is the Layout where the screen will be get Scrolled and also  if data is fetched then there will 
  */
}

import {useQuery} from '@apollo/client';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {FlatList, FlatListProps, Text} from 'react-native';
import {TextComponet} from '../../Components/Elements/TextComponet';
import {SectionHeader} from '../../Components/Molecules/Global/SectionHeader';
import {size} from '../../Prefrences/Prefrences';
interface FlatListScreenProps<ItemT> extends FlatListProps<ItemT> {
  headerComponent?: React.ReactNode;
  footerCompoent?: React.ReactElement;
  isSectioHeader?: boolean;
  headerTitle?: string;
}

export const FlatListScreen = <ItemT,>({
  headerComponent,
  footerCompoent,
  isSectioHeader,
  headerTitle,
  ...rest
}: FlatListScreenProps<ItemT>) => {
  const {colors} = useTheme();

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            {headerComponent}
            {isSectioHeader && headerTitle ? (
              <SectionHeader
                style={{
                  fontSize: size.spacing.m,
                  paddingVertical: size.spacing.m,
                  paddingHorizontal: size.spacing.xxs,
                }}
                title={headerTitle}
                isIcon={false}
                onPress={() => console.log('>>')}></SectionHeader>
            ) : null}
          </>
        )}
        {...rest}
      />
    </>
  );
};
