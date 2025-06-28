import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ImageNotFound} from '../../Constants/UI/AssetsUrls';
import {titleRange} from '../../Utilities/CustomMethods';

interface User {
  username: string;
  pofileImageUrl?: string;
  email: 'sagar@gmail.com';
  location: string;
  phoneNumber:string
}

interface UploadedImages {
  imageUrls: Array<any>;
}

interface ShopDetail {
  shopId: string;
  name: string;
  location: string;
}

export interface UserState {
  user?: User | null;
  isAuthenticated?: boolean | string;
  isShopActive?: boolean;
  shopData?: ShopDetail;
  uploadedImages?: UploadedImages;
}

const initialState: UserState = {
  user: {
    username: 'SamagraUser',
    pofileImageUrl: ImageNotFound,
    email: 'sagar@gmail.com',
    location: titleRange('Kathmanndu,Bagmati Nepal'),
    phoneNumber:"9841150390"
  },
  isAuthenticated: 'loading',
  isShopActive: false,
  shopData: {
    shopId: '',
    name: 'Samagra Shop',
    location: 'kathmanndu,Bagmati  Nepal',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.isShopActive = false;
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

    setUserUploadedImage: (state, action: PayloadAction<UploadedImages>) => {
      state.uploadedImages = action.payload;
    },
  },
});

export const {login, logout, setUserShopDetail, setUserUploadedImage} =
  userSlice.actions;
export default userSlice.reducer;
