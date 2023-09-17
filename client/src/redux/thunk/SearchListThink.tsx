import { createAsyncThunk } from '@reduxjs/toolkit';
import { regionsListType, subjectListType } from 'Types/Types';
import axios from 'axios';
import { URL } from 'configs/Url/config';

export const getSubjectList = createAsyncThunk<subjectListType>('getSubjectList', async () => {
  const response = await axios.get(`${URL}/subjects`);
  const data = response.data;
  return data;
});

export const getRegionsList = createAsyncThunk<regionsListType>('getRegionsList', async () => {
  const response = await axios.get(`${URL}/regions`);
  const data = response.data;
  return data;
});
