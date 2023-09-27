import React, { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import axios from 'axios';
import { URL } from 'configs/Url/config';

const GetPassword: React.FC = () => {
  const [passwordkey, setpasswordkey] = useState<string>('');

  const navigate = useNavigate();
  const isValidEmail: boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passwordkey);

  const handleSecret = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value;
    setpasswordkey(key);
  };

  const HandleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!passwordkey || !isValidEmail) {
      alert('유효한 이메일을 입력해주세요');
      return;
    }

    try {
      const response = await axios.get(`${URL}/resetPassword/${passwordkey}`);
      const matchingUser = response.data;
      if (matchingUser) {
        alert(`${passwordkey}계정으로 인증메일을 전송했습니다.`);
        navigate('/login');
      } else {
        alert('가입된 계정이 아닙니다. 이메일을 정확히 입력해주세요');
      }
    } catch (error) {
      console.log('회원비밀번호찾기', error);
      alert('서버와 통신이 원활하지 않습니다. 다시 시도하여 주세요');
    }
  };

  return (
    <div className="flex flex-col item-center justify-center px-[12.5px]">
      <div className="my-4 text-2xl font-bold text-center">비밀번호 찾기</div>
      <div className="flex flex-col justify-center rounded-lg item-center">
        <div className="flex flex-col my-2">
          <div className="text-sm text-gray-950">가입된 이메일을 입력해주세요</div>
          <div className="text-sm text-gray-950">이메일을 통해 비밀번호를 확인하실수 있습니다</div>
        </div>
        <form className="flex flex-col gap-2 py-4" onSubmit={HandleSearch}>
          <label htmlFor="email" className="text-sm">
            이메일 입력
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border text-sm rounded-lg p-2 h-[50px] mb-10"
            placeholder="이메일을 입력하세요"
            value={passwordkey}
            onChange={handleSecret}
          />
          <Button
            type="submit"
            className="text-white border-2 border-blue-1 text-xl bg-blue-1 rounded-lg shadow-lg shadow-gray-900/30 p-1 h-[50px] hover:bg-blue-2"
          >
            요청보내기
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GetPassword;
