import React from 'react';

type Props = {
  title: string;
  category: string[];
};

const CardCategory = ({ title, category }: Props) => {
  return (
    <span className="flex flex-col items-center mx-1 text-center rounded-xl w-28 bg-mint-200">
      <h1 className="mb-1 ">{title}</h1>
      <ul className="grid w-full grid-cols-2 mx-1 border-t-2 border-mint-300">
        {category.length === 0
          ? '없음'
          : category.slice(0, 3).map((category, index) => (
              <li className="px-1 text-xxs" key={index}>
                {category.length > 3 ? `${category.slice(0, 3)}...` : category}
              </li>
            ))}
      </ul>
    </span>
  );
};

export default CardCategory;
