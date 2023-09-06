import React from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';

const Private: React.FC = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex p-4">
        <div className="flex flex-col justify-center item-center">
          {/* <img src={Thumbnail} className="m-2 mx-6 rounded-lg h-14 w-14" /> */}
          <div className="relative flex flex-col justify-end item-center">
            <div className="absolute bottom-0 right-0 bg-gray-100 rounded-full h-7 w-7 opacity-80">
              <AiFillCamera className="h-5 w-5 absolute bottom-1.5 right-1" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="m-1 text-2xl">홍길동</div>
        </div>
      </div>
      <div className="flex-col pl-10">
        <div className="text-xm">이메일</div>
        <div className="text-xs">ljedoc@gmail.com</div>
      </div>

      <div className="flex-col mx-8 my-5">
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

      <div className="flex-col mx-8 my-5">
        <div className="text-xm">비밀번호</div>
        <form className="flex gap-1 rounded-lg">
          <input
            type="test"
            className="border text-xs h-[50px] border-blue-800/60 rounded-lg w-80 p-2"
            placeholder="*********"
          />
          <button type="submit" className="">
            <FiSend />
          </button>
        </form>
      </div>

      <div className="flex-col mx-8 my-5">
        <div className="text-xm">전화번호</div>
        <form className="flex gap-1 rounded-lg">
          <input
            type="test"
            className="border text-xs h-[50px] border-blue-800/60 rounded-lg w-80 p-2"
            placeholder="01023456789"
          />
          <button type="submit" className="">
            <FiSend />
          </button>
        </form>
        <div className="p-1 text-xs text-gray-700">전화번호는 숫자로만 입력해주세요</div>
      </div>
    </div>
  );
};

export default Private;
