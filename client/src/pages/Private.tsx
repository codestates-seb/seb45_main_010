import React, { useState } from 'react';
import Thumbnail from '../assets/모네-수련.jpeg';
import { AiFillCamera } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { CommonUserType } from '../components/Types/Types';
import axios from 'axios';

type OwnProps = {
  userDetails: CommonUserType;
};

const Private: React.FC<OwnProps> = ({ userDetails }) => {
  const [userInfo, seUserInfo] = useState<CommonUserType>({
    //회원가입정보
    name: userDetails.name,
    email: userDetails.email,
    teacher: userDetails.teacher,
    id: userDetails.id,
    phone: userDetails.phone,
    img: userDetails.img,
  });

  console.log(userDetails);
  console.log(userInfo);
  // const handleImage = () => {
  //   axios
  //     .patch(`http://localhost:8080/${userInfo.id}`)
  //     .then((res) => seUserInfo(res.data))
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className="flex flex-col justify-center px-[12.5px]">
      <div className="flex mb-2">
        <div className="flex flex-col item-center justify-center">
          {!userInfo.img ? (
            <img src={Thumbnail} className="mx-6 rounded-lg h-14 w-14 m-2" />
          ) : (
            <img src={userDetails.img} className="mx-6 rounded-lg h-14 w-14 m-2" />
          )}
        </div>
        <div className="flex flex-col item-center justify-end relative">
          <div className="rounded-full h-7 w-7 bg-gray-100 absolute bottom-0 right-0 opacity-80">
            <AiFillCamera className="h-5 w-5 absolute bottom-1.5 right-1" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-2xl m-1">{userDetails.name}</div>
        </div>
      </div>
      <div className="flex-col px-7 mb-1">
        <div className="text-sm">이메일</div>
        <div className="text-sm">{userDetails.email}</div>
      </div>

      <div className="flex-col my-5">
        <div className="text-xm">이름</div>
        <form className="flex gap-1 rounded-lg">
          <input
            type="text"
            className="border text-xs h-[50px] border-blue-800/60 rounded-lg w-80 p-2"
            placeholder={userDetails.name}
          />
          <button type="submit" className="">
            <FiSend />
          </button>
        </form>
      </div>

      <div className="flex-col my-5">
        <div className="text-sm">비밀번호</div>
        <form className="flex gap-1 rounded-lg">
          <input
            type="text"
            className="border text-sm h-[50px] border-blue-800/60 rounded-lg w-80 p-2"
            placeholder="*********"
          />
          <button type="submit" className="">
            <FiSend />
          </button>
        </form>
      </div>
      <div className="flex-col my-5">
        <div className="text-sm">전화번호</div>
        <form className="flex gap-1 rounded-lg">
          <input
            type="text"
            className="border text-sm h-[50px] border-blue-800/60 rounded-lg w-80 p-2"
            placeholder={
              userDetails.phone === null ? 'your phone number here' : userDetails.phone.toString()
            }
          />
          <button type="submit" className="">
            <FiSend />
          </button>
        </form>
        <div className="text-sm text-gray-700 p-1">전화번호는 숫자로만 입력해주세요</div>
      </div>
    </div>
  );
};

export default Private;
