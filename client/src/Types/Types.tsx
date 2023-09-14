export type User = {
  name: string;
  email: string;
  password: string;
  teacher: boolean;
  id: number;
  phoneNumber: string;
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
};

export type TeacherType = Omit<User, 'password'>;

export type StudentType = Omit<
  User,
  'password' | 'schedule' | 'onLine' | 'offLine' | 'lectureFee' | 'career' | 'lessonOption'
>;

export type CommonUserType = Pick<
  User,
  'name' | 'email' | 'teacher' | 'id' | 'phoneNumber' | 'profileImg'
>;

export type PrivateType = Pick<User, 'profileImg' | 'name' | 'email' | 'password' | 'phoneNumber'>;

export type LoginType = Pick<User, 'email' | 'password'>;

export type ListPageType = Pick<
  User,
  'id' | 'name' | 'subjects' | 'regions' | 'onLine' | 'offLine' | 'profileImg'
>;

export type DetailType = Pick<
  User,
  | 'name'
  | 'profileImg'
  | 'onLine'
  | 'offLine'
  | 'subjects'
  | 'regions'
  | 'schedule'
  | 'introduction'
  | 'lectureFee'
  | 'career'
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

export type TimeSlotType = { schedule: string; timeslots: string[] };

export type ScheduleType = { id: number; schedule: TimeSlotType[] };

export type ScheduleArrayType = {
  id: number;
  schedule: ScheduleType[];
}[];

export type SearchType = {
  teacherName: string;
  subject: string[];
  regions: string[];
};
