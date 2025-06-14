import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getTokens} from '../../client/Token/TokenAccess';

export interface PlaceordersParams {
  itemParams: {
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
    shopName: string;
    phoneNumber: string;
  };
  orderDetail: {
    message: string;
    orderQuantity: string;
    itemID: string;
  };
}

const initialState: PlaceordersParams = {
  itemParams: {
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
    shopName: '',
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
      state.itemParams = action.payload.itemParams;
      state.orderDetail = action.payload.orderDetail;
      state.sellerDetails = action.payload.sellerDetails;
    },
  },
});

export const {postPlaceOrderparams} = placeOrderParams.actions;
export default placeOrderParams.reducer;
