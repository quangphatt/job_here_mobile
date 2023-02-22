import { configureStore } from '@reduxjs/toolkit';
import AuthenticationSlice from './Slice/AuthenticationSlice';
import HeaderRequestSlice from './Slice/HeaderRequestSlice';

export const store = configureStore({
  reducer: {
    Authentication: AuthenticationSlice,
    HeaderRequest: HeaderRequestSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
