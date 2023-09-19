import { FetchRegions, FetchSubjects } from 'redux/thunk/ProfilePageThunk';
import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  status: string;
  value: {
    id: number;
    regions: { id: number; regionName: string }[];
    subjects: { id: number; subjectName: string }[];
  };
};

const initialState: initialStateType = {
  status: '',
  value: {
    id: 0,
    regions: [],
    subjects: [],
  },
};

export const CategoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(FetchSubjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchSubjects.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.value.subjects = action.payload;
      })
      .addCase(FetchRegions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchRegions.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.value.regions = action.payload;
      });
  },
});

export default CategoriesSlice.reducer;
