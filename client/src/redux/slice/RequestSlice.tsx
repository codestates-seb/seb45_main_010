import { createSlice } from '@reduxjs/toolkit';
import { FetchRequestInfo, updateRequestStatus } from 'redux/thunk/RequestThunks';
import { RequestInfoType } from 'Types/Types';
import { PayloadAction } from '@reduxjs/toolkit';

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
    status: 'MATCH_REQUEST',
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
  reducers: {
    setTeacherId: (
      state,
      action: PayloadAction<{ id: number; teacherId: number; teacherName: string }>
    ) => {
      state.value.teacherId = action.payload.teacherId;
      state.value.id = action.payload.id;
      state.value.teacherName = action.payload.teacherName;
    },
    resetRequests: (state) => {
      state.value = initialState.value;
      state.status = '';
    },
  },

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
