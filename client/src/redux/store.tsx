import { configureStore } from '@reduxjs/toolkit';
import { teacherListSlice } from './slice/ListPageSlice';
import { ProfileSlice } from './slice/PofileSilce';
import { RequestSlice } from './slice/RequestSlice';
import { memberSlice } from './slice/MemberSlice';
import { teacherDetailSlice } from './slice/DetailPageSlice';
import { ScheduleSlice } from './slice/ScheduleSlice';
import { TeacherSlice } from './slice/TeacherSlice';

export const store = configureStore({
  reducer: {
    teacherList: teacherListSlice.reducer,
    profile: ProfileSlice.reducer,
    request: RequestSlice.reducer,
    member: memberSlice.reducer,
    teacherDetail: teacherDetailSlice.reducer,
    schedule: ScheduleSlice.reducer,
    teacher: TeacherSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
