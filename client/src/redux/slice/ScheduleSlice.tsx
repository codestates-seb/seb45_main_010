import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  status: string;
  schedule: { date: string; timeslots: string[] }[] | null;
  error: string | null;
  newSchedule: { date: string; timeslots: string[] }[] | null;
  teacherId: number;
  studentId: number;
};

const initialState: initialStateType = {
  status: '',
  schedule: null,
  error: null,
  newSchedule: [],
  teacherId: 0,
  studentId: 0,
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
    setStudentId(state, action) {
      state.studentId = action.payload;
    },
  },
});

export const { setSchedule, setNewSchedule, setTeacherId, setStudentId } = ScheduleSlice.actions;

export default ScheduleSlice.reducer;
