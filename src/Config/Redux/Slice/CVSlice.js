import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cvBusiness } from '@Business';

const initialState = {
  cvList: [],
  isLoaded: false,
  loading: true
};

export const getCVList = createAsyncThunk('getCVList', async () => {
  let result = await cvBusiness.getListCV();
  return result;
});

export const CVSlice = createSlice({
  name: 'CV',
  initialState,
  reducers: {
    setCVLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCVList.fulfilled, (state, action) => {
      state.cvList = action.payload?.data?.objectData ?? [];
      if (!state.isLoaded) state.isLoaded = true;
    });
  }
});

export const { setCVLoading } = CVSlice.actions;
export default CVSlice.reducer;
