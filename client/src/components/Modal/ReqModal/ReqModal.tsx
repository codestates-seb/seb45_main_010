import React, { useState } from 'react';
import { Button, Dialog, DialogHeader, DialogFooter } from '@material-tailwind/react';
import { DetailType } from 'Types/Types';
import ReqForm from './ReqForm';

const arr: string[] = ['수학', '국어', '영어'];
const array: string[] = ['서울', '경기', '제주'];
const onOff: string[] = ['온라인', '오프라인'];
//임시

type props = Pick<DetailType, 'category' | 'area' | 'date' | 'classMethod'>;

export const ReqModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCategory, setIsCategory] = useState<boolean[]>([]);
  const [isArea, setIsArea] = useState<boolean[]>([]);
  const [isOnOff, setIsOnOff] = useState<boolean[]>([]);
  const [selectCategory, setSelectCategory] = useState<string[]>([]);
  const [selectArea, setSelectArea] = useState<string[]>([]);
  const [selectOnOff, setSelectOnOff] = useState<string[]>([]);

  const handleOpen = (): void => setIsOpen(!isOpen);

  const handleCategory = (item: string, index: number): void => {
    const newButtonStates: boolean[] = [...isCategory];
    const newItem: string[] = [...selectCategory];
    newButtonStates[index] = !newButtonStates[index];
    newItem[index] = newButtonStates[index] ? item : '';
    const trim = newItem.filter((item) => item !== '');

    setSelectCategory(trim);
    setIsCategory(newButtonStates);
  };

  const handleArea = (item: string, index: number): void => {
    const newButtonStates: boolean[] = [...isArea];
    const newItem: string[] = [...selectArea];
    newButtonStates[index] = !newButtonStates[index];
    newItem[index] = newButtonStates[index] ? item : '';
    const trim = newItem.filter((item) => item !== '');

    setSelectArea(trim);
    setIsArea(newButtonStates);
  };

  const handleOnOff = (item: string, index: number): void => {
    const newButtonStates: boolean[] = [...isOnOff];
    const newItem: string[] = [...selectOnOff];
    newButtonStates[index] = !newButtonStates[index];
    newItem[index] = newButtonStates[index] ? item : '';
    const trim = newItem.filter((item) => item !== '');

    setSelectOnOff(trim);
    setIsOnOff(newButtonStates);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="gradient"
        className="flex items-center h-10 text-sm"
        children="강의 신청하기"
      />
      <Dialog
        size="xs"
        open={isOpen}
        handler={handleOpen}
        className="p-2 overflow-y-scroll max-h-[660px] bg-mint-200 "
      >
        <DialogHeader className="p-2 text-sm ">과목 선택</DialogHeader>
        <section className="flex items-center ">
          {arr.map((item, index) => {
            return (
              <Button
                key={index}
                onClick={() => handleCategory(item, index)}
                className={`${
                  isCategory[index] ? 'bg-gray-3' : 'bg-mint-300'
                } px-3 py-1 m-2 text-sm text-black rounded-2xl `}
                children={item}
              />
            );
          })}
        </section>
        <DialogHeader className="p-2 text-sm ">지역 선택</DialogHeader>
        <section className="flex items-center ">
          {array.map((item, index) => {
            return (
              <Button
                key={index}
                onClick={() => handleArea(item, index)}
                className={`${
                  isArea[index] ? 'bg-gray-3' : 'bg-mint-300'
                } px-3 py-1 m-2 text-sm text-black rounded-2xl `}
                children={item}
              />
            );
          })}
        </section>
        <DialogHeader className="p-2 text-sm">스케줄 선택</DialogHeader>
        <DialogHeader className="p-2 text-sm ">온/오프라인 선택</DialogHeader>
        <section className="flex items-center ">
          {onOff.map((item, index) => {
            return (
              <Button
                key={index}
                onClick={() => handleOnOff(item, index)}
                className={`${
                  isOnOff[index] ? 'bg-gray-3' : 'bg-mint-300'
                } px-3 py-1 m-2 text-sm text-black rounded-2xl `}
                children={item}
              />
            );
          })}
        </section>
        <ReqForm />
        <DialogFooter className="p-2">
          <Button
            variant="text"
            color="red"
            className="p-2 mx-3 my-1 text-black rounded-full bg-mint-300"
            children="신청하기"
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};
