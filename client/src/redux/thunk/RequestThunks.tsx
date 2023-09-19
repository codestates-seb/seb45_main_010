import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from 'configs/Url/config';
import { getAccessToken } from 'components/Items/GetAccessToken';
import { RequestInfoType } from 'Types/Types';

export const FetchRequestInfo = createAsyncThunk<RequestInfoType, number>(
  'FetchRequestInfo',
  async (matchId: number) => {
    const token = getAccessToken();
    console.log(token);
    const response = await axios.get<RequestInfoType>(`${URL}/matches/${matchId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;

    return data;
  }
);

export const updateRequestStatus = createAsyncThunk(
  'request/updateRequestStatus',
  async ({ id, status }: { id: number; status: string }) => {
    const token = getAccessToken();
    const response = await axios.patch(
      `${URL}/matches`,
      {
        id: id,
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);
