import React from 'react';
import { Select, Option } from '@material-tailwind/react';

type props = {
  searchList: string[];
  setSearchList: (newSearch: string[]) => void;
};

const SearchSelect = ({ searchList, setSearchList }: props) => {
  const handlerSearching = (e: React.MouseEvent<HTMLLIElement>) => {
    const newText: string = e.currentTarget.innerHTML;
    const newSearch: string[] = Array.from(new Set([...searchList, newText]));

    setSearchList(newSearch);
  };

  return (
    <>
      <div className="mb-3">
        <Select label="과목" size="lg">
          <Option onClick={handlerSearching}>국어</Option>
          <Option onClick={handlerSearching}>수학</Option>
        </Select>
      </div>
      <div className="mb-3">
        <Select label="지역" size="lg">
          <Option onClick={handlerSearching}>서울</Option>
          <Option onClick={handlerSearching}>제주</Option>
        </Select>
      </div>
    </>
  );
};

export default SearchSelect;
