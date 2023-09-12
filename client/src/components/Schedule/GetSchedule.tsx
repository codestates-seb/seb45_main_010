import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { setSchedule } from 'redux/slice/ScheduleSlice';
import { FetchSchedule } from 'redux/thunk/Thunk';
import { useEffect, useState } from 'react';
import { TimeSlotType } from 'Types/Types';

const GetSchedule = () => {
  const dispatch = useAppDispatch();
  const userId = 1;
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const schedule = useAppSelector((state) => state.schedule.schedule);
  console.log(schedule);

  useEffect(() => {
    dispatch(FetchSchedule(userId))
      .then((response) => {
        const schedule = response.payload.date;
        const availableDatesArray: Date[] = schedule.map(
          (scheduleItem: TimeSlotType) => new Date(scheduleItem.date)
        );
        setAvailableDates(availableDatesArray);
        dispatch(setSchedule(response.payload));
      })
      .catch((error) => {
        console.error('Error fetching schedule:', error);
      });
  }, [dispatch, userId]);
  const selectedDateString = selectedDate ? selectedDate.toISOString().split('T')[0] : [];

  // useEffect(() => {
  //   if (schedule && schedule.date) {
  //     const matchingSchedule = schedule.date.find((sch) => sch.date === selectedDateString);
  //     console.log(matchingSchedule);

  //     if (matchingSchedule) {
  //       setAvailableTimeSlots(matchingSchedule.timeslots);
  //     } else {
  //       setAvailableTimeSlots([]);
  //     }
  //   }
  // }, [selectedDate, schedule]);

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
        <span>선택 가능한 시간</span>
        <ul>
          {availableTimeSlots.map((slot, index) => (
            <li key={index}>{slot}1</li>
          ))}
        </ul>
      </div>
      <div>
        <span>선택한 시간</span>
        {selectedDate && <div>{selectedDate.toLocaleDateString()}</div>}
      </div>
    </>
  );
};

export default GetSchedule;
