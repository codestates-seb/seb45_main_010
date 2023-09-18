import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getAuthUserInfo from 'components/Items/GetInfoAuth';
import { getAccessToken } from 'components/Items/GetAccessToken';
import { authenticateUser } from 'redux/slice/OauthSlice';
import { ScheduleObjType, ScheduleType, MatchType } from 'Types/Types';
import { APIurl } from 'components/Items/GetInfoAuth';
const { APIUSERURL, PROFILEURL } = getAuthUserInfo();

const token = getAccessToken();

export const FetchProfile = createAsyncThunk('FetchProfile', async (id, thunkAPI) => {
  try {
    const dispatch = thunkAPI.dispatch;

    const authResult = await dispatch(authenticateUser());

    const userId = authResult.payload?.id;
    const teacher = authResult.payload?.teacher;
    if (userId !== undefined && userId !== null) {
      const response = await axios.get(`${PROFILEURL}/${userId}`);
      let data = response.data;

      if (data && data.teacher !== undefined) {
        data.teacher = teacher === 'TEACHER' ? true : teacher === 'STUDENT' ? false : data.teacher;
      }
      return data;
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
});

export const FetchSchedule = createAsyncThunk('schedule/fetchSchedule', async (id: number) => {
  const response = await axios.get<ScheduleObjType>(`${APIurl}/schedules?teacherId=${id}`);
  const data = response.data;
  return data;
});

export const FetchRequest = createAsyncThunk('FetchRequest', async (id: number) => {
  const response = await axios.get<MatchType>(`${APIurl}/matches/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = response.data;
  return data;
});

export const updateRequestStatus = createAsyncThunk(
  'profile/updateRequestStatus',
  async ({ id, status }: { id: number; status: string }) => {
    const response = await axios.patch(
      `${APIurl}/matches`,
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

export const updateSchedule = createAsyncThunk(
  'schedule/updateSchedule',
  async ({ id, date, timeslots }: { id: number; date: string; timeslots: string[] }) => {
    const response = await axios.patch(
      `${APIurl}/schedules`,
      {
        teacherId: id,
        date,
        timeslots,
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
export const updateOnline = createAsyncThunk(
  'profile/updateOnline',
  async ({ id, onLine }: { id: number; onLine: boolean }) => {
    const response = await axios.patch(
      `${APIurl}/teachers/onLine`,
      {
        id: id,
        onLine: onLine,
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

export const updateOffline = createAsyncThunk(
  'profile/updateOffline',
  async ({ id, offLine }: { id: number; offLine: boolean }) => {
    const response = await axios.patch(
      `${APIurl}/teachers/offLine`,
      {
        id: id,
        offLine: offLine,
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

export const updateLectureFee = createAsyncThunk(
  'profile/updateLectureFee',
  async ({ id, lectureFee }: { id: number; lectureFee: string }) => {
    const response = await axios.patch(
      `${APIurl}/teachers/lectureFee`,
      {
        id: id,
        lectureFee: lectureFee,
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

export const updateCareer = createAsyncThunk(
  'profile/updateCareer',
  async ({ id, career }: { id: number; career: string }) => {
    const response = await axios.patch(
      `${APIurl}/teachers/career`,
      {
        id: id,
        career: career,
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

export const updateOption = createAsyncThunk(
  'profile/updateOption',
  async ({ id, option }: { id: number; option: string }) => {
    const response = await axios.patch(
      `${APIUSERURL}/option`,
      {
        id: id,
        option: option,
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

export const updateIntroduction = createAsyncThunk(
  'profile/updateIntroduction',
  async ({ id, introduction }: { id: number; introduction: string }) => {
    const response = await axios.patch(
      `${APIUSERURL}/introduction`,
      {
        id: id,
        introduction: introduction,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  }
);

export const updateSubjects = createAsyncThunk(
  'profile/updateSubjects',
  async ({ id, subjects }: { id: number; subjects: string[] }) => {
    const response = await axios.patch(
      `${APIUSERURL}/subjects`,
      {
        id: id,
        subjects: subjects,
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

export const updateRegions = createAsyncThunk(
  'profile/updateRegions',
  async ({ id, regions }: { id: number; regions: string[] }) => {
    const response = await axios.patch(
      `${APIUSERURL}/regions`,
      {
        id: id,
        regions: regions,
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
// <-- 프로필 관련 Thunks [end]-->

// <-- 지역/과목 관련 Thunks [start]-->
export const FetchSubjects = createAsyncThunk('subjects', async () => {
  const response = await axios.get(`${APIurl}/subjects`);
  const data = response.data;
  return data.subjects;
});

export const FetchRegions = createAsyncThunk('regions', async () => {
  const response = await axios.get(`${APIurl}/regions`);
  const data = response.data;
  return data.regions;
});
// <-- 지역/과목 관련 Thunks [end]-->
