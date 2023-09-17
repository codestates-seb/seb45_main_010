import { DetailType } from 'Types/Types';
import RequestBtn from 'components/DetailPage/RequestBtn';
import TeacherInfo1 from 'components/DetailPage/TeacherInfo1';
import TeacherInfo2 from 'components/DetailPage/TeacherInfo2';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useEffect, useState } from 'react';
import { teacherDetail } from 'redux/slice/DetailPageSlice';
import { getData } from 'redux/thunk/DetailPageThunk';
import { useLocation } from 'react-router-dom';

const DetailPage = () => {
  const detailInfo = useAppSelector(teacherDetail);
  const dispatch = useAppDispatch();
  const local = useLocation();
  const [teacherInfo, setTeacherInfo] = useState<DetailType>({
    id: 0,
    email: '',
    name: '',
    teacher: false,
    phone: '',
    profileImg: null,
    onLine: false,
    offLine: false,
    subjectNames: [],
    regionsNames: [],
    matches: [],
    introduction: '',
    lectureFee: '',
    career: '',
    option: null,
  });

  useEffect(() => {
    const currentId: string = local.pathname.slice(1);
    dispatch(getData(currentId));
  }, []);

  useEffect(() => {
    if (detailInfo.status === 'fulfilled') {
      setTeacherInfo(detailInfo.value);
      console.log(teacherInfo);
    }
  }, [detailInfo]);

  return (
    <>
      <article className="w-full px-[7.5px] flex flex-col ">
        <TeacherInfo1 teacherInfo={teacherInfo} />
        <TeacherInfo2 teacherInfo={teacherInfo} />
        <RequestBtn lectureFee={teacherInfo.lectureFee} />
      </article>
    </>
  );
};

export default DetailPage;
