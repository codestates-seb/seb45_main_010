import { createAsyncThunk } from '@reduxjs/toolkit';
import { ListPageType, SearchType } from 'Types/Types';
import axios from 'axios';
import { URL } from 'configs/Url/config';

export const getData = createAsyncThunk<ListPageType[], SearchType>('getData', async (search) => {
  search.regionsNames = search.regionsNames.length === 0 ? ['전체'] : search.regionsNames;
  search.subjectNames = search.subjectNames.length === 0 ? ['전체'] : search.subjectNames;

  const response = await axios.get(
    `${URL}/teachers?teacherName=${search.teacherName}&regions=${search.regionsNames}&subjects=${search.subjectNames}&page=${search.page}&size=${search.size}`
  );
  const data = response.data;
  return data;
});
