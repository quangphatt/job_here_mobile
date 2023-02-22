import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionInfo: null,
  token: ''
};

export const AuthenticationSlice = createSlice({
  name: 'Authentication',
  initialState,
  reducers: {
    changeSession: (state, action) => {
      state.sessionInfo = action.payload;
    },
    changeToken: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state) => {
      state.sessionInfo = null;
      state.token = '';
    }
  }
});

export const { changeSession, changeToken, logOut } =
  AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
