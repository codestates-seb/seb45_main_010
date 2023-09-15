import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIurl } from 'components/Items/GetInfoAuth';
import { ACCESSTOKEN } from 'configs/Url/config';
import { RequestInfoType } from 'Types/Types';

export const FetchRequestInfo = createAsyncThunk<RequestInfoType, number>(
  'FetchRequestInfo',
  async (matchId: number) => {
    const response = await axios.get<RequestInfoType>(`${APIurl}/matches/${matchId}`);
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
