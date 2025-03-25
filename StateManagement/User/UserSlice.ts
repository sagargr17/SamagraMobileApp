import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getTokens} from '../../Client/Token/TokenAccess';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
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
      console.log('USER GETS LOGINNNNNNN');
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
