import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type id = {
  teacherId: number;
  studentId: number;
};

export const lessonGet = createAsyncThunk('matchesGet', async (id: id) => {
  const response = await axios.get(
    `${URL}//matches?teacherId=${id.teacherId}&studentId=${id.studentId}`
  );
  const data = response.data;
  return data;
});

export const lessonPost = createAsyncThunk('lessonRequest', async (id) => {
  const response = await axios.post(`${URL}/teachers/${id}`);
  const data = response.data;
  return data;
});
