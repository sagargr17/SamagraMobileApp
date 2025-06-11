import {configureStore} from '@reduxjs/toolkit';
import userReducer from './User/UserSlice';
import loaderReducer from './Error&loadingHandle/LoaderStateSlice';
import sentOrderParamsReducer from './Orders/SentOrderParameters';

export const store = configureStore({
  reducer: {
    user: userReducer,
    loader: loaderReducer,
    sentOrderParams: sentOrderParamsReducer,
  },
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
