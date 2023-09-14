import { Input } from '@material-tailwind/react';
import useSearch from 'hooks/useSearch';
import React, { ChangeEvent, FormEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

type props = {
  inputText: string;
  setInputText: (newText: string) => void;
  handlerSearch: () => void;
};

const SearchForm = ({ inputText, setInputText, handlerSearch }: props) => {
  const nav = useNavigate();
  useSearch(inputText, [], []);

  const handleFormSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handlerSearch();
    nav('/');
  };
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setInputText(newText);
  };

  return (
    <form id="myForm" className="relative flex w-full gap-2 w-100% mb-5">
      <Input
        type="text"
        label="Search..."
        value={inputText}
        onChange={handlerInput}
        crossOrigin={undefined}
      />
      <button
        className="absolute right-0 m-2 text-xl cursor-pointer text-gray-3"
        type="submit"
        onClick={handleFormSubmit}
      >
        <AiOutlineSearch />
      </button>
    </form>
  );
};

export default SearchForm;
