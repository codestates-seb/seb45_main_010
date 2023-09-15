import { createSlice } from '@reduxjs/toolkit';
import { FetchRequestInfo, updateRequestStatus } from 'redux/thunk/RequestThunks';
import { RequestInfoType } from 'Types/Types';

type initialStateType = {
  status: string;
  value: RequestInfoType;
};

const initialState: initialStateType = {
  status: '',
  value: {
    id: 0,
    studentId: 0,
    teacherId: 0,
    status: '',
    matchSubjects: [],
    matchRegions: [],
    date: '',
    timeslot: '',
    studentName: '',
    studentPhone: '',
    studentEmail: '',
    remarks: '',
    teacherName: '',
    online: false,
  },
};

export const RequestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(FetchRequestInfo.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(FetchRequestInfo.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.value = action.payload;
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        state.value.status = action.payload.status;
      });
  },
});

export default RequestSlice.reducer;
