import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {AppText} from '../../../Components/Elements/AppText';
import {ListCard} from '../../../Components/Molecules/Cards/ListCard';
import {useAppDispatch, useAppSelector} from '../../../StateManagement/hooks';
import {
  ImageNotFound,
  ItemImageNotFound,
} from '../../../Constants/UI/AssetsUrls';
import {NotMentioned} from '../../../Constants/UI/Messages';
import App from '../../../App';
import {Spacer} from '../../../Components/Elements/Spacer';
import {responseTheme, size} from '../../../Prefrences/Prefrences';
import {RowFlexLayout} from '../../../Layout/PartationLayout/RowFlexLayout';
import {AppForm} from '../../../Components/Organism/AppForm';
import {AreaMapper, titleRange} from '../../../Utilities/CustomMethods';
import {useMutation} from '@apollo/client';
import {updateStock} from '../../../GraphQL/Mutation/ItemMutation';
import {showMessage} from 'react-native-flash-message';
import {
  updateSelectedItem,
  updateSelectedItemStockQuantity,
} from '../../../StateManagement/Item/SelectedItemSlice';
interface StockUpdateScreenProps {}

interface updateStock {
  updateStock: number;
}

export const StockUpdateScreen: React.FC<StockUpdateScreenProps> = ({}) => {
  const {colors} = useTheme();
  const selectedItem = useAppSelector(state => state.selectedItems?.item);
  const [updateStockFn, {loading}] = useMutation(updateStock);
  const dispatch = useAppDispatch();

  console.log('Selected ITem', selectedItem);

  const hadleUpdateQuantity = async (data: updateStock) => {
    console.log(data.updateStock, selectedItem?.id);
    try {
      let response = await updateStockFn({
        variables: {
          itemId: selectedItem?.id ?? NotMentioned,
          updatedQuantity: Number(data.updateStock),
        },
      });

      if (response.data) {
        showMessage(
          responseTheme(
            'SuccessFully Stock Updated!!',
            'People Will be view your new stock',
            'success',
          ),
        );

        dispatch(updateSelectedItemStockQuantity(data.updateStock));
      }
    } catch (e) {
      console.log('Erorr', e);
      showMessage(
        responseTheme(
          'Response not successFull',
          'Please Try Again!',
          'danger',
        ),
      );
    }
  };

  const header = (
    <View>
      <AppText
        title="Product Details"
        fontSizeVariant="display"
        fontVariant="heavy"></AppText>
      {selectedItem ? (
        <ListCard
          id={selectedItem.id ?? NotMentioned}
          imageUrl={selectedItem.imageUrls?.[0] ?? ItemImageNotFound}
          list={[
            {
              value: selectedItem.name ?? NotMentioned,
              type: 'title',
              fontVariant: 'medium',
            },
            {
              value: `Rs.${selectedItem.price ?? NotMentioned}${
                selectedItem.unit ?? '/Pcs'
              }`,
              type: 'regular',
              fontVariant: 'regular',
            },
            {
              value: `${titleRange(selectedItem.description ?? NotMentioned)}`,
              type: 'regular',
              fontVariant: 'regular',
            },
          ]}
        />
      ) : null}
    </View>
  );

  const body = (
    <View>
      <AppText
        title="Stock Management"
        fontVariant="heavy"
        fontSizeVariant="display"></AppText>
      <Spacer height={20}></Spacer>
      <RowFlexLayout>
        <AppText
          title="Current Stock"
          fontVariant="regular"
          fontSizeVariant="title"></AppText>
        <AppText
          title={`${selectedItem?.stockQuantity ?? '20'}`}
          fontVariant="heavy"
          fontSizeVariant="title"
          customStyle={{
            color: colors.primary,
          }}></AppText>
      </RowFlexLayout>
    </View>
  );

  const tail = (
    <View>
      <Spacer height={12}></Spacer>

      <AppForm<updateStock>
        formConfig={[
          {
            label: 'Add or Remove Stock',
            type: 'number',
            name: 'updateStock',
            rules: {
              required: 'Please Update the Stock',
            },
            placeholder: 'Enter Quantity',
          },
        ]}
        disabled={loading ? true : false}
        submitButtonText={loading ? 'Loading...' : 'Update Stock'}
        onFormSubmit={hadleUpdateQuantity}
        customBottonPositionStyle={{
          marginTop: size.spacing.xxs,
        }}></AppForm>
    </View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        paddingHorizontal: size.spacing.xs,
      }}>
      {header}
      {body}
      {tail}
    </ScrollView>
  );
};
