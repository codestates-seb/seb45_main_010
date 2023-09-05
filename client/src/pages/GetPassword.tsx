import React, { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import axios from 'axios';

export type SearchPassword = {
  email: string;
};

const GetPassword: React.FC = () => {
  const [passwordkey, setpasswordkey] = useState<SearchPassword>({
    email: '',
  });

  const navigate = useNavigate();

  const handleSecret = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    setpasswordkey({ ...passwordkey, [key]: e.target.value });
  };

  const HandleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!passwordkey) {
      alert('이메일을 입력하세요');
      return;
    }

    await axios
      .get('http://localhost:8080/member')
      .then((response) => {
        console.log('회원확인 map으로 받아옴', response.data);
        const matchingUser = response.data.filter((el: SearchPassword) => {
          return el.email === passwordkey.email;
        })[0];
        if (matchingUser) {
          alert(`${matchingUser.email}계정에서 비밀번호를 확인하세요`);
          navigate('/login');
        } else {
          alert('가입된 계정이 아닙니다. 이메일을 정확히 입력해주세요');
        }
      })
      .catch((error) => {
        console.log('회원비밀번호찾기', error);
        alert('서비스 개선중입니다. 잠시후에 다시 시도하여 주세요');
      });
  };

  return (
    <div className="flex flex-col item-center justify-center m-[12.5px]">
      <div className="text-center font-bold text-2xl my-4">비밀번호 찾기</div>
      <div className="flex flex-col item-center justify-center mx-3 py-3 rounded-lg">
        <div className="text-sm text-gray-950 px-5 mb-2">가입된 이메일을 입력해주세요</div>
        <div className="text-sm text-gray-950 px-5">
          이메일을 통해 비밀번호를 확인하실수 있습니다
        </div>
        <form className="flex flex-col gap-2 p-4 m-1 rounded-lg" onSubmit={HandleSearch}>
          <label htmlFor="email" className="text-sm mx-4 mt-5">
            이메일 입력
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border text-xs rounded-lg p-3 mx-[12px] h-[50px]"
            placeholder="이메일을 입력하세요"
            value={passwordkey.email}
            onChange={handleSecret}
          />
          <Button
            type="submit"
            className="text-white text-xl bg-blue-1 rounded-lg shadow-lg shadow-gray-900/30 p-2 m-3 mt-10 h-[50px] hover:bg-blue-2"
          >
            요청보내기
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GetPassword;
