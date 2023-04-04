import { configureStore } from '@reduxjs/toolkit';
import AuthenticationSlice from './Slice/AuthenticationSlice';
import HeaderRequestSlice from './Slice/HeaderRequestSlice';
import SavedJobSlice from './Slice/SavedJobSlice';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
  Authentication: AuthenticationSlice,
  HeaderRequest: HeaderRequestSlice,
  SavedJob: SavedJobSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);
