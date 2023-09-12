import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { setSchedule } from 'redux/slice/ScheduleSlice';
import { FetchSchedule } from 'redux/thunk/Thunk';
import { useEffect, useState } from 'react';
import { User } from 'Types/Types';

type DateOfScheduleType = { date: string; timeslots: string[] };

const GetSchedule = () => {
  const dispatch = useAppDispatch();
  const userId = 1;
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const schedule = useAppSelector((state) => state.schedule.schedule);

  useEffect(() => {
    dispatch(FetchSchedule(userId))
      .then((response) => {
        const schedule = response.payload.date;
        const availableDatesArray: Date[] = schedule.map(
          (scheduleItem: DateOfScheduleType) => new Date(scheduleItem.date)
        );
        setAvailableDates(availableDatesArray);
        dispatch(setSchedule(response.payload));
      })
      .catch((error) => {
        console.error('Error fetching schedule:', error);
      });
  }, [dispatch, userId]);
  const selectedDateString = selectedDate ? selectedDate.toISOString().split('T')[0] : [];

  useEffect(() => {
    if (schedule) {
      // 일치하는 스케줄 항목을 찾습니다.
      const matchingSchedule = schedule.find((sch) =>
        sch.some((d) => d.date === selectedDateString)
      );
      console.log(matchingSchedule);

      // 일치하는 스케줄 항목이 있다면 해당 항목의 timeslots를 사용하여 상태를 업데이트합니다.
      if (matchingSchedule) {
        const matchingDate = matchingSchedule.date.find((d) => d.date === selectedDateString);
        if (matchingDate) {
          setAvailableTimeSlots(matchingDate.timeslots);
        }
      } else {
        // 일치하는 항목이 없다면 timeslots을 비웁니다.
        setAvailableTimeSlots([]);
      }
    }
  }, [selectedDate, schedule]);
  return (
    <>
      <div>
        <DatePicker
          className="text-sm font-bold text-center text-black bg-mint-4 rounded-xl border-mint-2"
          placeholderText="날짜 선택"
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date)}
          includeDates={availableDates}
          locale={ko}
        />
      </div>
      <div>
        <span>Available</span>
        <ul>
          {availableTimeSlots.map((slot, index) => (
            <li key={index}>{slot}</li>
          ))}
        </ul>
      </div>
      <div>
        <span>Selected</span>
        {selectedDate && <div>{selectedDate.toLocaleDateString()}</div>}
      </div>
    </>
  );
};

export default GetSchedule;
