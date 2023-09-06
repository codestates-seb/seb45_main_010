import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const FetchProfile = createAsyncThunk('FetchProfile', async (userId: number) => {
  const response = await axios.get(`http://localhost:8081/profile/${userId}`);
  const data = response.data;
  return data;
});

export const FetchRequest = createAsyncThunk('FetchRequest', async (userId: number) => {
  const response = await axios.get(`http://localhost:8081/request${userId}`);
  const data = response.data;
  return data;
});

export const updateClassMethod = createAsyncThunk(
  'profile/updateClassMethod',
  async ({ userId, onLine, offLine }: { userId: number; onLine: boolean; offLine: boolean }) => {
    const response = await axios.patch(`http://localhost:8081/profile/${userId}`, {
      onLine,
      offLine,
    });
    return response.data;
  }
);
