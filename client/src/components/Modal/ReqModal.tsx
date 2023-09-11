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
const onOff: string[] = ['온라인', '오프라인'];
//임시

type props = Pick<DetailType, 'category' | 'area' | 'date' | 'classMethod'>;

export const ReqModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCategory, setIsCategory] = useState<boolean[]>([]);
  const [isArea, setIsArea] = useState<boolean[]>([]);
  const [isOnOff, setIsOnOff] = useState<boolean[]>([]);

  const handleOpen = (): void => setIsOpen(!isOpen);

  const handleCategory = (index: number): void => {
    const newButtonStates = [...isCategory];
    newButtonStates[index] = !newButtonStates[index];
    setIsCategory(newButtonStates);
  };
  const handleArea = (index: number): void => {
    const newButtonStates = [...isArea];
    newButtonStates[index] = !newButtonStates[index];
    setIsArea(newButtonStates);
  };
  const handleOnOff = (index: number): void => {
    const newButtonStates = [...isOnOff];
    newButtonStates[index] = !newButtonStates[index];
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
                  isCategory[index] ? 'bg-gray-3' : 'bg-mint-3'
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
                onClick={() => handleArea(index)}
                className={`${
                  isArea[index] ? 'bg-gray-3' : 'bg-mint-3'
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
                onClick={() => handleOnOff(index)}
                className={`${
                  isOnOff[index] ? 'bg-gray-3' : 'bg-mint-3'
                } px-3 py-1 m-2 text-sm text-black rounded-2xl `}
                children={item}
              />
            );
          })}
        </section>
        <DialogHeader className="p-2 text-sm">이름</DialogHeader>
        <Input
          label="이름"
          color="blue-gray"
          crossOrigin={undefined}
          className="flex items-center bg-mint-3 rounded-2xl"
        />
        <DialogHeader className="p-2 text-sm">연락처</DialogHeader>
        <Input
          label="연락처"
          color="blue-gray"
          crossOrigin={undefined}
          className="flex items-center bg-mint-3 rounded-2xl"
        />
        <DialogHeader className="p-2 text-sm">이메일</DialogHeader>
        <Input
          label="이메일"
          type="email"
          color="blue-gray"
          crossOrigin={undefined}
          className="flex items-center bg-mint-3 rounded-2xl"
        />
        <DialogHeader className="p-2 text-sm">특이사항</DialogHeader>
        <Textarea label="특이사항" className="flex items-center bg-mint-3 rounded-2xl" />
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
