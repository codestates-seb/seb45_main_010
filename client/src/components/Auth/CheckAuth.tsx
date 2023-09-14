import jwt_decode from 'jwt-decode';

export const checkAuth = () => {
  const userToken = localStorage.getItem('access_jwt');
  if (userToken) {
    const decoded: any = jwt_decode(userToken);
    console.log(decoded);
    const teacher: string = decoded.roles[0];
    const id: number = decoded.id;
    console.log(id, teacher);
    if (!teacher || !id) {
      alert('보안으로 인해 로그인이 해제되었습니다. 로그인해 주세요');
    }
    return { id, teacher };
  }
};
