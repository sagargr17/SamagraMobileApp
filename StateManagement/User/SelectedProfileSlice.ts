import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getTokens} from '../../client/Token/TokenAccess';

export interface SelectedProfileParams {
  UserData: {
    isShopSelected: boolean;
    shop: {
      name: string;
      profileImageUrl: string;
    };
  };
}

const initialState: SelectedProfileParams = {
  UserData: {
    isShopSelected: false,
    shop: {
      name: '',
      profileImageUrl: '',
    },
  },
};

const selectedProfile = createSlice({
  name: 'SelecteProfileParams',
  initialState,
  reducers: {
    postSelectedprofile: (
      state,
      action: PayloadAction<SelectedProfileParams>,
    ) => {
      console.log('USer incoming DAta', action.payload);
      state.UserData = action.payload.UserData;
    },
  },
});

export const {postSelectedprofile} = selectedProfile.actions;
export default selectedProfile.reducer;
