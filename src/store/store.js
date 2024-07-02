import { configureStore } from '@reduxjs/toolkit';
import userReducer from './states/userSlice';
import { authApi } from './states/authApi';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

