import React from 'react';
import { Button } from '@material-tailwind/react';

const SignUp: React.FC = () => {
  return (
    <div className="flex flex-col item-center justify-center m-[12.5px]">
      <div className="text-center font-bold text-4xl mb-4">회원가입</div>
      <div className="flex flex-col item-center justify-center mx-3 py-3 bg-mint-1 rounded-lg">
        <form className="flex flex-col gap-2 p-4 m-1 rounded-lg">
          <label htmlFor="name" className="text-sm mx-4">
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border text-xs rounded-lg p-3 mx-[12px] h-[50px]"
            placeholder="이름을 입력하세요"
          />

          <label htmlFor="email" className="text-sm mx-4 mt-5">
            이메일
          </label>
          <div className="flex item-center">
            <input
              type="email"
              id="email"
              name="email"
              className="border border text-xs rounded-lg w-[90%] ml-[12px] mr-1 p-3 h-[50px]"
              placeholder="이메일을 입력하세요"
            />
            <button
              type="submit"
              className="text-xs text-gray-600 border bg-gray-300 shadow-lg rounded-lg hover:bg-gray-500 hover:text-white h-[40px] w-[40px] mt-1"
            >
              <div>중복</div>
              <div>확인</div>
            </button>
          </div>

          <label htmlFor="password" className="text-sm mx-4 mt-5">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border text-xs rounded-lg p-3 mx-[12px] h-[50px]"
            placeholder="영문과 숫자를 조합, 8자 이상으로 입력해주세요 "
          />

          <label className="flex items-center space-x-2 mt-3 mb-2 ml-4">
            <input
              type="checkbox"
              id="teacher_register"
              name="teacher_register"
              className="accent-green h-5 w-5"
            />
            <span className="text-sm text-gray-500">강사로 가입하기</span>
          </label>
          <Button
            type="submit"
            className="text-white text-2xl bg-blue-1 rounded-lg shadow-lg shadow-gray-900/30 p-2 m-2 h-[50px] hover:bg-blue-2"
          >
            이메일 회원가입
          </Button>
        </form>
        <Button
          type="submit"
          className="text-2xl text-black bg-koko-1 rounded-lg shadow-lg shadow-gray-900/30 p-2 mb-5 mx-7 h-[50px] hover:bg-koko-2"
        >
          카카오 회원가입
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
