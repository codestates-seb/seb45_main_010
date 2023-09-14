import React from 'react';
import userExampleImage from '/assets/Image/user-example.png';
import { DetailType } from 'Types/Types';

type props = {
  teacherInfo: DetailType;
};

const TeacherInfo1 = ({ teacherInfo }: props) => {
  const teachingStyle: string = teacherInfo.onLine
    ? '온라인'
    : teacherInfo.offLine
    ? '오프라인'
    : '온/오프';

  return (
    <article className="mb-10 border-b-2 border-grey-1 px-[7.5px]">
      <section className="flex flex-row items-center gap-6 ">
        <img
          src={teacherInfo.profileImg || userExampleImage}
          className="border rounded-full w-14 h-14 border-mint-200"
          alt="프로필이미지"
        ></img>
        <div className="flex flex-col gap-2">
          <h1 className="ml-3 text-2xl text-center">{teacherInfo.name}</h1>
          <h6 className="font-normal text-end text-[#8E98A8] text-xs ml-[75px] mt-[-10px]">
            강사님
          </h6>
        </div>
      </section>
      <section className="flex justify-end gap-5 m-10 mt-5">
        <p className="flex items-center justify-center px-2 py-1 text-sm rounded-xl bg-mint-200">
          {teachingStyle}
        </p>
      </section>
      <section className="flex flex-wrap items-center gap-4 mt-4">
        <h2 className="flex items-center justify-center gap-2 p-2 text-sm font-bold text-black border-2 rounded-xl h-9 basis-1/5 border-mint-200">
          과목
        </h2>
        <div className="right-0 flex flex-wrap gap-4 text-xs basis-3/5">
          {teacherInfo.subjects?.map((item, index) => {
            return (
              <h5
                key={index}
                className="flex items-center justify-center px-2 py-1 text-sm rounded-xl bg-mint-200"
              >
                {item}
              </h5>
            );
          })}
        </div>
      </section>
      <section className="flex flex-wrap items-center gap-4 mt-4 mb-10">
        <div className="flex items-center justify-center gap-2 p-2 text-sm font-bold text-black border-2 rounded-xl h-9 basis-1/5 border-mint-200">
          지역
        </div>
        <div className="right-0 flex flex-wrap gap-4 text-xs basis-3/5">
          {teacherInfo.regions?.map((item, index) => {
            return (
              <h5
                key={index}
                className="flex items-center justify-center px-2 py-1 text-sm rounded-xl bg-mint-200"
              >
                {item}
              </h5>
            );
          })}
        </div>
      </section>
    </article>
  );
};

export default TeacherInfo1;
