import { createAsyncThunk } from '@reduxjs/toolkit';
import { ListPageType } from 'Types/Types';
import axios from 'axios';
import { URL } from 'configs/Url/config';

export const getData = createAsyncThunk('getData', async () => {
  const response = await axios.get(`${URL}/teachers?teacherName=&page=1&size=10`);
  const data = response.data;
  return data;
});
