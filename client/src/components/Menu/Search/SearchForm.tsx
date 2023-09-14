import { Input } from '@material-tailwind/react';
import { search } from 'configs/Listpage/config';
import { useAppDispatch } from 'hooks/hooks';
import React, { ChangeEvent, FormEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { getData } from 'redux/thunk/ListPageThunk';

type props = {
  inputText: string;
  setInputText: (newText: string) => void;
  handlerSearch: () => void;
};

const SearchForm = ({ inputText, setInputText, handlerSearch }: props) => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const handleFormSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handlerSearch();
    search.teacherName = inputText;
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
