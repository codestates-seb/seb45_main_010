import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { CommonUserType } from 'Types/Types';

type initialStateType = {
  user: CommonUserType;
  isLoading: boolean;
  isError: boolean;
};

const initialState: initialStateType = {
  user: {
    name: '',
    email: '',
    teacher: false,
    id: null as unknown as number,
    phone: null as unknown as number,
    img: '',
  },
  isLoading: false,
  isError: false,
};

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          teacher: action.payload.teacher,
          id: action.payload.id,
          phone: action.payload.phone,
          img: action.payload.img,
        };
      })
      .addCase(fetchUserDetails.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default memberSlice.reducer;

export const fetchUserDetails = createAsyncThunk(
  'member/fetchUserDetails',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8080/member?email=${email}`);
      const data = response.data[0];
      console.log(data);
      if (!data) {
        return rejectWithValue('등록된 계정이 없거나 비밀번호가 일치하지 않습니다');
      }
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (!axiosError) {
        return rejectWithValue('서버와 통신오류가 발생했습니다. 다시 시도해주세요');
      }
      if (axiosError.response && axiosError.response.status)
        // return rejectWithValue('서버와 통신오류' + axiosError.response.status);
        return rejectWithValue('서버와 통신오류가 발생했습니다. 다시 시도해주세요');
    }
    return rejectWithValue('서버와 통신오류가 발생했습니다. 다시 시도해주세요');
  }
);
