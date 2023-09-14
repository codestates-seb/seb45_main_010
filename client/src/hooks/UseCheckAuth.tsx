import { checkAuth } from 'components/Auth/CheckAuth';
import { useState, useEffect } from 'react';
export const APIurl = 'http://ec2-3-34-116-209.ap-northeast-2.compute.amazonaws.com:8080';
const INFOAUTH = checkAuth();
let userType;

if (INFOAUTH) {
  if (INFOAUTH.teacher === 'STUDENT') {
    userType = 'studentUser';
  } else {
    userType = 'teacherUser';
  }
} else {
  console.log('유저가 강사/학생인지 알 수 없습니다', INFOAUTH);
}
export const APIUSERURL = `${APIurl}/${userType === 'studentUser' ? 'students' : 'teachers'}`;
export const PROFILEURL = `${APIurl}/${
  userType === 'studentUser' ? 'students/mypage' : 'teachers'
}`;
const UseCheckAuth = () => {
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    const userInfo = checkAuth();
    if (userInfo) {
      setUserId(userInfo.id);
    }
  }, []);

  return userId;
};
export default UseCheckAuth;
