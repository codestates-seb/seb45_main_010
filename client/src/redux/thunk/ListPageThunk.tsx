import { createAsyncThunk } from '@reduxjs/toolkit';
import { ListPageType } from 'Types/Types';
import axios from 'axios';
import { URL } from 'configs/Url/config';

export const getData = createAsyncThunk('getData', async () => {
  const response = await axios.get(`${URL}/regions`, {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = response.data;
  return data;
});
