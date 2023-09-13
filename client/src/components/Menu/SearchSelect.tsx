import React, { MouseEvent } from 'react';
import { Menu, MenuHandler, Button, MenuList, MenuItem } from '@material-tailwind/react';

type props = {
  searchList: string[];
  setSearchList: (newSearch: string[]) => void;
};

const SearchSelect = ({ searchList, setSearchList }: props) => {
  const handlerSearching = (e: MouseEvent) => {
    const newText: string = e.currentTarget.innerHTML;
    const newSearch: string[] = Array.from(new Set([...searchList, newText]));

    setSearchList(newSearch);
  };

  return (
    <>
      <div className="flex justify-center py-3 mb-4">
        <Menu>
          <MenuHandler>
            <Button className="w-full mx-1 text-base text-black bg-mint-300 hover:bg-mint-400">
              과목 검색
            </Button>
          </MenuHandler>
          <MenuList>
            <MenuItem onClick={handlerSearching}>수학</MenuItem>
            <MenuItem onClick={handlerSearching}>국어</MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuHandler>
            <Button className="w-full mx-1 text-base text-black bg-mint-300 hover:bg-mint-400">
              지역 검색
            </Button>
          </MenuHandler>
          <MenuList>
            <MenuItem onClick={handlerSearching}>수학</MenuItem>
            <MenuItem onClick={handlerSearching}>국어</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </>
  );
};

export default SearchSelect;
