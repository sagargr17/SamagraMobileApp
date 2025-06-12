import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getTokens} from '../../client/Token/TokenAccess';

export interface SentordersParams {
  itemParams: {
    location: string;
    description: string;
    requiredTime: string;
    name: string;
    category: string;
  };
}

const initialState: SentordersParams = {
  itemParams: {
    location: '',
    description: '',
    requiredTime: '',
    name: '',
    category: '',
  },
};

const sentOrderParams = createSlice({
  name: 'sentOrderParams',
  initialState,
  reducers: {
    postOrderparams: (state, action: PayloadAction<SentordersParams>) => {
      console.log('USer incoming DAta', action.payload);
      state.itemParams = action.payload.itemParams;
    },
  },
});

export const {postOrderparams} = sentOrderParams.actions;
export default sentOrderParams.reducer;
