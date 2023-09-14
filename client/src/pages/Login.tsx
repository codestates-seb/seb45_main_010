import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent } from 'react';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { LoginType } from '../Types/Types';
import { fetchUserDetails } from 'redux/slice/MemberSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import IsLoading from 'components/Loading/Loading';
import axios from 'axios';
import { setAuth } from 'components/Auth/SetAuth';
import { checkAuth } from 'components/Auth/CheckAuth';
import { authenticateUser } from 'redux/slice/OauthSlice';
import { RootState } from 'redux/store';

const Login: React.FC = () => {
  const [LoginInfo, setLoginInfo] = useState<LoginType>({
    //회원가입정보
    email: '',
    password: '',
  });

  const apiURL = 'http://ec2-3-34-116-209.ap-northeast-2.compute.amazonaws.com:8080';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.member);
  const isLoading = userInfo.isLoading;
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);

  const autoLogin = async () => {
    const result = await dispatch(authenticateUser());
    if (result.payload) {
      await dispatch(fetchUserDetails(result.payload));
    }
  };

  useEffect(() => {
    const delay = setTimeout(async () => {
      await autoLogin();
    }, 500);
    return () => {
      clearTimeout(delay);
    };
  }, []);

  useEffect(() => {
    if (userInfo.user.name) {
      alert(`반갑습니다.${userInfo.user.name} 회원님!`);
      navigate('/');
    }
  }, [userInfo]);

  const handleLoginInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    setLoginInfo({
      ...LoginInfo,
      [key]: e.target.value,
    });
  };

  const handleKakaoAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.get(`${apiURL}/oauth2/authorization/kakao`);
    console.log(response); //토큰을 받아옴
    //token을 받아오고 해석하여 Id를 추출하여 보내는 과정 API완료시 구현해야 함
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!LoginInfo.email || !LoginInfo.password) {
      alert('이메일, 비밀번호를 모두 입력하세요.');
      return;
    }

    try {
      //처음 로그인하여 토큰을 받은 경우
      const loginSuccess = await setAuth(LoginInfo.email, LoginInfo.password);
      if (loginSuccess) {
        const authData = checkAuth();
        const resultAction = await dispatch(fetchUserDetails(authData));
        if (fetchUserDetails.rejected.match(resultAction)) {
          // 서버 200, 304인데 데이터가 없는경우
          // const errorMessage = resultAction.payload as string;
          // console.log(errorMessage);
          alert('고객정보 확인에 실패했습니다');
        }
      } else if (!loginSuccess) {
        alert('로그인에 실패했습니다. 계정을 확인하여 다시 시도하여 주세요');
      }
    } catch (error) {
      alert('서버와 통신오류가 발생했습니다. 로그인을 재시도해주세요');
      return;
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div> </div>
      ) : (
        <div className="flex flex-col item-center justify-center px-[12.5px]">
          <div className="text-2xl font-bold text-center">로그인</div>
          {isLoading ? (
            <IsLoading />
          ) : (
            <div className="flex flex-col justify-center rounded-lg item-center">
              <form className="flex flex-col gap-2 py-4 rounded-lg" onSubmit={handleLogin}>
                <label htmlFor="email" className="text-sm">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border-2 text-sm rounded-lg p-2 mb-5 h-[50px]"
                  placeholder="이메일을 입력하세요"
                  value={LoginInfo.email}
                  onChange={handleLoginInfo}
                />

                <label htmlFor="password" className="text-sm">
                  비밀번호
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  className="border-2 text-sm rounded-lg p-2 mb-8 h-[50px]"
                  placeholder="비밀번호를 입력하세요"
                  value={LoginInfo.password}
                  onChange={handleLoginInfo}
                />
                <Button
                  type="submit"
                  className="text-white border-2 border-blue-1 text-xl bg-blue-1 rounded-lg shadow-lg shadow-gray-900/30 p-1 h-[50px] hover:bg-blue-2"
                >
                  이메일로 로그인
                </Button>
              </form>
              <div className="flex justify-center p-2 pr-10 item-center">
                <Link to={'/GetPassword'}>
                  <div className="text-sm text-gray-600">비밀번호찾기</div>{' '}
                </Link>
                <div className="px-2 text-sm text-gray-600">|</div>
                <Link to={'/Signup'}>
                  <div className="text-sm text-gray-600">회원 가입</div>
                </Link>
              </div>
              <form className="flex flex-col gap-2 py-4 rounded-lg" onSubmit={handleKakaoAuth}>
                <Button
                  type="submit"
                  className="text-xl text-black border-2 border-kakao-1 bg-kakao-1 rounded-lg shadow-lg shadow-gray-900/30 p-1 h-[50px] hover:bg-kakao-2"
                >
                  카카오로 로그인
                </Button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Login;
