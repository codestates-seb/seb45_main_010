import { createAsyncThunk } from '@reduxjs/toolkit';
import { DetailType } from 'Types/Types';
import axios from 'axios';

export const getData = createAsyncThunk('getData', async () => {
  const response = await axios.get(`${URL}/regions`, {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = response.data;
  return data;
});
