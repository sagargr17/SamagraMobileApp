import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getTokens} from '../../client/Token/TokenAccess';
import {ImageNotFound} from '../../Constants/UI/AssetsUrls';
import {ActionSheetIOS, ActivityIndicatorComponent} from 'react-native';

interface User {
  username: string;
  pofileImageUrl?: string;
  email: 'sagar@gmail.com';
  location: string;
}

interface ShopDetail {
  name: string;
  location: string;
}

export interface UserState {
  user?: User | null;
  isAuthenticated: boolean | string;
  isShopActive?: boolean;
  shopData?: ShopDetail;
}

const initialState: UserState = {
  user: {
    username: 'SamagraUser',
    pofileImageUrl: ImageNotFound,
    email: 'sagar@gmail.com',
    location: 'Butwal',
  },
  isAuthenticated: 'loading',
  isShopActive: false,
  shopData: {
    name: 'Samagra Shop',
    location: 'Butwal',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      console.log('USer incoming DAta', action.payload);
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
    },

    setUserShopDetail: (state, action: PayloadAction<ShopDetail>) => {
      state.isShopActive = true;
      state.shopData = action.payload;
    },
  },
});

export const {login, logout, setUserShopDetail} = userSlice.actions;
export default userSlice.reducer;
