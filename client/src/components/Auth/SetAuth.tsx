import axios from 'axios';
import { URL } from 'configs/Url/config';

export const setAuth = async (email: string, password: string) => {
  try {
    const userLogin = await axios.post(`${URL}/login`, {
      username: email,
      password: password,
    });
    const accessToken = userLogin.headers.authorization.split(' ')[1];
    if (accessToken) {
      localStorage.setItem('access_jwt', accessToken);
    }
    return true;
  } catch (error) {
    return false;
  }
};
