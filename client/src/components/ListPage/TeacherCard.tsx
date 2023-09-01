import React from 'react';
import { test } from 'configs/List/config';

const TeacherCard = () => {
  return (
    <div className=" w-[375px] flex flex-col items-center">
      {test.map((teacher, key) => {
        const isOnOff: string =
          teacher.classMethod.onLine && teacher.classMethod.offLine
            ? '온/오프'
            : teacher.classMethod.onLine
            ? '온라인'
            : '오프라인';

        return (
          <section
            key={key}
            className="w-[350px] h-[82px] shadow-md border-2 border-grey-2 
                    bg-mint-3 rounded-xl p-2 text-xs flex-row flex justify-between mb-5
                     duration-500  hover:scale-105 hover:shadow-black cursor-pointer active:bg-mint-4"
          >
            <span className="w-16 h-6 px-2 py-1 m-1 text-center text-black cursor-auto bg-mint-2 rounded-xl">
              {isOnOff}
            </span>
            <span className="flex flex-col items-center ">
              <h1 className="mb-2">수업 종류</h1>
              <ul className="grid grid-cols-2 m-1 text-center ">
                {teacher.category.slice(0, 4).map((category, key) => (
                  <li className="px-1" key={key}>
                    {category.length > 4 ? `${category.slice(0, 4)}...` : category}
                  </li>
                ))}
              </ul>
            </span>
            <span className="flex flex-col items-center ">
              <h1 className="mb-2">지역</h1>
              <ul className="grid grid-cols-2 m-1 text-center ">
                {teacher.area.slice(0, 4).map((area, key) => (
                  <li className="px-1" key={key}>
                    {area.length > 4 ? `${area.slice(0, 4)}...` : area}
                  </li>
                ))}
              </ul>
            </span>

            <div className="flex flex-col items-center">
              <img src={teacher.user} className="w-[25px] h-[25px] rounded-lg" />
              <span>{teacher.name}</span>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default TeacherCard;
