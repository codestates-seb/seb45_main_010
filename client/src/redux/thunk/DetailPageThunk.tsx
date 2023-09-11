import { createAsyncThunk } from '@reduxjs/toolkit';
import { DetailType } from 'Types/Types';
import axios from 'axios';

export const getData = createAsyncThunk<DetailType>('', async () => {
  const response = await axios.get('');
  const data = await response.data();
  return data;
});
