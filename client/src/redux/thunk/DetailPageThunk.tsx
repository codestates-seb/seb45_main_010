import { createAsyncThunk } from '@reduxjs/toolkit';
import { DetailType } from 'Types/Types';
import axios from 'axios';
import { getAccessToken } from 'components/Items/GetAccessToken';
import { URL } from 'configs/Url/config';

const token = getAccessToken();

export const getData = createAsyncThunk<DetailType, string>('getData', async (id) => {
  const response = await axios.get(`${URL}/teachers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = response.data;
  return data;
});
