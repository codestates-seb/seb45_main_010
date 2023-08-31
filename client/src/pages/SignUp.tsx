import React from 'react';

const SignUpForm: React.FC = () => {
  return (
    <div className="flex flex-col item-center justify-center">
      <div className="text-center font-bold text-2xl my-4">회원가입</div>
      <form className="flex flex-col gap-2 p-4 rounded-lg bg-mint-1 mx-3">
        <label htmlFor="name" className="text-sm mt-4">
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
        <input
          type="email"
          id="email"
          name="email"
          className="border border text-xs rounded-lg p-2"
          placeholder="이메일을 입력하세요"
        />

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

        <label className="flex items-center space-x-2 py-4 ml-2">
          <input
            type="checkbox"
            id="teacher_register"
            name="teacher_register"
            className="accent-green h-6 w-6 "
          />
          <span className="text-sm text-gray-500 justify-content">강사로 가입하기</span>
        </label>
        <button
          type="submit"
          className="m-2 text-white font-bold bg-blue-1 hover:bg-blue-2 rounded-lg p-2"
        >
          이메일로 가입하기
        </button>
        <button type="submit" className="m-2 font-bold bg-koko-1 hover:bg-koko-2 rounded-lg p-2">
          카카오로 가입하기
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
