import { checkAuth } from 'components/Auth/CheckAuth';

export const APIurl = 'http://ec2-3-34-116-209.ap-northeast-2.compute.amazonaws.com:8080';

export const getAuthUserInfo = () => {
  const userInfo = checkAuth();
  let userType;
  let userId = null;

  if (userInfo) {
    userType = userInfo.teacher === 'STUDENT' ? 'studentUser' : 'teacherUser';
    userId = userInfo.id;
  } else {
    console.log('유저가 강사/학생인지 알 수 없습니다', userInfo);
  }

  const APIUSERURL = `${APIurl}/${userType === 'studentUser' ? 'students' : 'teachers'}`;
  const PROFILEURL = `${APIurl}/${userType === 'studentUser' ? 'students/mypage' : 'teachers'}`;

  return { userId, APIUSERURL, PROFILEURL };
};

export default getAuthUserInfo;
