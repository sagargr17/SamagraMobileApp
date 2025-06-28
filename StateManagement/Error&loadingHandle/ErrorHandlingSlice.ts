import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ErrorHandlingState {
  error: {
    isErorr: boolean;
    type?: 'graphQLErrors' | 'protocolErrors' | 'networkError';
    message?: string;
  };
}

const initialState: ErrorHandlingState = {
  error: {
    isErorr: false,
  },
};

const ErrorHandlingSlice = createSlice({
  name: 'Error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorHandlingState>) => {
      state.error = action.payload.error;
    },
    removeError: state => {
      state.error.isErorr = false;
    },
  },
});

export const {setError, removeError} = ErrorHandlingSlice.actions;
export default ErrorHandlingSlice.reducer;
