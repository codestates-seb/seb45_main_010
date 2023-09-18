import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { Button } from '@material-tailwind/react';
import { useState, useEffect, useRef } from 'react';
import { ScheduleType, ScheduleObjType } from 'Types/Types';
import { FetchSchedule } from 'redux/thunk/ProfilePageThunk';
import { useAppDispatch } from 'hooks/hooks';
import { formatDate } from 'components/Schedule/MakeDateFunctions';

type props = {
  id: number;
};

const DetailSetSchedule = ({ id }: props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<ScheduleType[]>([]);
  const dispatch = useAppDispatch();

  const prevScheduleRef = useRef<ScheduleType[]>([]);

  useEffect(() => {
    if (id > 0) {
      dispatch(FetchSchedule(id))
        .then((response) => {
          if (response.payload) {
            const payload = response.payload as ScheduleObjType;
            const schedule = payload.schedules;
            setSelectedTimeSlots(schedule);
            prevScheduleRef.current = schedule;
          }
        })
        .catch((error) => {
          console.error('Error fetching schedule:', error);
        });
    }
  }, [dispatch, id]);

  const formatSelectedDate = selectedDate ? formatDate(selectedDate) : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-5 px-4">
      <DatePicker
        className="flex items-center justify-between p-2 text-sm font-bold text-center text-black cursor-pointer w-[20rem] bg-mint-200 rounded-xl"
        placeholderText="날짜 보기"
        showPopperArrow={false}
        fixedHeight
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={today}
        dateFormat="yyyy-MM-dd"
        locale={ko}
        inline={selectedDate ? true : undefined}
      />

      {selectedDate ? (
        <div className="w-full mt-5">
          <div className="my-10">
            {selectedTimeSlots
              .filter((timeSlotObj) => timeSlotObj.date === formatSelectedDate)
              .map((timeSlotObj, index) => (
                <div key={timeSlotObj.date + timeSlotObj.timeslots[index]}>
                  {timeSlotObj.timeslots.map((timeslot) => (
                    <div key={timeSlotObj.date + timeslot}>
                      <Button
                        className="flex items-center justify-between w-full p-2 mb-5 text-sm font-bold text-black cursor-auto bg-mint-200 rounded-xl border-mint-200"
                        size="sm"
                      >
                        <div className="flex items-center justify-center text-sm rounded-lg h-[35px] w-auto p-3 bg-mint-300">
                          {timeSlotObj.date}
                        </div>
                        <span className="flex-1 text-center">{timeslot}</span>
                      </Button>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <span className="px-2 mb-20 text-sm font-bold">
          {'일 선택 시 수강 가능 시간을 보실 수 있습니다.'}
        </span>
      )}
    </div>
  );
};

export default DetailSetSchedule;
