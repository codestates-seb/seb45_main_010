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
  onLine: boolean;
  offLine: boolean;
  oauth: boolean;
  address: string;
  option: string | null;
  schedules: {
    date: string[];
  }[];
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
export type RequestInfoType = {
  id: number;
  studentId: number;
  teacherId: number;
  status: string;
  matchSubjects: string[];
  matchRegions: string[];
  date: string;
  timeslot: string;
  studentName: string;
  studentPhone: string;
  studentEmail: string;
  remarks: string;
  teacherName: string;
  online: boolean;
};

export type MatchType = Array<{
  matchId: number;
  status: StatusType;
  subjects: string[];
  studentName?: string;
  teacherName?: string;
  schedule: string;
}>;

export type TimeSlotType = { matches: string; timeslots: string[] };

export type ScheduleType1 = { id: number; matches: TimeSlotType[] };

export type ScheduleArrayType1 = {
  id: number;
  matches: ScheduleType[];
}[];

export type ScheduleType = { date: string; timeslots: string[] };

export type ScheduleObjType = {
  teacherId: number;
  schedules: ScheduleType[];
};

// export type ScheduleArrayType = {
//   teacherId: number;
//   schedules: ScheduleObjType[];
// }[];

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
export type ScheduleArrayType2 = {
  id: number;
  schedule: ScheduleType[];
}[];

export type StatusType = 'MATCH_ANSWERED' | 'MATCH_CANCELLED' | 'MATCH_REQUEST';

export type footerType = {
  footerMessage: string;
  member: {
    name: string;
    position: string;
    profileImg: string;
  }[];
};

export type lessonGetType = {
  studentId: string;
  teacherId: string;
  subjects: string[];
  schedules: {
    date: string[];
  }[];
  sudentName: string;
  studentPhone: string;
  studentEmail: string;
};
