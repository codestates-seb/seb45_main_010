import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ListPageType } from 'Types/Types';
import { RootState } from 'redux/store';
import { getData } from 'redux/thunk/ListPageThunk';

type initialStateType = {
  status: string;
  value: {
    data: ListPageType[];
    pageInfo: {
      page: number;
      size: number;
      totalElements: number;
      totalPages: number;
    };
  };
};

const initialState: initialStateType = {
  status: '',
  value: {
    data: [],
    pageInfo: {
      page: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
    },
  },
};

export const teacherListSlice = createSlice({
  name: 'teacherList',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.status = 'loding';
      })
      .addCase(getData.fulfilled, (state, action: PayloadAction<ListPageType[]>) => {
        state.status = 'fulfilled';
        state.value = { ...state.value, ...action.payload };
      });
  },
});

export const teacherList = (state: RootState) => state.teacherList;
export default teacherListSlice.reducer;
