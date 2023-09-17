import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogHeader, DialogFooter } from '@material-tailwind/react';
import ReqForm from './ReqForm';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { lessonRequest } from 'redux/slice/lessonRequestSlice';
import { lessonGet } from 'redux/thunk/lessonRequestThunk';
import ReqSelect from './ReqSelect';

const arr: string[] = ['수학', '국어', '영어'];
const array: string[] = ['서울', '경기', '제주'];
const onOff: string[] = ['온라인', '오프라인'];
//임시

export const ReqModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const lesson = useAppSelector(lessonRequest);
  const dispatch = useAppDispatch();
  const id = { teacherId: 1, studentId: 1 };

  useEffect(() => {
    dispatch(lessonGet(id));
  });

  const handleOpen = (): void => setIsOpen(!isOpen);

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
        <ReqSelect title={'과목 선택'} arr={arr} />
        <ReqSelect title={'지역 선택'} arr={array} />
        <DialogHeader className="p-2 text-sm">스케줄 선택</DialogHeader>
        <ReqSelect title={'수업방식 선택'} arr={onOff} />

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
