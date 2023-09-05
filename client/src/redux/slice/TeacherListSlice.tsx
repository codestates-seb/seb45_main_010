import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { initialStateType } from 'components/Type/User';
import { RootState } from 'redux/store';

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
