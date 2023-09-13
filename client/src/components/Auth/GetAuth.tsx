import axios from 'axios';

export const getAuth = async (email: string, password: string) => {
  const apiURL = 'http://ec2-3-34-116-209.ap-northeast-2.compute.amazonaws.com:8080';
  try {
    const userLogin = await axios.post(`${apiURL}/login`, {
      username: email,
      password: password,
    });
    const accessToken = userLogin.headers.authorization.split(' ')[1];
    console.log(accessToken);
    if (accessToken) {
      localStorage.setItem('access_jwt', accessToken);
    }
    return true;
  } catch (error) {
    console.log('로그인 실패, error');
    return false;
  }
};
