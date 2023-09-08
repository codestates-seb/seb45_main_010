import { RequestType } from 'Types/Types';
import { FetchRequest } from 'redux/thunk/Thunk';
import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  status: string;
  value: RequestType[];
};

const initialState: initialStateType = {
  status: '',
  value: [],
};

export const RequestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(FetchRequest.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(FetchRequest.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.value = action.payload;
      });
  },
});

export default RequestSlice.reducer;
