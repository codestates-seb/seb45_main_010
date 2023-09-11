import { configureStore } from '@reduxjs/toolkit';
import { teacherListSlice } from './slice/TeacherListSlice';
import { ProfileSlice } from './slice/PofileSilce';
import { RequestSlice } from './slice/RequestSlice';
import { memberSlice } from './slice/MemberSlice';
import { ScheduleSlice } from './slice/ScheduleSlice';
export const store = configureStore({
  reducer: {
    teacherList: teacherListSlice.reducer,
    profile: ProfileSlice.reducer,
    request: RequestSlice.reducer,
    member: memberSlice.reducer,
    schedule: ScheduleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
