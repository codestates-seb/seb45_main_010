import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DetailType } from 'Types/Types';
import { RootState } from 'redux/store';

type initialStateType = {
  status: string;
  value: DetailType;
};

const initialState: initialStateType = {
  status: '',
  value: {
    name: '',
    img: '',
    classMethod: {
      onLine: false,
      offLine: false,
    },
    category: [],
    area: [],
    date: {
      select: {
        ['date']: ['time'],
      },
    },
    introduce: '',
    lectureFee: '',
    career: '',
  },
};

export const getData = createAsyncThunk('패치이름', async () => {
  const response = await axios.get('주소');
  const data = await response.data();
  return data;
});

export const teacherDetailSlice = createSlice({
  name: 'teacherDetail',
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

export const teacherDetail = (state: RootState) => state.teacherDetail;

export default teacherDetailSlice.reducer;
