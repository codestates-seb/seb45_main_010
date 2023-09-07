import { configureStore } from '@reduxjs/toolkit';
import { teacherListSlice } from './slice/TeacherListSlice';
export const store = configureStore({
  reducer: {
    teacherList: teacherListSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
