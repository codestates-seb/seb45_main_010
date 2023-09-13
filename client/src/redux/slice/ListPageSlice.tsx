import { createSlice } from '@reduxjs/toolkit';
import { ListPageType } from 'Types/Types';
import { RootState } from 'redux/store';
import { getData } from 'redux/thunk/ListPageThunk';

type initialStateType = {
  status: string;
  value: ListPageType[];
};

const initialState: initialStateType = {
  status: '',
  value: [],
};

export const teacherListSlice = createSlice({
  name: 'teacherList',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.status = 'loding';
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.value = action.payload;
      });
  },
});

export const teacherList = (state: RootState) => state.teacherList;

export default teacherListSlice.reducer;
