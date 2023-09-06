import { User } from 'components/Types/Types';
import { FetchProfile, updateClassMethod } from 'redux/thunk/Thunk';
import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  status: string;
  value: User | null;
};

const initialState: initialStateType = {
  status: '',
  value: null,
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(FetchProfile.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(FetchProfile.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.value = action.payload;
      })
      .addCase(updateClassMethod.fulfilled, (state, action) => {
        if (state.value) {
          state.value.classMethod = action.payload;
        }
      });
  },
});

export default ProfileSlice.reducer;
