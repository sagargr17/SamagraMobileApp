import {configureStore} from '@reduxjs/toolkit';
import userReducer from './User/UserSlice';
import loaderReducer from './Error&loadingHandle/LoaderStateSlice';
import errorReducer from './Error&loadingHandle/ErrorHandlingSlice';
import sentOrderParamsReducer from './Orders/SentOrderParams';
import placeOrderParamsReducer from './Orders/PlaceOrderDetailsParams';
import selectedItemReducer from './Item/SelectedItemSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    loader: loaderReducer,
    sentOrderParams: sentOrderParamsReducer,
    placeOrderParams: placeOrderParamsReducer,
    selectedItems: selectedItemReducer,
    error: errorReducer,
  },
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
