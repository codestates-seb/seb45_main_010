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
  onLine: boolean;
  offLine: boolean;
  oauth: boolean;
  address: string;
  option: string | null;
  schedules: { date: string; timeslots: string[] };
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
  | 'introduction'
  | 'lectureFee'
  | 'career'
  | 'option'
  | 'schedules'
>;

export type ProfileType = {
  career: string;
  email: string;
  teacher: boolean;
  userId: number;
  id: number;
  introduction: string;
  lectureFee: string;
  name: string;
  offLine: false;
  onLine: false;
  option: string;
  profileImg: string;
  regions: string[];
  subjects: string[];
  matches: [
    {
      matchId: number;
      date: string;
      timeslot: string;
      status: StatusType;
      studentName: string;
      subjects: string[];
      teacherName: string;
    },
  ];
};

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

export type MatchType = {
  matchId: number;
  status: StatusType;
  subjects: string[];
  studentName?: string;
  teacherName?: string;
  date: string;
  timeslot: string;
};

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

export type SearchType = Pick<User, 'subjects' | 'regions'> & {
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

export type StatusType = 'MATCH_ANSWERED' | 'MATCH_CANCELLED' | 'MATCH_REQUEST' | string;

export type footerType = {
  footerMessage: string;
  member: {
    name: string;
    position: string;
    profileImg: string;
  }[];
};

export type lessonGetType = Pick<User, 'regions' | 'subjects'> & {
  teacherId: number;
  studentId: number;
  studentName: string;
  studentPhone: string;
  studentEmail: string;
  date: string;
  timeslot: string;
};

export type requestPostType = Pick<User, 'subjects' | 'regions'> & {
  teacherId: number;
  studentId: number;
  isOnline: boolean;
  studentName: string;
  studentPhone: string;
  studentEmail: string;
  remarks: string;
  date: string;
  timeslot: string;
};

export type schedulesType = {
  date: string;
  timeslot: string;
};
