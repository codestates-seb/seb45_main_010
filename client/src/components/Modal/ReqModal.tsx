import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
  Input,
  Textarea,
} from '@material-tailwind/react';
import { DetailType } from 'Types/Types';

const arr: string[] = ['수학', '국어', '영어'];
const array: string[] = ['서울', '경기', '제주'];

type props = Pick<DetailType, 'category' | 'area' | 'date'>;

export const ReqModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectCategory, setSelectCategory] = useState<boolean[]>([]);
  const [selectArea, setSelectArea] = useState<boolean[]>([]);

  const handleOpen = (): void => setIsOpen(!isOpen);

  const handleCategory = (index: number): void => {
    const newButtonStates = [...selectCategory];
    newButtonStates[index] = !newButtonStates[index];
    setSelectCategory(newButtonStates);
  };
  const handleArea = (index: number): void => {
    const newButtonStates = [...selectArea];
    newButtonStates[index] = !newButtonStates[index];
    setSelectArea(newButtonStates);
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
        className="p-2 overflow-y-scroll max-h-[660px] bg-mint-2 "
      >
        <DialogHeader className="p-2 text-sm ">과목 선택</DialogHeader>
        <section className="flex items-center ">
          {arr.map((item, index) => {
            return (
              <Button
                key={index}
                onClick={() => handleCategory(index)}
                className={`${
                  selectCategory[index] ? 'bg-gray-3' : 'bg-mint-3'
                } px-3 py-1 m-2 text-sm text-black rounded-2xl `}
                children={item}
              />
            );
          })}
        </section>

        <DialogHeader className="p-2 text-sm ">지역 선택</DialogHeader>
        <section className="flex items-center ">
          {' '}
          {array.map((item, index) => {
            return (
              <Button
                key={index}
                onClick={() => handleArea(index)}
                className={`${
                  selectArea[index] ? 'bg-gray-3' : 'bg-mint-3'
                } px-3 py-1 m-2 text-sm text-black rounded-2xl `}
                children={item}
              />
            );
          })}
        </section>

        <DialogHeader className="p-2 text-sm">스케줄 선택</DialogHeader>

        <DialogHeader className="p-2 text-sm">이름</DialogHeader>
        <section className="flex items-center bg-mint-3 rounded-2xl">
          <Input label="이름" crossOrigin={undefined} />
        </section>
        <DialogHeader className="p-2 text-sm">연락처</DialogHeader>
        <section className="flex items-center bg-mint-3 rounded-2xl">
          <Input label="연락처" crossOrigin={undefined} />
        </section>
        <DialogHeader className="p-2 text-sm">이메일</DialogHeader>
        <section className="flex items-center bg-mint-3 rounded-2xl">
          <Input label="이메일" type="email" crossOrigin={undefined} />
        </section>
        <DialogHeader className="p-2 text-sm">특이사항</DialogHeader>
        <section className="flex items-center bg-mint-3 rounded-2xl">
          <Textarea label="특이사항" />
        </section>
        <DialogFooter className="p-2">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="p-2 mx-3 my-1 text-black rounded-full bg-mint-3"
          >
            <span>신청하기</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
