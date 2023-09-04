import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent } from 'react';
import { Button } from '@material-tailwind/react';
import axios from 'axios';

export type Member = {
  name: string;
  email: string;
  password: string;
  teacher: boolean;
};

const SignUp: React.FC = () => {
  const [userName, setUserName] = useState<string>(''); //이름입력
  const [userEmail, setUserMail] = useState<string>(''); //이메일입력
  const [userPassword, setUserPassword] = useState<string>(''); //비번입력
  const [isTeacher, setIsTeacher] = useState<boolean>(false); //강사여부
  const [registerable, setResiterable] = useState<boolean>(false); //등록가능여부
  const [checkEmail, setCheckEmail] = useState<boolean>(false); //이메일중복확인
  const [userInfo, setUserInfo] = useState<Member>({
    //회원가입정보
    name: '',
    email: '',
    password: '',
    teacher: false,
  });

  const navigate = useNavigate();
  const isValidEmail: boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);
  const isValiePassword: boolean = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword);

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setUserName(e.target.value);
    console.log(userName);
  };

  const handleuserEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setUserMail(e.target.value);
    console.log(userEmail);
  };

  const handleuserPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setUserPassword(e.target.value);
    console.log(userPassword);
  };

  const handleEmailCheck = async (userEmail: string) => {
    if (!isValidEmail) {
      alert('유효한 이메일을 입력해주세요');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/verify`);
      console.log(response.data); //등록된 이메일
      console.log(userEmail); //새로 입력한 이메일
      console.log(response.data.indexOf(userEmail)); // 새로운 이메일이 기존 데이터에 있는지
      const isDuplicate = response.data.indexOf(userEmail) !== -1; // 중복시 true
      console.log(isDuplicate);
      if (isDuplicate === false) {
        console.log('등록가능 이메일');
        setResiterable(true);
        setCheckEmail(true);
      } else {
        console.log('등록불가 이메일');
        setResiterable(false);
        setCheckEmail(false);
      }
    } catch (error) {
      console.log('이메일 중복체크 통신오류', error);
    }
  };

  useEffect(() => {
    if (userInfo.name && userInfo.email && userInfo.password && !userInfo.teacher) {
      axios
        .post('http://localhost:8080/students', userInfo)
        .then((response) => {
          console.log('회원가입 비동기요청', response.data);
        })
        .catch((error) => {
          console.log('회원가입 비동기요청', error);
        });
    } else if (userInfo.name && userInfo.email && userInfo.password && userInfo.teacher) {
      axios
        .post('http://localhost:8080/teachers', userInfo)
        .then((response) => {
          console.log('회원가입 비동기요청', response.data);
        })
        .catch((error) => {
          console.log('회원가입 비동기요청', error);
        });
    }
  }, [userInfo]);

  const handleTeacherRegister = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    setIsTeacher(e.target.checked);
    console.log(isTeacher);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName || !userEmail || !userPassword) {
      alert('이름, 이메일, 비밀번호를 모두 입력하세요.');
      return;
    }

    if (!registerable) {
      alert('이메일 중복을 확인해 주세요');
      return;
    }

    if (!isValiePassword) {
      alert('고객님의 정보보안을 위해 비밀번호는 영문과 숫자를 조합하여 8자 이상으로 입력해주세요');
      return;
    }

    setUserInfo({
      name: userName,
      email: userEmail,
      password: userPassword,
      teacher: isTeacher,
    });

    console.log('Submit', userInfo);
    setUserName('');
    setUserMail('');
    setUserPassword('');
    setIsTeacher(false);
    setCheckEmail(false);
    setResiterable(false);

    alert('회원가입을 축하드립니다');
    navigate('/login');
  };

  console.log(checkEmail, registerable);
  return (
    <div className="flex flex-col item-center justify-center m-[12.5px]">
      <div className="text-center font-bold text-2xl mb-4">회원가입</div>
      <div className="flex flex-col item-center justify-center mx-3 py-3 rounded-lg">
        <form className="flex flex-col gap-2 p-4 m-1 rounded-lg" onSubmit={handleSubmit}>
          <label htmlFor="name" className="text-sm mx-4">
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border text-xs rounded-lg p-3 mx-[12px] h-[50px]"
            placeholder="이름을 입력하세요"
            value={userName}
            onChange={handleUserNameChange}
          />

          <label htmlFor="email" className="text-sm mx-4 mt-5">
            이메일
          </label>
          <div className="flex item-center">
            <input
              type="email"
              id="email"
              name="email"
              className="border text-xs rounded-lg w-[90%] ml-[12px] mr-1 p-3 h-[50px]"
              placeholder="이메일을 입력하세요"
              value={userEmail}
              onChange={handleuserEmailChange}
            />
            <button
              type="button"
              className="text-xs text-gray-600 border bg-gray-300 shadow-lg 
              rounded-lg hover:bg-gray-500 hover:text-white h-[40px] w-[40px] mt-1"
              onClick={() => handleEmailCheck(userEmail)}
            >
              <div>중복</div>
              <div>확인</div>
            </button>
          </div>
          <div>
            {checkEmail === true && registerable === true ? (
              <div className="text-gray-2 text-xs ml-4">등록 가능한 이메일입니다.</div>
            ) : checkEmail === true && registerable === false ? (
              <div className="text-red text-xs ml-4">이미 등록된 이메일입니다.</div>
            ) : null}
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
            value={userPassword}
            onChange={handleuserPasswordChange}
          />

          <label className="flex items-center space-x-2 mt-3 mb-2 ml-4">
            <input
              type="checkbox"
              id="teacher_register"
              name="teacher_register"
              className="accent-green h-5 w-5"
              checked={isTeacher}
              onChange={handleTeacherRegister}
            />
            <span className="text-sm text-gray-500">강사로 가입하기</span>
          </label>
          <Button
            type="submit"
            className="text-white text-xl bg-blue-1 rounded-lg shadow-lg shadow-gray-900/30 p-2 m-2 h-[50px] hover:bg-blue-2"
          >
            이메일 회원가입
          </Button>
        </form>
        <Button
          type="submit"
          className="text-xl text-black bg-koko-1 rounded-lg shadow-lg shadow-gray-900/30 p-2 mb-5 mx-7 h-[50px] hover:bg-koko-2"
        >
          카카오 회원가입
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
