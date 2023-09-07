export type User = {
  name: string;
  email: string;
  password: string;
  teacher: boolean;
  id: number;
  phone: number;
  area: string[];
  category: string[];
  img: string;
  introduce: string;
  lectureFee: string;
  career: string;
  option: string;
  date: {
    select: {
      [date: string]: string[];
    };
  };
  classMethod: {
    onLine: boolean;
    offLine: boolean;
  };
};

export type TeacherType = Omit<User, 'password'>;

export type StudentType = Omit<
  User,
  'password' | 'date' | 'classMethod' | 'lectureFee' | 'career' | 'option'
>;

export type CommonUserType = Pick<User, 'name' | 'email' | 'teacher' | 'id' | 'phone' | 'img'>;

export type PrivateType = Pick<User, 'img' | 'name' | 'email' | 'password' | 'phone'>;

export type LoginType = Pick<User, 'email' | 'password'>;

export type ListPageType = Pick<
  TeacherType,
  'name' | 'category' | 'area' | 'classMethod' | 'img'
>[];

export type RequestType = {
  id: string;
  name: string;
  requestcategory: string[];
  note: string;
  date: string;
};
