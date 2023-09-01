import React from 'react';
import { Button } from '@material-tailwind/react';

const GetPassword: React.FC = () => {
  return (
    <div className="flex flex-col item-center justify-center m-[12.5px]">
      <div className="text-center font-bold text-4xl my-4">비밀번호 찾기</div>
      <div className="flex flex-col item-center justify-center mx-3 py-3 bg-mint-1 rounded-lg">
        <div className="text-sm text-gray-950 px-5 mb-2">가입된 이메일을 입력해주세요</div>
        <div className="text-sm text-gray-950 px-5">
          이메일을 통해 비밀번호를 확인하실수 있습니다
        </div>
        <form className="flex flex-col gap-2 p-4 m-1 rounded-lg">
          <label htmlFor="email" className="text-sm mx-4 mt-5">
            이메일 입력
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border text-xs rounded-lg p-3 mx-[12px] h-[50px]"
            placeholder="이메일을 입력하세요"
          />
          <Button
            type="submit"
            className="text-white text-2xl bg-blue-1 rounded-lg shadow-lg shadow-gray-900/30 p-2 m-3 mt-10 h-[50px] hover:bg-blue-2"
          >
            요청보내기
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GetPassword;
