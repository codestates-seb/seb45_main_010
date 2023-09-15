import { FetchRequest } from 'redux/thunk/ProfilePageThunk';
import { createSlice } from '@reduxjs/toolkit';
import { updateRequestStatus } from 'redux/thunk/RequestThunks';
import { RequestInfoType } from 'Types/Types';

type initialStateType = {
  status: string;
  value: RequestInfoType[];
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
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        const match = state.value.find((item) => item.id === action.payload.id);
        if (match) {
          match.status = action.payload.status;
        }
      });
  },
});

export default RequestSlice.reducer;
