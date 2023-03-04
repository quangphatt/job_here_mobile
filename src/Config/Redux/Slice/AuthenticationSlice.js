import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionInfo: null
};

export const AuthenticationSlice = createSlice({
  name: 'Authentication',
  initialState,
  reducers: {
    changeSession: (state, action) => {
      state.sessionInfo = action.payload;
    },
    logOut: (state) => {
      state.sessionInfo = null;
    }
  }
});

export const { changeSession, logOut } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
