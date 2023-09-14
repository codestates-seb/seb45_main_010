import React, { MouseEvent } from 'react';
import { Menu, MenuHandler, Button, MenuList, MenuItem } from '@material-tailwind/react';
import { BsXCircle } from 'react-icons/bs';

type props = {
  regionsList: string[];
  subjectList: string[];
  setSubjectList: (newSearch: string[]) => void;
  setRegionsList: (newSearch: string[]) => void;
};

const SearchSelect = ({ regionsList, subjectList, setSubjectList, setRegionsList }: props) => {
  const handlerSubjectList = (e: MouseEvent) => {
    const newText: string = e.currentTarget.innerHTML;
    const newList: string[] = Array.from(new Set([...subjectList, newText]));
    setSubjectList(newList);
  };
  const handlerRegionsList = (e: MouseEvent) => {
    const newText: string = e.currentTarget.innerHTML;
    const newList: string[] = Array.from(new Set([...regionsList, newText]));
    setRegionsList(newList);
  };

  const delSubjectList = (delElment: string) => {
    const newList: string[] = subjectList.filter((item) => item !== delElment);
    setSubjectList(newList);
  };
  const delRegionsList = (delElment: string) => {
    const newList: string[] = regionsList.filter((item) => item !== delElment);
    setRegionsList(newList);
  };

  return (
    <>
      <article className="flex flex-col py-3 mb-4">
        <section>
          <Menu>
            <MenuHandler className="w-full mb-5 text-base shadow-blue-gray-200 text-blue-gray-900 bg-mint-300 hover:bg-mint-400">
              <Button children={'과목검색'} />
            </MenuHandler>
            <MenuList>
              <MenuItem onClick={handlerSubjectList}>수학</MenuItem>
              <MenuItem onClick={handlerSubjectList}>국어</MenuItem>
              <MenuItem onClick={handlerSubjectList}>영어</MenuItem>
            </MenuList>
          </Menu>
          {subjectList?.map((itme, index) => {
            return (
              <span
                key={index}
                className="relative inline-flex items-end justify-end m-1 cursor-pointer"
                onClick={() => delSubjectList(itme)}
              >
                <Button
                  className="py-1 pl-3 pr-6 text-sm text-left text-black bg-mint-300 rounded-2xl hover:bg-mint-400"
                  children={itme}
                />
                <BsXCircle className="absolute bottom-1.5 right-1" />
              </span>
            );
          })}
        </section>
        <section>
          <Menu>
            <MenuHandler className="w-full my-5 text-base shadow-blue-gray-200 text-blue-gray-900 bg-mint-300 hover:bg-mint-400">
              <Button children={'지역검색'} />
            </MenuHandler>
            <MenuList>
              <MenuItem onClick={handlerRegionsList}>중구</MenuItem>
              <MenuItem onClick={handlerRegionsList}>송파구</MenuItem>
              <MenuItem onClick={handlerRegionsList}>강남구</MenuItem>
            </MenuList>
          </Menu>
          {regionsList?.map((itme, index) => {
            return (
              <span
                key={index}
                className="relative inline-flex items-end justify-end m-1 cursor-pointer"
                onClick={() => delRegionsList(itme)}
              >
                <Button
                  className="py-1 pl-3 pr-6 text-sm text-left text-black bg-mint-300 rounded-2xl hover:bg-mint-400"
                  children={itme}
                />
                <BsXCircle className="absolute bottom-1.5 right-1" />
              </span>
            );
          })}
        </section>
      </article>
    </>
  );
};

export default SearchSelect;
