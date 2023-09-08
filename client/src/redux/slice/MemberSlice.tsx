import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        teacher: action.payload.teacher,
        id: action.payload.id,
        phone: action.payload.phone,
        img: action.payload.img,
      };
    });
  },
});

export default memberSlice.reducer;

export const fetchUserDetails = createAsyncThunk(
  'member/fetchUserDetails',
  async (email: string) => {
    const response = await axios.get(`http://localhost:8080/member?email=${email}`);
    const data = response.data[0];
    console.log(data);
    return data;
  }
);
