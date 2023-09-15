export type User = {
  name: string;
  email: string;
  password: string;
  teacher: boolean;
  id: number;
  phone: string;
  regionsNames: string[];
  subjectNames: string[];
  profileImg: string | null;
  introduction: string;
  lectureFee: string;
  career: string;
  lessonOption: string;
  matches: { date: string; timeslots: string[] }[];
  onLine: boolean;
  offLine: boolean;
  oauth: boolean;
  address: string;
  option: string | null;
};

export type TeacherType = Omit<User, 'password'>;

export type StudentType = Omit<
  User,
  'password' | 'matches' | 'onLine' | 'offLine' | 'lectureFee' | 'career' | 'lessonOption'
>;

export type CommonUserType = Pick<
  User,
  'name' | 'email' | 'teacher' | 'id' | 'phone' | 'profileImg' | 'oauth'
>;

export type PrivateType = Pick<User, 'profileImg' | 'name' | 'email' | 'password' | 'phone'>;

export type LoginType = Pick<User, 'email' | 'password'>;

export type ListPageType = Pick<
  User,
  'id' | 'name' | 'subjectNames' | 'regionsNames' | 'onLine' | 'offLine' | 'profileImg'
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
  | 'subjectNames'
  | 'regionsNames'
  | 'matches'
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
  matches: string;
};

export type footerType = {
  footerMessage: string;
  member: {
    name: string;
    position: string;
    profileImg: string;
  }[];
};

export type TimeSlotType = { matches: string; timeslots: string[] };

export type ScheduleType = { id: number; matches: TimeSlotType[] };

export type ScheduleArrayType = {
  id: number;
  matches: ScheduleType[];
}[];

export type SearchType = Pick<User, 'subjectNames' | 'regionsNames'> & {
  teacherName: string;
  size: number;
  page: number;
};

export type subjectListType = Pick<User, 'id'> & {
  subjectName: string;
};
export type regionsListType = Pick<User, 'id'> & {
  regionName: string;
};
