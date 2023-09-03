import { Button } from '@material-tailwind/react';
import { BsChevronDown } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import { useState } from 'react';

export default function ScheduleList() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="my-10">
      <p className="mx-5 mb-5 text-sm font-bold ">수업가능 일정설정</p>
      <div className="flex flex-col items-center justify-center gap-5">
        <Button
          className="flex items-center justify-between p-2 text-sm font-bold text-black bg-mint-4 rounded-xl w-[230px] border-mint-2"
          size="sm"
        >
          <span className="flex-1 text-center">날짜 선택</span>
          <BsChevronDown className="ml-auto" />
        </Button>
        <div className="h-[150px] w-[230px] bg-mint-4">
          <DatePicker selected={startDate} onChange={(date) => date && setStartDate(date)} />
          달력 자리
        </div>

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
      <div className="flex items-center justify-center my-5">
        <Button
          className="flex items-center justify-between p-2 my-5 text-sm font-bold text-white bg-blue-1 rounded-xl w-[98px] "
          size="sm"
        >
          <span className="flex-1 text-center">저장</span>
        </Button>
      </div>
    </div>
  );
}
