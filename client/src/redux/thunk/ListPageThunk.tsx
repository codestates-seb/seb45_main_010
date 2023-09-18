import { createAsyncThunk } from '@reduxjs/toolkit';
import { ListPageType, SearchType } from 'Types/Types';
import axios from 'axios';
import { URL } from 'configs/Url/config';

export const getData = createAsyncThunk<ListPageType[], SearchType>('getData', async (search) => {
  search.regions = search.regions.length === 0 ? ['전체'] : search.regions;
  search.subjects = search.subjects.length === 0 ? ['전체'] : search.subjects;

  const response = await axios.get(
    `${URL}/teachers?teacherName=${search.teacherName}&regionsNames=${search.regions}&subjectNames=${search.subjects}&page=${search.page}&size=${search.size}`
  );
  const data = response.data;
  return data;
});
