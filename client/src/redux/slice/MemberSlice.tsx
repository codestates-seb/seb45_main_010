import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CommonUserType } from 'components/Types/Types';

type initialStateType = {
  status: string;
  value: CommonUserType | null;
  error: string | null;
};

const initialState: initialStateType = {
  status: '',
  value: null,
  error: null,
};

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const { setUserDetails } = memberSlice.actions;

export default memberSlice.reducer;

export const fetchUserDetails = createAsyncThunk('member/fetchUserDetails', async () => {
  const response = await axios.get('http://localhost:8080/member');
  const data = response.data;
  console.log(data);
  return data;
});
