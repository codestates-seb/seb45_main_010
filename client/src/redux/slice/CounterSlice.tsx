import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'redux/store';

type CounterState = {
  status: string;
  value: number;
};

const initialState: CounterState = {
  status: '',
  value: 0,
};

export const getData = createAsyncThunk('패치이름', async () => {
  const response = await axios.get('주소');
  const data = await response.data();
  return data;
});

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.status = 'increment';
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },

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

export const abcd = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter;

export default counterSlice.reducer;
