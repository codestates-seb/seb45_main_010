import { checkAuth } from 'components/Auth/CheckAuth';
import { URL } from 'configs/Url/config';

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

  const APIUSERURL = `${URL}/${userType === 'studentUser' ? 'students' : 'teachers'}`;
  const PROFILEURL = `${URL}}/${userType === 'studentUser' ? 'students/mypage' : 'teachers'}`;

  return { userId, APIUSERURL, PROFILEURL };
};

export default getAuthUserInfo;
