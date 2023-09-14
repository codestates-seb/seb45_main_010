import { Card } from '@material-tailwind/react';
import { useState } from 'react';
import SearchForm from './SearchForm';
import SearchSelect from './SearchSelect';

type props = {
  handlerSearch: () => void;
};

export const Search = ({ handlerSearch }: props) => {
  const [inputText, setInputText] = useState<string>('');
  const [searchList, setSearchList] = useState<string[]>([]);

  return (
    <>
      <div
        className="absolute top-0 w-full h-full bg-black bg-opacity-10 backdrop-blur-sm"
        onClick={handlerSearch}
      ></div>
      <Card className="w-[350px] p-2 shadow-2xl top-3 absolute mt-20 mx-3 z-50">
        <SearchSelect searchList={searchList} setSearchList={setSearchList} />
        <SearchForm
          inputText={inputText}
          setInputText={setInputText}
          handlerSearch={handlerSearch}
        />
      </Card>
    </>
  );
};
