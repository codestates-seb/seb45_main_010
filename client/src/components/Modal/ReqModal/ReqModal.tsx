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
import { useNavigate } from 'react-router-dom';

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

type idType = {
  teacherId: number;
  studentId: number;
};

type schedulesType = Pick<User, 'schedules'>;

export const ReqModal = ({ teacherId, onLine, offLine }: props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userDetails = useAppSelector((state) => state.member.user);
  const lesson = useAppSelector(lessonRequest);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [subjectsList, setSubjects] = useState<string[]>([]);
  const [regionsList, setRegions] = useState<string[]>([]);
  const [isOnOffLine, setIsOnOffLine] = useState<string[]>(['', '']);
  const [scheduleList, setSchedule] = useState<schedulesType>({
    schedules: {
      date: '',
      timeslots: [],
    },
  });
  const [requestPost, setRequestPost] = useState<requestPostType>({
    teacherId,
    studentId: 0,
    subjects: [],
    regions: [],
    schedule: {
      date: '',
      timeslots: [],
    },
    isOnline: false,
    studentName: '',
    studentPhone: '',
    studentEmail: '',
    remarks: '',
  });
  const [matches, setMatches] = useState<lessonGetType>({
    studentId: 0,
    teacherId,
    subjects: [],
    regions: [],
    schedules: {
      date: '',
      timeslots: [],
    },
    studentName: '',
    studentPhone: '',
    studentEmail: '',
  });
  const [studentInfo, setStudentInfo] = useState<formType>({
    name: '',
    phone: '',
    email: '',
    remaks: '',
  });
  const id: idType = { teacherId, studentId: userDetails.id };
  const onOff: string[] =
    onLine && offLine ? ['온라인', '오프라인'] : offLine ? ['오프라인'] : ['온라인'];

  const handleOpen = (): void => setIsOpen(!isOpen);

  useEffect(() => {
    if (lesson.status === 'fulfilled') {
      setMatches(lesson.value);
    }
  }, [lesson]);

  useEffect(() => {
    setRequestPost({
      studentId: id.studentId,
      teacherId,
      isOnline: !!isOnOffLine[0],
      subjects: subjectsList,
      regions: regionsList,
      schedule: scheduleList.schedules,
      studentName: studentInfo.name,
      studentPhone: studentInfo.phone,
      studentEmail: studentInfo.email,
      remarks: studentInfo.remaks,
    });
  }, [subjectsList, regionsList, scheduleList, isOnOffLine, studentInfo, teacherId]);

  const handleRequestPost = () => {
    dispatch(lessonRequestPost(requestPost));
    handleOpen();
  };

  const handleRequestGet = () => {
    if (userDetails.teacher) {
      alert('학생만 강의 신청 가능');
    } else if (!id.studentId || !id.teacherId) {
      alert('로그인을 해주세요.');
      navigate('/login');
    } else {
      dispatch(lessonRequestGet(id));
      handleOpen();
    }
  };

  return (
    <>
      <Button
        onClick={handleRequestGet}
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
          name={matches.studentName}
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
