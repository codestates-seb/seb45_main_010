import React, { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export type MemberLogin = {
  email: string;
  password: string;
};
const Login: React.FC = () => {
  const [LoginInfo, setLoginInfo] = useState<MemberLogin>({
    //회원가입정보
    email: '',
    password: '',
  });
  const [userDetails, setUserDetails] = useState<[]>([]);

  const HandleLoginInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    setLoginInfo({
      ...LoginInfo,
      [key]: e.target.value,
    });
  };

  const HandleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!LoginInfo.email || !LoginInfo.password) {
      alert('이메일, 비밀번호를 모두 입력하세요.');
      return;
    }

    await axios
      .get('http://localhost:8080/member')
      .then((response) => {
        console.log('회원확인 map으로 받아옴', response.data);
        const matchingUser = response.data.filter((user: MemberLogin) => {
          return user.email === LoginInfo.email && user.password === LoginInfo.password;
        })[0];
        setUserDetails(matchingUser);
        if (matchingUser) {
          alert('로그인 되었습니다');
        } else {
          alert('이메일 혹은 비밀번호가 일치하지 않습니다.');
        }
      })
      .catch((error) => {
        console.log('회원가입 비동기요청', error);
        alert('서비스 개선중입니다. 잠시후에 다시 시도하여 주세요');
      });
  };

  console.log(userDetails);
  return (
    <div className="flex flex-col item-center justify-center m-[12.5px]">
      <div className="text-center font-bold text-2xl mb-4">로그인</div>
      <div className="flex flex-col item-center justify-center mx-3 py-3 rounded-lg">
        <form className="flex flex-col gap-2 p-4 m-1 rounded-lg" onSubmit={HandleLogin}>
          <label htmlFor="email" className="text-sm mx-2 mt-10">
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border text-sm rounded-lg p-3 mx-2 h-[50px]"
            placeholder="이메일을 입력하세요"
            value={LoginInfo.email}
            onChange={HandleLoginInfo}
          />

          <label htmlFor="password" className="text-sm mx-2 mt-5">
            비밀번호
          </label>

          <input
            type="password"
            id="password"
            name="password"
            className="border text-sm rounded-lg p-3 mx-2 h-[50px]"
            placeholder="비밀번호를 입력하세요"
            value={LoginInfo.password}
            onChange={HandleLoginInfo}
          />
          <Button
            type="submit"
            className="text-white text-xl bg-blue-1 rounded-lg shadow-lg shadow-gray-900/30 p-2 mx-2 mt-7 h-[50px] hover:bg-blue-2"
          >
            이메일로 로그인
          </Button>
        </form>
        <div className="flex item-center justify-center mb-3 p-3">
          <Link to={'/GetPassword'}>
            <div className="text-xs text-gray-600 ">비밀번호찾기</div>{' '}
          </Link>
          <div className="text-xs text-gray-600 px-2">|</div>
          <Link to={'/Signup'}>
            <div className="text-xs text-gray-600 pr-3">회원 가입</div>
          </Link>
        </div>
        <Button
          type="submit"
          className="text-xl text-black bg-koko-1 rounded-lg shadow-lg shadow-gray-900/30 p-2 mb-5 mx-7 h-[50px] hover:bg-koko-2"
        >
          카카오로 로그인
        </Button>
      </div>
    </div>
  );
};

export default Login;
