import { createAsyncThunk } from '@reduxjs/toolkit';
import { DetailType } from 'Types/Types';
import axios from 'axios';
import { URL } from 'configs/Url/config';

export const getData = createAsyncThunk<DetailType, string>('getData', async (id) => {
  const response = await axios.get(`${URL}/teachers/${id}`);
  const data = response.data;
  return data;
});
