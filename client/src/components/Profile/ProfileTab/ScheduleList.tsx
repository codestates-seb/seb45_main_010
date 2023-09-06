import { Button } from '@material-tailwind/react';
// import { BsChevronDown } from 'react-icons/bs';
import Calendar from './Calendar';

const ScheduleList = () => {
  return (
    <div className="py-10">
      <p className="px-4 mb-5 text-sm font-bold ">수업가능 일정설정</p>
      <div className="flex flex-col items-center justify-center gap-5">
        {/* <Button
          className="flex items-center justify-between p-2 text-sm font-bold text-black bg-mint-4 rounded-xl w-[230px] border-mint-2"
          size="sm"
        >
          <span className="flex-1 text-center">날짜 선택</span>
          <BsChevronDown className="ml-auto" />
        </Button> */}
        <Calendar />
      </div>
      <div className="flex items-center justify-center py-5">
        <Button
          className="flex items-center justify-between w-full p-2 my-5 text-sm font-bold text-white bg-blue-1 rounded-xl "
          size="sm"
        >
          <span className="flex-1 text-center">저장</span>
        </Button>
      </div>
    </div>
  );
};

export default ScheduleList;
