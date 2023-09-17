import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { regionsListType } from 'Types/Types';
import { RootState } from 'redux/store';
import { getRegionsList } from 'redux/thunk/SearchListThink';

type initialStateType = {
  status: string;
  value: {
    regions: regionsListType[];
  };
};

const initialState: initialStateType = {
  status: '',
  value: {
    regions: [],
  },
};

export const regionListSlice = createSlice({
  name: 'regionList',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getRegionsList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRegionsList.fulfilled, (state, action: PayloadAction<regionsListType>) => {
        state.status = 'fulfilled';
        state.value = { ...state.value, ...action.payload };
      });
  },
});

export const selectRegion = (state: RootState) => state.regionList;
export default regionListSlice.reducer;
