import { Card } from '@material-tailwind/react';
import { Input, Select, Option } from '@material-tailwind/react';
import { FormEvent, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

type props = {
  handlerSearch: () => void;
};

export const Search = ({ handlerSearch }: props) => {
  const [searchList, setSearchList] = useState<string>('');
  const [newSearch, setNewSearch] = useState<string[]>([]);

  useEffect(() => {
    setSearchList(newSearch.join(','));
  }, [newSearch]);

  const searchHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    setNewSearch((pre) => {
      const updatedSearch = [...pre, target.innerHTML];
      const newData: string[] = Array.from(new Set(updatedSearch));
      return newData;
    });
  };

  const formSearch = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const inputData = [forminput.value];
    setNewSearch(inputData);
  };

  return (
    <>
      <div
        className="absolute top-0 w-full h-full bg-black bg-opacity-10 "
        onClick={handlerSearch}
      ></div>
      <Card className="w-[350px] p-2 shadow-xl top-3 absolute m-3">
        <form id="myForm">
          <div className="mb-3">
            <Select label="과목" size="lg">
              <Option onClick={searchHandler}>국어</Option>
              <Option onClick={searchHandler}>수학</Option>
            </Select>
          </div>
          <div className="mb-3">
            <Select label="지역" size="lg">
              <Option onClick={searchHandler}>서울</Option>
              <Option onClick={searchHandler}>제주</Option>
            </Select>
          </div>
          <div className="relative flex w-full gap-2 w-100%">
            <Input
              type="text"
              label="Search..."
              id="forminput"
              defaultValue={searchList}
              crossOrigin={undefined}
            />
            <button
              className="absolute right-0 m-2 text-xl cursor-pointer text-gray-3"
              type="submit"
              onClick={formSearch}
            >
              <AiOutlineSearch />
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};
