import { unauthenficate } from 'redux/slice/OauthSlice';
import { AppDispatch } from 'redux/store';
import { resetMember } from 'redux/slice/MemberSlice';

export const handleLogout = (dispatch: AppDispatch): void => {
  dispatch(unauthenficate());
  dispatch(resetMember());
  localStorage.removeItem('access_jwt');
  alert('로그아웃 되었습니다');
};
