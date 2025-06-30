import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ImageNotFound} from '../../Constants/UI/AssetsUrls';
import {titleRange} from '../../Utilities/CustomMethods';
import {UserLocationRenderMode} from '@maplibre/maplibre-react-native';

interface User {
  username: string;
  pofileImageUrl?: string;
  email: 'sagar@gmail.com';
  phoneNumber: string;
}

interface UploadedImages {
  imageUrls: Array<any>;
}

interface ShopDetail {
  shopId: string;
  name: string;
  location: string;
}

interface UserLocation {
  address?: string;
  lat: number;
  long: number;
}

export interface UserState {
  user: User | null;
  isAuthenticated?: boolean | string;
  isShopActive?: boolean;
  shopData?: ShopDetail;
  uploadedImages?: UploadedImages;
  userLocation: UserLocation;
}

const initialState: UserState = {
  user: {
    username: 'SamagraUser',
    pofileImageUrl: ImageNotFound,
    email: 'sagar@gmail.com',
    phoneNumber: '9841150390',
  },
  isAuthenticated: 'loading',
  isShopActive: false,
  shopData: {
    shopId: '',
    name: 'Samagra Shop',
    location: 'kathmanndu,Bagmati  Nepal',
  },
  userLocation: {
    address: 'Nepal, Asia',
    lat: 0,
    long: 0,
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

    setUserLocation: (state, action: PayloadAction<UserLocation>) => {
      state.userLocation = action.payload;
    },
  },
});

export const {
  login,
  logout,
  setUserShopDetail,
  setUserUploadedImage,
  setUserLocation,
} = userSlice.actions;
export default userSlice.reducer;
