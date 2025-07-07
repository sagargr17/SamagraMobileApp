import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ImageNotFound} from '../../Constants/UI/AssetsUrls';
import {titleRange} from '../../Utilities/CustomMethods';
import {UserLocationRenderMode} from '@maplibre/maplibre-react-native';
import {ItemViewModel} from '../../src/__generated__/graphql';
import {StockScreen} from '../../Screens/Application/More/StockScreen';

interface User {
  username: string;
  pofileImageUrl?: string;
  email: 'sagar@gmail.com';
  phoneNumber: string;
  isBuyMode: boolean;
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
  Profile: User;
  isAuthenticated: boolean;
  isShopActive?: boolean;
  shopData?: ShopDetail;
  uploadedImages?: UploadedImages;
  userLocation?: UserLocation;
}

const initialState: UserState = {
  Profile: {
    username: 'SamagraUser',
    pofileImageUrl: ImageNotFound,
    email: 'sagar@gmail.com',
    phoneNumber: '9841150390',
    isBuyMode: false,
  },
  isAuthenticated: false,
  isShopActive: false,
  shopData: {
    shopId: '',
    name: 'Loading...',
    location: 'kathmanndu,Bagmati  Nepal',
  },
  userLocation: {
    address: 'Nepal, Asia',
    lat: 0,
    long: 0,
  },
  // selectedItem: {
  //   stockQuantity: 0,
  //   price: 0,
  //   dateTime: '',
  //   isProduct: false,
  //   starRating: 3,
  // },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: state => {
      state.isShopActive = false;
      state.isAuthenticated = true;
    },
    logout: state => {
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
    setShopState: (state, action: PayloadAction<boolean>) => {
      console.log('UserState', action.payload);

      state.isShopActive = action.payload;
    },

    setIsBuyMode: (state, action: PayloadAction<boolean>) => {
      state.Profile.isBuyMode = action.payload;
    },

    setUserProfile: (state, action: PayloadAction<User>) => {
      state.Profile = action.payload;
    },

    // setItemSelected: (state, action: PayloadAction<ItemViewModel>) => {
    //   state.selectedItem = action.payload;
    // },
  },
});

export const {
  login,
  logout,
  setUserShopDetail,
  setUserUploadedImage,
  setUserLocation,
  setShopState,
  setIsBuyMode,
  setUserProfile
  // setItemSelected,
} = userSlice.actions;
export default userSlice.reducer;
