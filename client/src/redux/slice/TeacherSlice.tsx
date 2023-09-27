import {
  FetchProfile,
  updateOnline,
  updateOffline,
  updateLectureFee,
  updateCareer,
  updateOption,
  updateIntroduction,
} from 'redux/thunk/ProfilePageThunk';
import { createSlice } from '@reduxjs/toolkit';

// type initialStateType = {
//   status: string;
//   value: {
//     address: string | null;
//     career: string | null;
//     email: string;
//     id: number;
//     introduction: string;
//     lastLogin: Date | null;
//     lastModified: Date | null;
//     lectureFee: number | null;
//     name: string;
//     oauth: boolean;
//     offLine: boolean;
//     onLine: boolean;
//     option: string | null;
//     phone: string | null;
//     profileImg: string | null;
//     regions: string[];
//     subjects: string[];
//   };
//   error: string | null;
// };

const initialState = {
  status: '',
  value: {
    address: null,
    career: null,
    email: '',
    id: 0,
    introduction: '',
    // lastLogin: Date | null;
    // lastModified: Date | null;
    lectureFee: '',
    name: '',
    // oauth: boolean;
    offLine: false,
    onLine: false,
    option: '',
    phone: '',
    profileImg: '',
    regions: [],
    subjects: [],
  },
  error: null,
};

export const TeacherSlice = createSlice({
  name: 'teacher',
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
      .addCase(updateOnline.fulfilled, (state, action) => {
        if (state.value) {
          state.value.onLine = action.payload;
        }
      })
      .addCase(updateOffline.fulfilled, (state, action) => {
        if (state.value) {
          state.value.offLine = action.payload;
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
      .addCase(updateIntroduction.fulfilled, (state, action) => {
        if (state.value) {
          state.value.introduction = action.payload.introduce;
        }
      });
  },
});

export default TeacherSlice.reducer;
