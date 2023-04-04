import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jobBusiness } from '@Business';

const initialState = {
  listSavedJob: [],
  isLoaded: false
};

export const GetAllSavedJob = createAsyncThunk('getAllSavedJob', async () => {
  let result = await jobBusiness.getAllSavedJobId();
  return result;
});

export const SavedJobSlice = createSlice({
  name: 'SavedJob',
  initialState,
  reducers: {
    SaveTemporary: (state, action) => {
      state.listSavedJob = [...state.listSavedJob, action.payload];
    },
    UnSaveTemporary: (state, action) => {
      state.listSavedJob.splice(
        state.listSavedJob.findIndex((arrow) => arrow.id === action.payload),
        1
      );
    }
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllSavedJob.fulfilled, (state, action) => {
      state.listSavedJob = action.payload?.data?.objectData?.map(
        (item) => item.jobId
      );
      if (!state.isLoaded) state.isLoaded = true;
    });
  }
});
export const { SaveTemporary, UnSaveTemporary } = SavedJobSlice.actions;
export default SavedJobSlice.reducer;
