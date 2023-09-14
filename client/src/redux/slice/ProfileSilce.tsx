import { User } from 'Types/Types';
import {
  FetchProfile,
  updateOnline,
  updateOffline,
  updateLectureFee,
  updateCareer,
  updateOption,
  updateIntroduction,
  updateRegions,
  updateSubjects,
} from 'redux/thunk/Thunk';
import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  status: string;
  value: {
    career: string;
    email: string;
    id: number;
    introduction: string;
    lectureFee: string;
    name: string;
    offLine: boolean;
    onLine: boolean;
    option: string;
    profileImg: string;
    regions: string[];
    subjects: string[];
    teacher: boolean;
    userId: number;
    matches: string[];
  };
  error: string | null;
};

const initialState: initialStateType = {
  status: '',
  value: {
    career: '',
    email: '',
    teacher: false,
    userId: 0,
    id: 0,
    introduction: '',
    lectureFee: '',
    name: '',
    offLine: false,
    onLine: false,
    option: '',
    profileImg: '',
    regions: [],
    subjects: [],
    matches: [],
  },
  error: null,
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.value.userId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(FetchProfile.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(FetchProfile.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.value = {
          ...action.payload,
          career: action.payload.teacher ? action.payload.career ?? '' : action.payload.career,
          profileImg: action.payload.teacher
            ? action.payload.profileImg ?? ''
            : action.payload.profileImg,
          lectureFee: action.payload.teacher
            ? action.payload.lectureFee ?? ''
            : action.payload.lectureFee,
          option: action.payload.option ?? '',
          introduction: action.payload.introduction ?? '',
        };
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
      .addCase(updateRegions.fulfilled, (state, action) => {
        if (state.value) {
          state.value.regions = action.payload.regions;
        }
      })
      .addCase(updateSubjects.fulfilled, (state, action) => {
        if (state.value) {
          state.value.subjects = action.payload.subjects;
        }
      })
      .addCase(updateIntroduction.fulfilled, (state, action) => {
        if (state.value) {
          state.value.introduction = action.payload.introduction;
        }
      });
  },
});
export const { setUserId } = ProfileSlice.actions;
export default ProfileSlice.reducer;
