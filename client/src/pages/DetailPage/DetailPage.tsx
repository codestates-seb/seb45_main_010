import { DetailType } from 'Types/Types';
import RequestBtn from 'components/DetailPage/RequestBtn';
import TeacherInfo1 from 'components/DetailPage/TeacherInfo1';
import TeacherInfo2 from 'components/DetailPage/TeacherInfo2';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useEffect, useState } from 'react';
import { teacherDetail } from 'redux/slice/DetailPageSlice';
import { getData } from 'redux/thunk/DetailPageThunk';

const DetailPage = () => {
  const selectedTeacherDetail = useAppSelector(teacherDetail);
  const dispatch = useAppDispatch();
  const [teacherInfo, setTeacherInfo] = useState({});

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTeacherDetail.status === 'fulfilled') setTeacherInfo(selectedTeacherDetail.value);
  }, [selectedTeacherDetail]);

  return (
    <article className="w-full px-[7.5px] flex flex-col ">
      <TeacherInfo1 teacherInfo={teacherInfo} />
      <TeacherInfo2 teacherInfo={teacherInfo} />
      <RequestBtn />
    </article>
  );
};

export default DetailPage;
