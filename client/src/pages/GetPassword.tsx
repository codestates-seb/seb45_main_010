import React from 'react';

const GetPassword: React.FC = () => {
  return (
    <div className="flex flex-col item-center justify-center">
      <div className="text-center font-bold text-2xl my-4">비밀번호 찾기</div>
      <div className="flex flex-col item-center justify-center mx-3 py-6 bg-mint-1 rounded-lg">
        <div className="text-xs text-gray-950 px-5 mb-2">가입된 이메일을 입력해주세요</div>
        <div className="text-xs text-gray-950 px-5">
          이메일을 통해 비밀번호를 확인하실수 있습니다
        </div>
        <form className="flex flex-col gap-1 p-4 rounded-lg">
          <label htmlFor="email" className="text-sm mt-3">
            이메일 입력
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border text-xs rounded-lg p-2 mb-3"
            placeholder="이메일을 입력하세요"
          />
          <button
            type="submit"
            className="m-1 mt-8 text-white font-bold bg-blue-1 hover:bg-blue-2 rounded-lg p-2"
          >
            요청보내기
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetPassword;
