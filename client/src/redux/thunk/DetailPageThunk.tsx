import { createAsyncThunk } from '@reduxjs/toolkit';
import { DetailType } from 'Types/Types';
import axios from 'axios';
import { getAccessToken } from 'components/Items/GetAccessToken';
import { URL } from 'configs/Url/config';

const token = getAccessToken();
console.log(token);

export const getData = createAsyncThunk<DetailType, string>('getData', async (id) => {
  const response = await axios.get(`${URL}/teachers/${id}`);
  const data = response.data;
  return data;
});
