import { createSlice } from '@reduxjs/toolkit';
import { FetchSchedule, updateSchedule } from 'redux/thunk/Thunk';
import { ScheduleType, ScheduleObjType } from 'Types/Types';

type initialStateType = {
  status: string;
  schedule: ScheduleObjType;
  error: string | undefined;
  newSchedule: ScheduleType[];
  teacherId: number;
};

const initialState: initialStateType = {
  status: '',
  schedule: { teacherId: 0, schedules: [] },
  error: undefined,
  newSchedule: [],
  teacherId: 0,
};

export const ScheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setSchedule(state, action) {
      state.schedule = action.payload;
    },
    setNewSchedule(state, action) {
      state.newSchedule = action.payload;
    },
    setTeacherId(state, action) {
      state.teacherId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchSchedule.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(FetchSchedule.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.schedule = action.payload;
      })
      .addCase(FetchSchedule.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        console.log('Payload:', action.payload);
        console.log('State before:', state.schedule);

        state.status = 'fulfilled';
        state.schedule = action.payload;

        console.log('State after:', state.schedule);
      });
  },
});

export const { setSchedule, setNewSchedule, setTeacherId } = ScheduleSlice.actions;

export default ScheduleSlice.reducer;
