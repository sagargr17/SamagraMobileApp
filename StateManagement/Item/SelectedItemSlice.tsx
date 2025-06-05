// import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {getTokens} from '../../client/Token/TokenAccess';

// interface User {
//   item: {
//     primary: {
//       itemName: string;
//     };
//   };
// }

// export interface UserState {
//   user?: User | null;
//   isAuthenticated: boolean | string;
// }

// const initialState: UserState = {
//   user: {
//     username: 'SamagraUser',
//     pofileImageUrl:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     email: 'sagar@gmail.com',
//     location: 'Butwal',
//   },
//   isAuthenticated: 'loading',
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<UserState>) => {
//       console.log('USer incoming DAta', action.payload);
//       state.user = action.payload.user;
//       state.isAuthenticated = true;
//     },
//     logout: state => {
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const {login, logout} = userSlice.actions;
// export default userSlice.reducer;
