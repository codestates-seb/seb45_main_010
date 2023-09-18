import { ListPageType } from 'Types/Types';
import React from 'react';
import { Link } from 'react-router-dom';

type props = {
  cardList: ListPageType[];
};

const TeacherCard = ({ cardList }: props) => {
  return (
    <div className=" w-full flex flex-col items-center px-[7.5px]">
      {cardList?.map((items) => {
        const isOnOff: string =
          items.onLine && items.offLine ? '온/오프' : items.onLine ? '온라인' : '오프라인';

        return (
          <Link to={`/${items.id}`} key={items.id}>
            <section
              className="w-[350px] h-[82px] shadow-md border-2 border-gray-2 
                    bg-mint-300 rounded-xl p-2 text-xs flex-row flex justify-between mb-5
                     duration-500  hover:scale-105  cursor-pointer hover:bg-mint-400"
            >
              <span className="w-16 h-6 px-2 py-1 m-1 text-center text-black cursor-auto bg-mint-200 rounded-xl">
                {isOnOff}
              </span>
              <span className="flex flex-col items-center ">
                <h1 className="mb-2">수업 종류</h1>
                <ul className="grid grid-cols-2 m-1 text-center ">
                  {items.subjects?.slice(0, 4).map((category, index) => (
                    <li className="px-1 text-xxs" key={index}>
                      {category.length > 4 ? `${category.slice(0, 4)}...` : category}
                    </li>
                  ))}
                </ul>
              </span>
              <span className="flex flex-col items-center ">
                <h1 className="mb-2">지역</h1>
                <ul className="grid grid-cols-2 m-1 text-center ">
                  {items.regions?.slice(0, 4).map((area, index) => (
                    <li className="px-1 text-xxs" key={index}>
                      {area.length > 4 ? `${area.slice(0, 4)}...` : area}
                    </li>
                  ))}
                </ul>
              </span>

              <div className="flex flex-col items-center">
                <img src={items.profileImg || ''} className="w-[25px] h-[25px] rounded-lg" />
                <span>{items.name}</span>
              </div>
            </section>
          </Link>
        );
      })}
    </div>
  );
};

export default TeacherCard;
