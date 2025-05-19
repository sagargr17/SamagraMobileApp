import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getTokens} from '../../client/Token/TokenAccess';

interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean | string;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: 'loading',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      // state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;
