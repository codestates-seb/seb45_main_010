import React from 'react';

const SignUp: React.FC = () => {
  return (
    <div className="flex flex-col item-center justify-center">
      <div className="text-center font-bold text-2xl mb-4">회원가입</div>
      <div className="flex flex-col item-center justify-center mx-3 py-6 bg-mint-1 rounded-lg">
        <form className="flex flex-col gap-2 p-4 rounded-lg">
          <label htmlFor="name" className="text-sm">
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border text-xs rounded-lg p-2"
            placeholder="이름을 입력하세요"
          />

          <label htmlFor="email" className="text-sm mt-4">
            이메일
          </label>
          <div className="flex item-center">
            <input
              type="email"
              id="email"
              name="email"
              className="border border text-xs rounded-lg w-11/12 p-2"
              placeholder="이메일을 입력하세요"
            />
            <button
              type="submit"
              className="text-gray-600 h-8 w-8 border bg-gray-300 rounded-lg hover:bg-gray-500 ml-1"
              style={{ fontSize: '8px' }}
            >
              <div>중복</div>
              <div>확인</div>
            </button>
          </div>

          <label htmlFor="password" className="text-sm mt-4">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border border text-xs rounded-lg p-2"
            placeholder="비밀번호를 입력하세요"
          />

          <label className="flex items-center space-x-2 py-3 ml-2">
            <input
              type="checkbox"
              id="teacher_register"
              name="teacher_register"
              className="accent-green h-6 w-6"
            />
            <span className="text-sm text-gray-500">강사로 가입하기</span>
          </label>
          <button
            type="submit"
            className="m-2 text-white font-bold bg-blue-1 hover:bg-blue-2 rounded-lg p-2"
          >
            이메일로 가입하기
          </button>
        </form>
        <button
          type="submit"
          className="m-6 mt-4 font-bold bg-koko-1 hover:bg-koko-2 rounded-lg p-2"
        >
          카카오로 가입하기
        </button>
      </div>
    </div>
  );
};

export default SignUp;
