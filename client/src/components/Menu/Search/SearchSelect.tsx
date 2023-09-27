import React, { MouseEvent, useEffect, useState } from 'react';
import { Menu, MenuHandler, Button, MenuList, MenuItem } from '@material-tailwind/react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { getRegionsList, getSubjectList } from 'redux/thunk/SearchListThink';
import { selectSubject } from 'redux/slice/SubjectSlice';
import { regionsListType, subjectListType } from 'Types/Types';
import { selectRegion } from 'redux/slice/RegionsSlice';

type props = {
  regionsList: string[];
  subjectList: string[];
  setSubjectList: (newSearch: string[]) => void;
  setRegionsList: (newSearch: string[]) => void;
};

const SearchSelect = ({ regionsList, subjectList, setSubjectList, setRegionsList }: props) => {
  const dispatch = useAppDispatch();
  const subject = useAppSelector(selectSubject);
  const region = useAppSelector(selectRegion);
  const [subjects, setSubjects] = useState<subjectListType[]>([]);
  const [regions, setRegions] = useState<regionsListType[]>([]);

  useEffect(() => {
    dispatch(getSubjectList());
    dispatch(getRegionsList());
  }, []);

  useEffect(() => {
    if (subject.status === 'fulfilled') {
      setSubjects(subject.value.subjects);
      setRegions(region.value.regions);
    }
  }, [subject, region]);

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
          <Menu
            animate={{
              mount: { y: 0, x: 70 },
              unmount: { y: 0, x: -150 },
            }}
            offset={5}
          >
            <MenuHandler className="flex items-center justify-center w-full h-10 my-2 text-base font-bold bg-white text-blue-gray-300 ">
              <Button variant="text" children={'과목검색'} color="blue" />
            </MenuHandler>
            <MenuList className="max-h-72">
              {subjects?.map((item) => {
                return (
                  <MenuItem
                    key={item.id}
                    onClick={handlerSubjectList}
                    children={item.subjectName}
                  />
                );
              })}
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
                <p className="absolute bottom-0.5 right-2">X</p>
              </span>
            );
          })}
        </section>
        <section>
          <Menu
            animate={{
              mount: { y: 0, x: 70 },
              unmount: { y: 0, x: -150 },
            }}
            offset={5}
          >
            <MenuHandler className="flex items-center justify-center w-full h-10 my-2 text-base font-bold bg-white text-blue-gray-300 ">
              <Button variant="text" children={'지역검색'} color="blue" />
            </MenuHandler>
            <MenuList className="max-h-72">
              {regions?.map((item) => {
                return (
                  <MenuItem key={item.id} onClick={handlerRegionsList} children={item.regionName} />
                );
              })}
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
                <p className="absolute bottom-0.5 right-2">X</p>
              </span>
            );
          })}
        </section>
      </article>
    </>
  );
};

export default SearchSelect;
