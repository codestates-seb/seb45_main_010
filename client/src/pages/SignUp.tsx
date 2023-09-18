import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent } from 'react';
import { Button, Checkbox } from '@material-tailwind/react';
import { User } from '../Types/Types';
import { SocialModal } from 'components/Modal/SocialModal';
import axios from 'axios';

type MemberSignUp = Pick<User, 'name' | 'email' | 'password' | 'teacher'>;

const SignUp: React.FC = () => {
  const [checkEmail, setCheckEmail] = useState<boolean>(false); //이메일중복확인
  const [registerable, setResiterable] = useState<boolean>(false); //등록가능여부
  const [userInfo, setUserInfo] = useState<MemberSignUp>({
    //회원가입정보
    name: '',
    email: '',
    password: '',
    teacher: false,
  });

  const navigate = useNavigate();
  const isValidEmail: boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email);
  const isValiePassword: boolean = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userInfo.password);
  const apiURL = 'http://ec2-3-34-116-209.ap-northeast-2.compute.amazonaws.com:8080';

  const handleEmailCheck = async (email: string) => {
    if (!isValidEmail) {
      alert('유효한 이메일을 입력해주세요');
      return;
    }

    try {
      const response = await axios.get(`${apiURL}/students/check/${userInfo.email}`);
      console.log(`${apiURL}/students/check/${userInfo.email}`);
      const isDuplicate = response.data.used === true;
      if (isDuplicate === false) {
        setResiterable(true);
        setCheckEmail(true);
      } else {
        setCheckEmail(false);
        setCheckEmail(true);
      }
    } catch (error) {
      console.log('이메일 중복체크 통신오류', error);
      alert('서버와의 통신에 실패했습니다. 잠시후에 다시 시도하여 주세요');
    }
  };

  const handleUserInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    const value = key === 'teacher' ? e.target.checked : e.target.value;
    setUserInfo({
      ...userInfo,
      [key]: value,
    });
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email || !userInfo.password) {
      alert('이름, 이메일, 비밀번호를 모두 입력하세요.');
      return;
    }

    if (!checkEmail) {
      alert('이메일 중복을 확인해 주세요');
      return;
    }

    if (!isValiePassword) {
      alert('고객님의 정보보안을 위해 비밀번호는 영문과 숫자를 조합하여 8자 이상으로 입력해주세요');
      return;
    }

    await axios
      .post(`${apiURL}/${userInfo.teacher ? 'teachers' : 'students'}`, userInfo)
      .then((response) => {
        alert('회원 인증을 위한 링크를 이메일로 발송하였습니다. 인증후에 가입이 완료됩니다.');
        navigate('/login');
      })
      .catch((error) => {
        console.log('회원가입 비동기요청', error);
        alert('통신 장애로 가입요청이 전달되지 않았습니다. 잠시후에 다시 시도하여 주세요');
      });
  };

  return (
    <div className="flex flex-col item-center justify-center px-[12.5px]">
      <div className="text-2xl font-bold text-center">회원가입</div>
      <div className="flex flex-col justify-center py-2 rounded-lg item-center">
        <form className="flex flex-col gap-2 py-4 mb-1 rounded-lg" onSubmit={handleSignUp}>
          <label htmlFor="name" className="text-sm">
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border-2 text-sm rounded-lg p-2 mb-5 h-[50px]"
            placeholder="이름을 입력하세요"
            value={userInfo.name}
            onChange={handleUserInfo}
          />

          <label htmlFor="email" className="text-sm">
            이메일
          </label>
          <div className="flex item-center">
            <input
              type="email"
              id="email"
              name="email"
              className="border-2 text-sm rounded-lg p-2 w-[90%] h-[50px]"
              placeholder="이메일을 입력하세요"
              value={userInfo.email}
              onChange={handleUserInfo}
            />
            <button
              type="button"
              className="text-xs text-gray-600 border bg-gray-300 shadow-lg 
              rounded-lg hover:bg-gray-500 hover:text-white h-[40px] w-[40px] m-1"
              onClick={() => handleEmailCheck(userInfo.email)}
            >
              <div>중복</div>
              <div>확인</div>
            </button>
          </div>
          <div className="mb-3">
            {checkEmail === true && registerable === true ? (
              <div className="text-xs text-gray-800">등록 가능한 이메일입니다.</div>
            ) : checkEmail === true && registerable === false ? (
              <div className="text-xs text-red">이미 등록된 이메일입니다.</div>
            ) : null}
          </div>

          <label htmlFor="password" className="text-sm">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border-2 text-sm rounded-lg p-2 h-[50px]"
            placeholder="영문과 숫자를 조합, 8자 이상으로 입력해주세요 "
            value={userInfo.password}
            onChange={handleUserInfo}
          />

          {userInfo.teacher === true ? (
            <div className="pt-4 text-xxs text-gray-500">강사로 가입됩니다</div>
          ) : (
            <div className="pt-4 text-xxs text-gray-500">일반회원(학생)으로 가입됩니다</div>
          )}
          <label className="flex items-center pb-2 space-x-2">
            <Checkbox
              crossOrigin={undefined}
              type="checkbox"
              id="teacher"
              name="teacher"
              color="indigo"
              checked={userInfo.teacher}
              onChange={handleUserInfo}
            />
            <span className="text-sm text-gray-700 ">강사로 가입하기</span>
          </label>
          <Button
            type="submit"
            className="text-white border-2 border-blue-1 text-xl bg-blue-1 rounded-lg shadow-lg shadow-gray-900/30 p-1 h-[50px] hover:bg-blue-2"
          >
            이메일 회원가입
          </Button>
        </form>
        <SocialModal />
      </div>
    </div>
  );
};

export default SignUp;
