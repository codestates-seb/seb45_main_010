import { Card } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import SearchSelect from './SearchSelect';

type props = {
  handlerSearch: () => void;
};

export const Search = ({ handlerSearch }: props) => {
  const [inputText, setInputText] = useState<string>('');
  const [searchList, setSearchList] = useState<string[]>([]);

  useEffect(() => {
    setInputText(searchList.join(','));
  }, [searchList]);

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
          setSearchList={setSearchList}
        />
      </Card>
    </>
  );
};
