import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { subjectListType } from 'Types/Types';
import { RootState } from 'redux/store';
import { getSubjectList } from 'redux/thunk/SearchListThink';

type initialStateType = {
  status: string;
  value: {
    subjects: subjectListType[];
  };
};

const initialState: initialStateType = {
  status: '',
  value: {
    subjects: [],
  },
};

export const subjectListSlice = createSlice({
  name: 'subjectList',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getSubjectList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSubjectList.fulfilled, (state, action: PayloadAction<subjectListType>) => {
        state.status = 'fulfilled';
        state.value = { ...state.value, ...action.payload };
      });
  },
});

export const selectSubject = (state: RootState) => state.subjectList;
export default subjectListSlice.reducer;
