import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="flex flex-col item-center justify-center">
      <div className="text-center font-bold text-2xl my-4">로그인</div>
      <div className="flex flex-col item-center justify-center mx-3 py-6 bg-mint-1 rounded-lg">
        <form className="flex flex-col gap-1 p-4 rounded-lg">
          <label htmlFor="email" className="text-sm mt-3">
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border text-xs rounded-lg p-2 mb-3"
            placeholder="이메일을 입력하세요"
          />
          <label htmlFor="password" className="text-sm mt-3">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border text-xs rounded-lg p-2 mb-3"
            placeholder="비밀번호를 입력하세요"
          />
          <button
            type="submit"
            className="m-1 mt-8 text-white font-bold bg-blue-1 hover:bg-blue-2 rounded-lg p-2"
          >
            이메일로 로그인
          </button>
        </form>
        <div className="flex item-center justify-center">
          <div className="text-xs text-gray-600 p-3">비밀번호 찾기</div>
          <div className="text-xs text-gray-600 p-3">|</div>
          <div className="text-xs text-gray-600 p-3">회원 가입</div>
        </div>
        <button
          type="submit"
          className="m-5 mt-4 font-bold bg-koko-1 hover:bg-koko-2 rounded-lg p-2"
        >
          카카오로 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
