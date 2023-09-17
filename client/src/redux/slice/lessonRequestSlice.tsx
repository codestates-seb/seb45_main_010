import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { lessonGetType } from 'Types/Types';
import { RootState } from 'redux/store';
import { lessonGet } from 'redux/thunk/lessonRequestThunk';

type initialStateType = {
  status: string;
  value: lessonGetType;
};

const initialState: initialStateType = {
  status: '',
  value: {
    studentId: '',
    teacherId: '',
    subjects: [],
    schedules: [{ date: [] }],
    sudentName: '',
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
      .addCase(lessonGet.pending, (state) => {
        state.status = 'loding';
      })
      .addCase(lessonGet.fulfilled, (state, action: PayloadAction<lessonGetType>) => {
        state.status = 'fulfilled';
        state.value = { ...state.value, ...action.payload };
      });
  },
});

export const lessonRequest = (state: RootState) => state.lessonRequest;

export default lessonRequestSlice.reducer;
