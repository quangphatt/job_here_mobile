import { createSlice } from '@reduxjs/toolkit';
import i18n from 'i18next';

const initialState = {
  headers: { ['Accept-Language']: i18n.language === 'vn' ? 'vi' : 'en' }
};

export const HeaderRequestSlice = createSlice({
  name: 'HeaderRequest',
  initialState,
  reducers: {
    changeXAuthToken: (state, action) => {
      state.headers = { ...state.headers, 'X-Auth-Token': action.payload };
    },
    changeAcceptLanguage: (state, action) => {
      state.headers = { ...state.headers, 'Accept-Language': action.payload };
    },
    changeHeaderToken: (state, action) => {
      state.headers = {
        ...state.headers,
        Authorization: 'Bearer ' + action.payload
      };
    }
  }
});

export const { changeAcceptLanguage, changeHeaderToken, changeXAuthToken } =
  HeaderRequestSlice.actions;

export default HeaderRequestSlice.reducer;
