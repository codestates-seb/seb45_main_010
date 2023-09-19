import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogFooter } from '@material-tailwind/react';
import ReqForm from './ReqForm';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { lessonRequest } from 'redux/slice/lessonRequestSlice';
import ReqSelect from './ReqSelect';
import { User, lessonGetType, requestPostType } from 'Types/Types';
import { lessonRequestGet, lessonRequestPost } from 'redux/thunk/lessonRequestThunk';
import { SubmitModal } from './SubmitModal';
import ReqScheduleList from './ReqScheduleList';

type props = {
  teacherId: number;
  onLine: boolean;
  offLine: boolean;
};

type formType = {
  name: string;
  phone: string;
  email: string;
  remaks: string;
};

type schedulesType = Pick<User, 'schedules'>;

export const ReqModal = ({ teacherId, onLine, offLine }: props) => {
  const dispatch = useAppDispatch();
  const lesson = useAppSelector(lessonRequest);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [subjectsList, setSubjects] = useState<string[]>([]);
  const [regionsList, setRegions] = useState<string[]>([]);
  const [isOnOffLine, setIsOnOffLine] = useState<string[]>(['', '']);
  const [scheduleList, setSchedule] = useState<schedulesType>({
    schedules: [],
  });
  const [requestPost, setRequestPost] = useState<requestPostType>({
    teacherId,
    studentId: 0,
    subjects: [],
    regions: [],
    schedules: [{ date: [] }],
    isOnLine: false,
    isOffLine: false,
    studentName: '',
    studentPhone: '',
    studentEmail: '',
    remaks: '',
  });
  const [matches, setMatches] = useState<lessonGetType>({
    studentId: 0,
    teacherId: 0,
    subjects: [],
    regions: [],
    schedules: [{ date: [] }],
    sudentName: '',
    studentPhone: '',
    studentEmail: '',
  });
  const [studentInfo, setStudentInfo] = useState<formType>({
    name: '',
    phone: '',
    email: '',
    remaks: '',
  });

  const onOff = onLine && offLine ? ['온라인', '오프라인'] : offLine ? ['오프라인'] : ['온라인'];
  const id = { teacherId, studentId: 1 };

  const handleOpen = (): void => setIsOpen(!isOpen);

  useEffect(() => {
    dispatch(lessonRequestGet(id));
  }, []);

  useEffect(() => {
    setMatches(lesson.value);
  }, [lesson]);

  useEffect(() => {
    setRequestPost({
      teacherId,
      studentId: 1,
      subjects: subjectsList,
      regions: regionsList,
      schedules: scheduleList,
      isOnLine: !!isOnOffLine[0],
      isOffLine: !!isOnOffLine[1],
      studentName: studentInfo.name,
      studentPhone: studentInfo.phone,
      studentEmail: studentInfo.email,
      remaks: studentInfo.remaks,
    });
  }, [subjectsList, regionsList, scheduleList, isOnOffLine, studentInfo, teacherId]);

  const handleRequestPost = () => {
    dispatch(lessonRequestPost(requestPost));
    handleOpen();
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
        <ReqSelect title={'과목 선택'} arr={matches.subjects} setItems={setSubjects} />
        <ReqSelect title={'지역 선택'} arr={matches.regions} setItems={setRegions} />
        <ReqScheduleList id={teacherId} setSchedule={setSchedule} />
        <ReqSelect title={'수업방식 선택'} arr={onOff} setItems={setIsOnOffLine} />

        <ReqForm
          name={matches.sudentName}
          phone={matches.studentPhone}
          email={matches.studentEmail}
          setStudentInfo={setStudentInfo}
        />

        <DialogFooter className="p-2">
          <SubmitModal
            title="신청이 완료되었습니다."
            btnCheck="확인"
            handleRequestPost={handleRequestPost}
          />
          <Button
            variant="text"
            color="red"
            className="p-2 mx-3 my-1 text-black rounded-full bg-mint-300"
            children="취소하기"
            onClick={handleOpen}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};
