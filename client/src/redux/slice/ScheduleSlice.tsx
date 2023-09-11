import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  status: string;
  value: { date: string; timeslots: string[] }[] | null;
  schedule: { date: string; timeslots: string[] }[] | null;
  error: string | null;
  selectedDate: { date: string; timeslots: string[] }[] | null;
  selectedTimeSlots: { date: string; timeslots: string[] }[] | null;
  newSchedule: { date: string; timeslots: string[] }[] | null;
};

const initialState: initialStateType = {
  status: '',
  value: null,
  schedule: null,
  error: null,
  selectedDate: null,
  selectedTimeSlots: [],
  newSchedule: [],
};

export const ScheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setSchedule(state, action) {
      state.schedule = action.payload;
    },
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    setSelectedTimeSlots(state, action) {
      state.selectedTimeSlots = action.payload;
    },
    setNewSchedule(state, action) {
      state.newSchedule = action.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(FetchSchedule.pending, (state, action) => {
  //       state.status = 'Loading';
  //     });
  //     builder.addCase(FetchSchedule.fulfilled, (state, action) => {
  //       state.value = action.payload;
  //       state.status = 'complete';
  //     });
  //     builder.addCase(FetchSchedule.rejected, (state, action) => {
  //       state.status = 'fail';
  //     });
  //   },
});

export const { setSchedule, setSelectedDate, setSelectedTimeSlots, setNewSchedule } =
  ScheduleSlice.actions;

export default ScheduleSlice.reducer;
