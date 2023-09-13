import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'Types/Types';
const APIurl = 'http://ec2-3-34-116-209.ap-northeast-2.compute.amazonaws.com:8080';

export const FetchProfile = createAsyncThunk('FetchProfile', async (userId: number) => {
  const response = await axios.get(`${APIurl}/teachers/${userId}`);
  const data = response.data;
  return data;
});

export const FetchRequest = createAsyncThunk('FetchRequest', async (userId: number) => {
  const response = await axios.get(`http://localhost:8081/request/${userId}`);
  const data = response.data;
  return data;
});

export const FetchSchedule = createAsyncThunk('schedule/fetchSchedule', async (userId: number) => {
  const response = await axios.get(`http://localhost:8081/schedule/${userId}`);
  const data = response.data;
  return data;
});

export const updateSchedule = createAsyncThunk(
  'schedule/updateSchedule',
  async ({
    userId,
    date,
    method,
  }: {
    userId: number;
    date: null;
    method: 'POST' | 'PATCH' | 'DELETE';
  }) => {
    let response;
    if (method === 'POST') {
      response = await axios.post(`http://localhost:8081/schedule/${userId}`, { date });
    } else if (method === 'PATCH') {
      response = await axios.patch(`http://localhost:8081/schedule/${userId}`, { date });
    } else {
      response = await axios.delete(`http://localhost:8081/schedule/${userId}`, {
        data: date,
      });
    }
    return response.data;
  }
);
export const updateOnline = createAsyncThunk(
  'profile/updateOnline',
  async ({ userId, onLine }: { userId: number; onLine: boolean }) => {
    const response = await axios.patch(`${APIurl}/teachers/onLine`, {
      id: userId,
      onLine: onLine,
    });
    return response.data;
  }
);

export const updateOffline = createAsyncThunk(
  'profile/updateOffline',
  async ({ userId, offLine }: { userId: number; offLine: boolean }) => {
    const response = await axios.patch(`${APIurl}/teachers/offLine`, {
      id: userId,
      offLine: offLine,
    });
    return response.data;
  }
);

export const updateLectureFee = createAsyncThunk(
  'profile/updateLectureFee',
  async ({ userId, lectureFee }: { userId: number; lectureFee: string }) => {
    const response = await axios.patch(`${APIurl}/teachers/lectureFee`, {
      id: userId,
      lectureFee: lectureFee,
    });
    return response.data;
  }
);

export const updateCareer = createAsyncThunk(
  'profile/updateCareer',
  async ({ userId, career }: { userId: number; career: string }) => {
    const response = await axios.patch(`${APIurl}/teachers/career`, {
      id: userId,
      career: career,
    });
    return response.data;
  }
);

export const updateOption = createAsyncThunk(
  'profile/updateOption',
  async ({ userId, option }: { userId: number; option: string }) => {
    const response = await axios.patch(`${APIurl}/teachers/option`, {
      id: userId,
      option: option,
    });
    return response.data;
  }
);

export const updateIntroduction = createAsyncThunk(
  'profile/updateIntroduction',
  async ({ userId, introduction }: { userId: number; introduction: string }) => {
    const response = await axios.patch(`${APIurl}/teachers/introduction`, {
      id: userId,
      introduction: introduction,
    });
    console.log(response.data);
    return response.data;
  }
);

export const updateSubjects = createAsyncThunk(
  'profile/updateSubjects',
  async ({ userId, subjects }: { userId: number; subjects: string[] }) => {
    const response = await axios.patch(`${APIurl}/teachers/subjects`, {
      teacherId: userId,
      subjects: subjects,
    });
    return response.data;
  }
);

export const updateRegions = createAsyncThunk(
  'profile/updateRegions',
  async ({ userId, regions }: { userId: number; regions: string[] }) => {
    const response = await axios.patch(`${APIurl}/teachers/regions`, {
      teacherId: userId,
      regions: regions,
    });
    return response.data;
  }
);
