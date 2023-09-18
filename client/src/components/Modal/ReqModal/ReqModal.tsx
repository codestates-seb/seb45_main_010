import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogFooter } from '@material-tailwind/react';
import ReqForm from './ReqForm';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { lessonRequest } from 'redux/slice/lessonRequestSlice';
import ReqSelect from './ReqSelect';
import { lessonGetType, requestPostType } from 'Types/Types';
import { useLocation } from 'react-router-dom';
import { lessonRequestGet, lessonRequestPost } from 'redux/thunk/lessonRequestThunk';

type props = {
  subjectNames: string[];
  regionsNames: string[];
  schedules: {
    date: string[];
  }[];
  onLine: boolean;
  offLine: boolean;
};

type formType = {
  name: string;
  phone: string;
  email: string;
  remaks: string;
};

export const ReqModal = ({ subjectNames, regionsNames, schedules, onLine, offLine }: props) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const lesson = useAppSelector(lessonRequest);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<string[]>([]);
  const [isOnOffLine, setIsOnOffLine] = useState<string[]>(['', '']);
  const [requestPost, setRequestPost] = useState<requestPostType>({
    subjects: [],
    regions: [],
    isOnLine: false,
    isOffLine: false,
    studentName: '',
    studentPhone: '',
    studentEmail: '',
    remaks: '',
  });
  const [studentInfo, setStudentInfo] = useState<formType>({
    name: '',
    phone: '',
    email: '',
    remaks: '',
  });
  const [matches, setMatches] = useState<lessonGetType>({
    studentId: '',
    teacherId: '',
    subjects: [],
    schedules: [{ date: [] }],
    sudentName: '',
    studentPhone: '',
    studentEmail: '',
  });

  const onOff = onLine && offLine ? ['온라인', '오프라인'] : offLine ? ['오프라인'] : ['온라인'];
  const id = { teacherId: location.pathname.slice(1), studentId: '6' };

  const handleOpen = (): void => setIsOpen(!isOpen);

  useEffect(() => {
    dispatch(lessonRequestGet(id));
  }, []);

  useEffect(() => {
    setMatches(lesson.value);
  }, [lesson]);

  useEffect(() => {
    setRequestPost({
      subjects,
      regions,
      isOnLine: !!isOnOffLine[0],
      isOffLine: !!isOnOffLine[1],
      studentName: studentInfo.name,
      studentPhone: studentInfo.phone,
      studentEmail: studentInfo.email,
      remaks: studentInfo.remaks,
    });
  }, [subjects, regions, schedule, isOnOffLine, studentInfo]);

  const handleRequestPost = () => {
    dispatch(lessonRequestPost({ id: id.teacherId, requestPost: requestPost }));
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
        <ReqSelect title={'과목 선택'} arr={subjectNames} setItems={setSubjects} />
        <ReqSelect title={'지역 선택'} arr={regionsNames} setItems={setRegions} />
        {/* <ReqSelect title={'스케줄 선택'} arr={schedules} setItems={setSchedule} /> */}
        <ReqSelect title={'수업방식 선택'} arr={onOff} setItems={setIsOnOffLine} />

        <ReqForm
          name={matches.sudentName}
          phone={matches.studentPhone}
          email={matches.studentEmail}
          setStudentInfo={setStudentInfo}
        />
        <DialogFooter className="p-2">
          <Button
            variant="text"
            color="red"
            className="p-2 mx-3 my-1 text-black rounded-full bg-mint-300"
            children="신청하기"
            onClick={handleRequestPost}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};
