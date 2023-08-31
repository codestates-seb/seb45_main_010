import React from 'react';
import Thumbnail from '../assets/모네-수련.jpeg';
import { AiFillCamera } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';

const Private: React.FC = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex p-4">
        <div className="flex flex-col item-center justify-center">
          <img src={Thumbnail} className="mx-6 rounded-lg h-14 w-14 m-2" />
          <div className="flex flex-col item-center justify-end relative">
            <div className="rounded-full h-7 w-7 bg-gray-100 absolute bottom-0 right-0 opacity-80">
              <AiFillCamera className="h-5 w-5 absolute bottom-1.5 right-1" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-2xl m-1">홍길동</div>
        </div>
      </div>
      <div className="flex-col pl-6">
        <div className="text-xm">이메일</div>
        <div className="text-xs">ljedoc@gmail.com</div>
      </div>

      <div className="flex-col mx-5 my-5">
        <div className="text-xm">이름</div>
        <form className="flex gap-1 rounded-lg">
          <input
            type="test"
            className="border text-xs  border-blue-800 rounded-lg w-80 p-2"
            placeholder="홍길동"
          />
          <button type="submit" className="">
            <FiSend />
          </button>
        </form>
      </div>

      <div className="flex-col mx-5 my-5">
        <div className="text-xm">비밀번호</div>
        <form className="flex gap-1 rounded-lg">
          <input
            type="test"
            className="border text-xs  border-blue-800 rounded-lg w-80 p-2"
            placeholder="*********"
          />
          <button type="submit" className="">
            <FiSend />
          </button>
        </form>
      </div>

      <div className="flex-col mx-5 my-5">
        <div className="text-xm">전화번호</div>
        <form className="flex gap-1 rounded-lg">
          <input
            type="test"
            className="border text-xs  border-blue-800 rounded-lg w-80 p-2"
            placeholder="01023456789"
          />
          <button type="submit" className="">
            <FiSend />
          </button>
        </form>
        <div className="text-xs text-gray-700 p-1">전화번호는 숫자로만 입력해주세요</div>
      </div>
    </div>
  );
};

export default Private;
