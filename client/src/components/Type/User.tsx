import { TeacherType } from 'configs/List/config';

export type User = {
  name: string;
  email: string;
  password: string;
  teacher: boolean;
  id: string;
  area: string[];
  category: string[];
  classMethod: {
    onLine: boolean;
    offLine: boolean;
  };
  introduce: string;
  date: string;
  lectureFee: string;
  career: string;
  option: string;
  request: UserRequest[];
};

export type UserRequest = {
  id: string;
  name: string;
  requestcategory: string[];
  note: string;
  date: string;
};

export type initialStateType = {
  status: string;
  value: TeacherType[];
};
