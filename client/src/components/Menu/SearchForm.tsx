import { Input } from '@material-tailwind/react';
import React, { ChangeEvent, FormEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

type props = {
  inputText: string;
  setInputText: (newText: string) => void;
  setSearchList: (inputText: string[]) => void;
};

const SearchForm = ({ inputText, setInputText, setSearchList }: props) => {
  const handleFormSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchList(inputText.split(','));
  };
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setInputText(newText);
  };

  return (
    <form id="myForm">
      <div className="relative flex w-full gap-2 w-100%">
        <Input
          type="text"
          label="Search..."
          defaultValue={inputText}
          crossOrigin={undefined}
          onChange={handlerInput}
        />
        <button
          className="absolute right-0 m-2 text-xl cursor-pointer text-gray-3"
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
