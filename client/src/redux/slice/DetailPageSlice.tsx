import { createSlice } from '@reduxjs/toolkit';
import { DetailType } from 'Types/Types';
import { RootState } from 'redux/store';
import { getData } from 'redux/thunk/DetailPageThunk';

type initialStateType = {
  status: string;
  value: DetailType;
};

const initialState: initialStateType = {
  status: '',
  value: {
    id: 0,
    email: '',
    name: '',
    teacher: false,
    phone: '',
    profileImg: '',
    introduction: '',
    career: '',
    lectureFee: '',
    option: '',
    onLine: false,
    offLine: false,
    subjects: [],
    regions: [],
    schedule: [],
  },
};

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
