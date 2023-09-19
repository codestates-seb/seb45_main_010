import { createAsyncThunk } from '@reduxjs/toolkit';
import { lessonGetType, requestPostType } from 'Types/Types';
import axios from 'axios';
import { URL } from 'configs/Url/config';

type id = {
  teacherId: number;
  studentId: number;
};

export const lessonRequestGet = createAsyncThunk<lessonGetType, id>(
  'lessonRequestGet',
  async (id) => {
    const response = await axios.get(
      `${URL}/matches?teacherId=${id.teacherId}&studentId=${id.studentId}`
    );
    const data = response.data;
    return data;
  }
);

export const lessonRequestPost = createAsyncThunk<requestPostType, requestPostType>(
  'lessonRequestPost',
  async (requestPost) => {
    const response = await axios.post(`${URL}/matches`, { requestPost });
    const data = response.data;
    return data;
  }
);
