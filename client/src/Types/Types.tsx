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
  matches: string[];
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

export type footerType = {
  footerMessage: string;
  member: {
    name: string;
    position: string;
    profileImg: string;
  }[];
};

export type ScheduleType = { date: string; timeslots: string[] };

export type ScheduleObjType = {
  teacherId: number;
  schedules: ScheduleType[];
};

// export type ScheduleArrayType = {
//   teacherId: number;
//   schedules: ScheduleObjType[];
// }[];

export type SearchType = {
  teacherName: string;
  subject: string[];
  regions: string[];
  size: number;
  page: number;
};
export type ScheduleArrayType = {
  id: number;
  schedule: ScheduleType[];
}[];

export type StatusType = 'MATCH_ANSWERED' | 'MATCH_CANCELLED' | 'MATCH_REQUEST';
