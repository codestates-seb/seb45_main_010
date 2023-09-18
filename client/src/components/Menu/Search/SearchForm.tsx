import { Input } from '@material-tailwind/react';
import { search } from 'configs/Listpage/config';
import { useAppDispatch } from 'hooks/hooks';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { getData } from 'redux/thunk/ListPageThunk';

type props = {
  regionsList: string[];
  subjectList: string[];
  handlerSearch: () => void;
};

const SearchForm = ({ regionsList, subjectList, handlerSearch }: props) => {
  const [inputText, setInputText] = useState<string>('');

  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const handleFormSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handlerSearch();
    search.teacherName = inputText;
    search.regionsNames = regionsList;
    search.subjectNames = subjectList;
    dispatch(getData(search));
    nav('/');
  };
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setInputText(newText);
  };

  return (
    <form id="myForm">
      <div className="relative flex w-full flex-col  gap-2 w-100% mb-5">
        <h1 className="pl-1">강사 검색</h1>
        <Input
          type="text"
          label="강사의 이름을 입력해 주세요."
          value={inputText}
          onChange={handlerInput}
          crossOrigin={undefined}
        />
        <button
          className="absolute bottom-0 right-0 m-2 text-xl cursor-pointer text-gray-3"
          type="submit"
          onClick={handleFormSubmit}
        >
          <AiOutlineSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
