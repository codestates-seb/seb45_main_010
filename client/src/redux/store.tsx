import { configureStore } from '@reduxjs/toolkit';
import { teacherListSlice } from './slice/TeacherListSlice';
import { ProfileSlice } from './slice/PofileSilce';
import { RequestSlice } from './slice/RequestSlice';
export const store = configureStore({
  reducer: {
    teacherList: teacherListSlice.reducer,
    profile: ProfileSlice.reducer,
    request: RequestSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
