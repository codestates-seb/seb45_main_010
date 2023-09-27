import { configureStore } from '@reduxjs/toolkit';
import { teacherListSlice } from './slice/ListPageSlice';
import { ProfileSlice } from './slice/ProfileSilce';
import { RequestSlice } from './slice/RequestSlice';
import { memberSlice } from './slice/MemberSlice';
import { teacherDetailSlice } from './slice/DetailPageSlice';
import { ScheduleSlice } from './slice/ScheduleSlice';
import { subjectListSlice } from './slice/SubjectSlice';
import { regionListSlice } from './slice/RegionsSlice';
import { CategoriesSlice } from './slice/CategoriesSlice';
import { oAuthSlice } from './slice/OauthSlice';
import { lessonRequestSlice } from './slice/lessonRequestSlice';

export const store = configureStore({
  reducer: {
    teacherList: teacherListSlice.reducer,
    profile: ProfileSlice.reducer,
    request: RequestSlice.reducer,
    member: memberSlice.reducer,
    teacherDetail: teacherDetailSlice.reducer,
    schedule: ScheduleSlice.reducer,
    subjectList: subjectListSlice.reducer,
    regionList: regionListSlice.reducer,
    categories: CategoriesSlice.reducer,
    auth: oAuthSlice.reducer,
    lessonRequest: lessonRequestSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
