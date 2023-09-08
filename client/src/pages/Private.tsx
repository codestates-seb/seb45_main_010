import React from 'react';
import Thumbnail from '../assets/모네-수련.jpeg';
import { AiFillCamera } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';

const Private: React.FC = () => {
  return (
    <div className="flex flex-col justify-center px-[12.5px]">
      <div className="flex mb-2">
        <div className="flex flex-row justify-center item-center">
          <img src={Thumbnail} className="m-3 rounded-lg h-14 w-14" />
          <div className="flex items-end">
            <div className="flex items-center justify-center bg-gray-100 rounded-full cursor-pointer w-7 h-7 opacity-80">
              <AiFillCamera className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="m-1 text-2xl">홍길동</div>
        </div>
      </div>
      <div className="flex-col mb-1 px-7">
        <div className="text-sm">이메일</div>
        <div className="text-sm">ljedoc@gmail.com</div>
      </div>

      <div className="flex-col my-5">
        <div className="text-xm">이름</div>
        <form className="flex gap-1 rounded-lg">
          <input
            type="test"
            className="border text-xs h-[50px] border-blue-800/60 rounded-lg w-80 p-2"
            placeholder="홍길동"
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
            type="test"
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
            type="test"
            className="border text-sm h-[50px] border-blue-800/60 rounded-lg w-80 p-2"
            placeholder="01023456789"
          />
          <button type="submit" className="">
            <FiSend />
          </button>
        </form>
        <div className="p-1 text-sm text-gray-700">전화번호는 숫자로만 입력해주세요</div>
      </div>
    </div>
  );
};

export default Private;
