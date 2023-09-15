import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import GetInfoAuth from 'hooks/GetInfoAuth';
import { ACCESSTOKEN } from 'configs/Url/config';
import { ScheduleObjType, ScheduleType } from 'Types/Types';
import { APIurl } from 'hooks/GetInfoAuth';
import { ScheduleArrayType, MatchType } from 'Types/Types';
const { APIUSERURL, PROFILEURL } = GetInfoAuth();
export const FetchProfile = createAsyncThunk('FetchProfile', async (id: number) => {
  const response = await axios.get(`${PROFILEURL}/${id}`);
  const data = response.data;
  return data;
});

export const FetchSchedule = createAsyncThunk('schedule/fetchSchedule', async (id: number) => {
  const response = await axios.get<ScheduleObjType>(`${APIurl}/schedules?teacherId=${id}`);
  const data = response.data;
  return data;
});

export const FetchRequest = createAsyncThunk('FetchRequest', async (id: number) => {
  const response = await axios.get<MatchType>(`${APIurl}/matches/${id}`);
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
          Authorization: `Bearer ${ACCESSTOKEN}`,
        },
      }
    );
    return response.data;
  }
);

export const updateSchedule = createAsyncThunk(
  'schedule/updateSchedule',
  async ({ id, date, timeslots }: { id: number; date: string; timeslots: string[] }) => {
    const response = await axios.patch(`${APIurl}/schedules`, {
      teacherId: id,
      date,
      timeslots,
    });
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
          Authorization: `Bearer ${ACCESSTOKEN}`,
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
          Authorization: `Bearer ${ACCESSTOKEN}`,
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
          Authorization: `Bearer ${ACCESSTOKEN}`,
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
          Authorization: `Bearer ${ACCESSTOKEN}`,
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
          Authorization: `Bearer ${ACCESSTOKEN}`,
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
          Authorization: `Bearer ${ACCESSTOKEN}`,
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
          Authorization: `Bearer ${ACCESSTOKEN}`,
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
          Authorization: `Bearer ${ACCESSTOKEN}`,
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
