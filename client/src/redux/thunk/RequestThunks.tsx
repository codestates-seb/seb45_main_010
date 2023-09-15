import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIurl } from 'hooks/GetInfoAuth';
import { ACCESSTOKEN } from 'configs/Url/config';
import { RequestInfoType } from 'Types/Types';

export const FetchRequest = createAsyncThunk<RequestInfoType[], number>(
  'FetchRequest',
  async (id: number) => {
    const response = await axios.get<RequestInfoType[]>(`${APIurl}/matches/${id}`);
    const data = response.data;
    return data;
  }
);

export const updateRequestStatus = createAsyncThunk(
  'request/updateRequestStatus',
  async ({ id, status }: { id: number; status: string }) => {
    const response = await axios.patch(
      `${APIurl}/matches`,
      {
        id: id,
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESSTOKEN}`,
        },
      }
    );
    return response.data;
  }
);
