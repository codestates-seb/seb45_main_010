export const getAccessToken = () => {
  const token = localStorage.getItem('access_jwt');
  return token;
};
