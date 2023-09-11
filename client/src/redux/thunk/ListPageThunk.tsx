import { createAsyncThunk } from '@reduxjs/toolkit';
import { ListPageType } from 'Types/Types';
import axios from 'axios';

export const getData = createAsyncThunk<ListPageType[]>('', async () => {
  const response = await axios.get('');
  const data = await response.data();
  return data;
});
