import jwt_decode from 'jwt-decode';

type AuthInfo = {
  id: number | null;
  teacher: string | null;
};

export const getAuth = () => {
  const userToken = localStorage.getItem('access_jwt');
  return userToken;
};

export const checkAuth = (): AuthInfo => {
  const userToken = localStorage.getItem('access_jwt');
  if (userToken) {
    const decoded: any = jwt_decode(userToken);
    const teacher: string = decoded.roles[0];
    const id: number = decoded.id;

    if (!teacher || !id) {
      alert('보안으로 인해 로그인이 해제되었습니다. 로그인해 주세요');
      return { id: null, teacher: null };
    }
    return { id, teacher };
  }
  return { id: null, teacher: null };
};
