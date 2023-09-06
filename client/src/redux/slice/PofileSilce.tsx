import { User } from 'components/Types/Types';
import {
  FetchProfile,
  updateClassMethod,
  updateLectureFee,
  updateCareer,
  updateOption,
  updateIntroduce,
} from 'redux/thunk/Thunk';
import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  status: string;
  value: User | null;
  error: string | null;
};

const initialState: initialStateType = {
  status: '',
  value: null,
  error: null,
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(FetchProfile.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(FetchProfile.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.value = action.payload;
      })
      .addCase(updateClassMethod.fulfilled, (state, action) => {
        if (state.value) {
          state.value.classMethod = action.payload;
        }
      })
      .addCase(updateLectureFee.fulfilled, (state, action) => {
        if (state.value) {
          state.value.lectureFee = action.payload.lectureFee;
        }
      })
      .addCase(updateCareer.fulfilled, (state, action) => {
        if (state.value) {
          state.value.career = action.payload.career;
        }
      })
      .addCase(updateOption.fulfilled, (state, action) => {
        if (state.value) {
          state.value.option = action.payload.option;
        }
      })
      .addCase(updateIntroduce.fulfilled, (state, action) => {
        if (state.value) {
          state.value.introduce = action.payload.introduce;
        }
      });
  },
});

export default ProfileSlice.reducer;
