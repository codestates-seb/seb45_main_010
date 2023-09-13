import { Button } from '@material-tailwind/react';
import { BsChevronDown } from 'react-icons/bs';
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

  // dispatch(getData);

  return (
    <>
      <p className="m-5 text-sm mt-[40px]">수업 가능 시간</p>
      <div className="flex flex-col items-center justify-center gap-5">
        <Button
          className="flex items-center justify-between p-2 text-sm font-bold text-black bg-mint-4 rounded-xl w-[230px] border-mint-2"
          size="sm"
        >
          <span className="flex-1 text-center">날짜 선택</span>
          <BsChevronDown className="ml-auto" />
        </Button>
        <div className="h-[150px] w-[230px] bg-mint-4">달력 자리</div>
        <div>
          <Button
            className="mb-5 flex items-center justify-between p-2 text-sm font-bold text-black bg-mint-2 rounded-xl w-[230px] border-mint-2"
            size="sm"
          >
            <span className="flex-1 text-center">17:00 ~ 18:00</span>
          </Button>
          <Button
            className="flex items-center justify-between p-2 text-sm font-bold text-black bg-mint-2 rounded-xl w-[230px] border-mint-2"
            size="sm"
          >
            <span className="flex-1 text-center">18:00 ~ 19:00</span>
          </Button>
        </div>
      </div>

      <article className="w-full px-[7.5px] flex flex-col ">
        <TeacherInfo1 />
        <TeacherInfo2 />
        <RequestBtn />
      </article>
    </>
  );
};

export default DetailPage;
