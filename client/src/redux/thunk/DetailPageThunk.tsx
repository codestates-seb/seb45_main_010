import { createAsyncThunk } from '@reduxjs/toolkit';
import { DetailType } from 'Types/Types';
import axios from 'axios';
import { URL } from 'configs/Url/config';

export const getData = createAsyncThunk('getData', async () => {
  const response = await axios.get(`${URL}/teachers/${1}`);
  const data = response.data;
  return data;
});
