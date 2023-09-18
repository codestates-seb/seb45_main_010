import { createAsyncThunk } from '@reduxjs/toolkit';
import { lessonGetType, lessonPostType, requestPostType } from 'Types/Types';
import axios from 'axios';
import { URL } from 'configs/Url/config';

type id = {
  teacherId: string;
  studentId: string;
};

type props = {
  id: string;
  requestPost: requestPostType;
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

export const lessonRequestPost = createAsyncThunk<lessonPostType, props>(
  'lessonRequestPost',
  async ({ id, requestPost }) => {
    console.log(requestPost);

    const response = await axios.post(`${URL}/teachers/${id}`, { requestPost });
    const data = response.data;
    return data;
  }
);
