export type User = {
  name: string;
  email: string;
  password: string;
  teacher: boolean;
  id: number;
  phone: string;
  regions: string[];
  subjects: string[];
  profileImg: string | null;
  introduction: string;
  lectureFee: string;
  career: string;
  lessonOption: string;
  schedule: { date: string; timeslots: string[] }[];
  onLine: boolean;
  offLine: boolean;
  oauth: boolean;
  address: string;
  option: string | null;
};

export type TeacherType = Omit<User, 'password'>;

export type StudentType = Omit<
  User,
  'password' | 'schedule' | 'onLine' | 'offLine' | 'lectureFee' | 'career' | 'lessonOption'
>;

export type CommonUserType = Pick<
  User,
  'name' | 'email' | 'teacher' | 'id' | 'phone' | 'profileImg' | 'oauth'
>;

export type PrivateType = Pick<User, 'profileImg' | 'name' | 'email' | 'password' | 'phone'>;

export type LoginType = Pick<User, 'email' | 'password'>;

export type ListPageType = Pick<
  User,
  'id' | 'name' | 'subjects' | 'regions' | 'onLine' | 'offLine' | 'profileImg'
>;

export type DetailType = Pick<
  User,
  | 'id'
  | 'email'
  | 'name'
  | 'teacher'
  | 'phone'
  | 'profileImg'
  | 'onLine'
  | 'offLine'
  | 'subjects'
  | 'regions'
  | 'schedule'
  | 'introduction'
  | 'lectureFee'
  | 'career'
  | 'option'
>;

export type RequestType = {
  id: string;
  name: string;
  requestcategory: string[];
  note: string;
  schedule: string;
};

export type footerType = {
  footerMessage: string;
  member: {
    name: string;
    position: string;
    profileImg: string;
  }[];
};

export type TimeSlotType = { date: string; timeslots: string[] };

export type ScheduleType = {
  id: number;
  date: {
    date: string;
    timeslots: string[];
  }[];
};

// export type ScheduleArrayType = {
//   id: number;
//   schedule: ScheduleType[];
// }[];

export type SearchType = {
  teacherName: string;
  subject: string[];
  regions: string[];
  size: number;
  page: number;
};
