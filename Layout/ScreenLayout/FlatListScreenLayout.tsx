{
  /* 
    This is the Layout where the screen will be get Scrolled and also  if data is fetched then there will 
    This will be update where data will be automatically render
  */
}

import {useQuery} from '@apollo/client';
import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, FlatListProps, Text} from 'react-native';
import {AppTextElement} from '../../Components/Elements/AppTextElement';
import {SectionHeaderMolecule} from '../../Components/Molecules/Global/SectionHeaderMolecule';
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
              <SectionHeaderMolecule
                style={{
                  fontSize: size.spacing.m,
                  paddingVertical: size.spacing.xs,
                  paddingHorizontal: size.spacing.xxs,
                }}
                title={headerTitle}
                isIcon={false}
                onPress={() => console.log('>>')}></SectionHeaderMolecule>
            ) : null}
          </>
        )}
        {...rest}
      />
    </>
  );
};
