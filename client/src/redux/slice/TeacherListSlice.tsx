import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ListPageType } from 'components/Types/Types';
import { RootState } from 'redux/store';

type initialStateType = {
  status: string;
  value: ListPageType[];
};

const initialState: initialStateType = {
  status: '',
  value: [],
};

export const getData = createAsyncThunk('패치이름', async () => {
  const response = await axios.get('주소');
  const data = await response.data();
  return data;
});

export const teacherListSlice = createSlice({
  name: 'teacherList',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.value = action.payload;
      });
  },
});

export const teacherList = (state: RootState) => state.teacherList;

export default teacherListSlice.reducer;
