import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CommonUserType } from 'components/Types/Types';

const initialState: CommonUserType = {
  name: '',
  email: '',
  teacher: false,
  id: null as unknown as number,
  phone: null as unknown as number,
  img: '',
};

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<CommonUserType>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setUserInfo } = memberSlice.actions;
export default memberSlice.reducer;

export const fetchUserDetails = createAsyncThunk('member/fetchUserDetails', async () => {
  const response = await axios.get('http://localhost:8080/member');
  const data = response.data;
  console.log(data);
  return data;
});
