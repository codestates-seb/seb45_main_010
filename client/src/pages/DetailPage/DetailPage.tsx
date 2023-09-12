import { DetailType } from 'Types/Types';
import RequestBtn from 'components/DetailPage/RequestBtn';
import TeacherInfo1 from 'components/DetailPage/TeacherInfo1';
import TeacherInfo2 from 'components/DetailPage/TeacherInfo2';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { teacherDetail } from 'redux/slice/DetailPageSlice';
import { getData } from 'redux/thunk/DetailPageThunk';

type props = Pick<DetailType, 'date' | 'introduce' | 'lectureFee' | 'career'>;

const DetailPage = () => {
  const teacherInfo = useAppSelector(teacherDetail);
  const dispatch = useAppDispatch();

  return (
    <article className="w-full px-[7.5px] flex flex-col ">
      <TeacherInfo1 />
      <TeacherInfo2 />
      <RequestBtn />
    </article>
  );
};

export default DetailPage;
