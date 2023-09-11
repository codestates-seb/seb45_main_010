import React from 'react';
import userExampleImage from '/assets/Image/user-example.png';
import { DetailType } from 'Types/Types';

type props = Pick<DetailType, 'name' | 'img' | 'classMethod' | 'category' | 'area'>;

const TeacherInfo1 = () => {
  return (
    <article className="mb-10 border-b-2 border-grey-1 px-[7.5px]">
      <section className="flex flex-row items-center gap-6 ">
        <img
          src={userExampleImage}
          className="border rounded-full w-14 h-14 border-mint-2"
          alt="프로필이미지"
        ></img>
        <div className="flex flex-col gap-2">
          <p className="ml-3 text-2xl">홍길동</p>
          <div className="font-normal text-[#8E98A8] text-xs ml-[75px] mt-[-10px]">강사님</div>
        </div>
      </section>
      <section className="flex justify-end gap-5 m-10 mt-5">
        <div className="flex items-center justify-center p-2 text-sm rounded-lg bg-mint-3">
          온라인
        </div>
      </section>
      <section className="flex flex-wrap items-center gap-4 mt-4">
        <div className="flex items-center justify-center gap-2 p-2 text-sm font-bold text-black border-2 rounded-xl h-9 basis-1/5 border-mint-2">
          과목
        </div>
        <div className="right-0 flex flex-wrap gap-4 text-xs basis-3/5">
          <div className="flex justify-center h-8 gap-1 font-bold w-[45px] p-2 text-black bg-mint-2 rounded-xl">
            국어
          </div>
          <div className="flex justify-center h-8 gap-1 font-bold w-[45px] p-2 text-black bg-mint-2 rounded-xl">
            수학
          </div>
        </div>
      </section>
      <section className="flex flex-wrap items-center gap-4 mt-4 mb-10">
        <div className="flex items-center justify-center gap-2 p-2 text-sm font-bold text-black border-2 rounded-xl h-9 basis-1/5 border-mint-2">
          지역
        </div>
        <div className="right-0 flex flex-wrap gap-4 text-xs basis-3/5">
          <div className="flex justify-center h-8 gap-1 font-bold w-[45px] p-2 text-black bg-mint-2 rounded-xl">
            서울
          </div>
          <div className="flex justify-center h-8 gap-1 font-bold w-[45px] p-2 text-black bg-mint-2 rounded-xl">
            강남
          </div>
          <div className="flex justify-center h-8 gap-1 font-bold w-[45px] p-2 text-black bg-mint-2 rounded-xl">
            제주
          </div>
        </div>
      </section>
    </article>
  );
};

export default TeacherInfo1;
