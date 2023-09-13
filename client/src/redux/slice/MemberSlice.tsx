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
    id: undefined as unknown as number,
    phone: undefined as unknown as number,
    img: undefined as unknown as string,
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
          phone: action.payload.phoneNumber,
          img: action.payload.profileImg,
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
  async ({ id, teacher }, { rejectWithValue }) => {
    try {
      const apiURL = 'http://ec2-3-34-116-209.ap-northeast-2.compute.amazonaws.com:8080';
      const response = await axios.get(
        `${apiURL}/${teacher === 'STUDENT' ? 'teachers' : 'students'}/${id}`
      );
      console.log(response);
      const data = response.data;
      console.log(data);
      if (!data) {
        return rejectWithValue('등록된 계정이 없거나 비밀번호가 일치하지 않습니다');
      }
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (!axiosError) {
        return rejectWithValue(
          '고객정보를 받아오는 중에 통신오류가 발생했습니다. 다시 시도해주세요'
        );
      }
      if (axiosError.response && axiosError.response.status)
        // return rejectWithValue('서버와 통신오류' + axiosError.response.status);
        return rejectWithValue('서버와 통신오류가 발생했습니다. 다시 시도해주세요');
    }
    return rejectWithValue('서버와 통신오류가 발생했습니다. 다시 시도해주세요');
  }
);
