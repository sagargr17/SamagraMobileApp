import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getTokens} from '../../client/Token/TokenAccess';

export interface SentordersParams {
  location: string;
  description: string;
  requiredTime: string;
  name: string;
  category: string;
  id?: string;
}

const initialState: SentordersParams = {
  location: '',
  description: '',
  requiredTime: '',
  name: '',
  category: '',
  id: '',
};

const sentOrderParams = createSlice({
  name: 'sentOrderParams',
  initialState,
  reducers: {
    postOrderparams: (state, action: PayloadAction<SentordersParams>) => {
      console.log('USer incoming DAta', action.payload);
      state = action.payload;
    },
  },
});

export const {postOrderparams} = sentOrderParams.actions;
export default sentOrderParams.reducer;
