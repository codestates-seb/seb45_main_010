import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { lessonGetType } from 'Types/Types';
import { RootState } from 'redux/store';
import { lessonRequestGet } from 'redux/thunk/lessonRequestThunk';

type initialStateType = {
  status: string;
  value: lessonGetType;
};

const initialState: initialStateType = {
  status: '',
  value: {
    studentId: 0,
    teacherId: 0,
    subjects: [],
    regions: [],
    date: '',
    timeslot: '',
    studentName: '',
    studentPhone: '',
    studentEmail: '',
  },
};

export const lessonRequestSlice = createSlice({
  name: 'lessonRequest',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(lessonRequestGet.pending, (state) => {
        state.status = 'loding';
      })
      .addCase(lessonRequestGet.fulfilled, (state, action: PayloadAction<lessonGetType>) => {
        state.status = 'fulfilled';
        state.value = { ...state.value, ...action.payload };
      });
  },
});

export const lessonRequest = (state: RootState) => state.lessonRequest;

export default lessonRequestSlice.reducer;
