import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getTokens} from '../../client/Token/TokenAccess';

export interface PlaceordersParams {
  itemDetails: {
    price: number;
    location: string;
    description: string;
    requiredTime: string;
    name: string;
    category: string;
    imageUrl: string;
  };
  sellerDetails: {
    fullName: string;
    address: string;
    phoneNumber: string;
  };
  orderDetail: {
    message: string;
    orderQuantity: string;
    itemID: string;
  };
}

const initialState: PlaceordersParams = {
  itemDetails: {
    price: 0,
    location: '',
    description: '',
    requiredTime: '',
    name: '',
    category: '',
    imageUrl: '',
  },
  sellerDetails: {
    fullName: '',
    address: '',
    phoneNumber: '',
  },
  orderDetail: {
    message: '',
    orderQuantity: '',
    itemID: '',
  },
};

const placeOrderParams = createSlice({
  name: 'PlaceOrderParams',
  initialState,
  reducers: {
    postPlaceOrderparams: (state, action: PayloadAction<PlaceordersParams>) => {
      console.log('USer incoming ', action.payload);
      state.itemDetails = action.payload.itemDetails;
      state.orderDetail = action.payload.orderDetail;
      state.sellerDetails = action.payload.sellerDetails;
    },
  },
});

export const {postPlaceOrderparams} = placeOrderParams.actions;
export default placeOrderParams.reducer;
