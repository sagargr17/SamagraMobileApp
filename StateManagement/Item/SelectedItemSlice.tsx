import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getTokens} from '../../client/Token/TokenAccess';
import {ItemViewModel} from '../../src/__generated__/graphql';
import {act} from 'react';

interface SelectedItem {
  item: ItemViewModel | null;
}

const initialState: SelectedItem = {
  item: null,
};

const SelectedItemSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateSelectedItem: (state, action: PayloadAction<SelectedItem>) => {
      console.log('USer incoming ', action.payload);
      state.item = action.payload.item;
    },
    updateSelectedItemStockQuantity: (state, action: PayloadAction<number>) => {
      if (state.item?.stockQuantity && action) {
        state.item.stockQuantity = action.payload;
      }
      // state.item = action.payload.item;
    },
  },
});

export const {updateSelectedItem, updateSelectedItemStockQuantity} =
  SelectedItemSlice.actions;
export default SelectedItemSlice.reducer;
