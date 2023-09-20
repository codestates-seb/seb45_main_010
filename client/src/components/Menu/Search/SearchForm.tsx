import { Button, Input } from '@material-tailwind/react';
import { search } from 'configs/Listpage/config';
import { useAppDispatch } from 'hooks/hooks';
import React, { ChangeEvent, FormEvent, useState } from 'react';
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
    search.regions = regionsList;
    search.subjects = subjectList;
    dispatch(getData(search));
    nav('/');
  };
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setInputText(newText);
  };
  const handleInitialization = () => {
    search.teacherName = '';
    search.regions = [];
    search.subjects = [];
  };
  return (
    <>
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
          <span className="flex justify-centermt-2">
            <Button
              type="submit"
              onClick={handleFormSubmit}
              className="flex items-center justify-center mx-3 text-base text-black w-36 bg-mint-200"
            >
              검색하기
            </Button>

            <Button
              type="submit"
              onClick={handleInitialization}
              className="flex items-center justify-center mx-3 text-base text-black w-36 bg-mint-200"
            >
              검색 초기화
            </Button>
          </span>
        </div>
      </form>
    </>
  );
};

export default SearchForm;
