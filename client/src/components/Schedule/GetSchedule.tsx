import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { setSchedule } from 'redux/slice/ScheduleSlice';
import { FetchSchedule } from 'redux/thunk/Thunk';
import { useEffect, useState } from 'react';
import { TimeSlotType, ScheduleType } from 'Types/Types';
import { Button } from '@material-tailwind/react';

const GetSchedule = () => {
  const dispatch = useAppDispatch();
  const id = 1;
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const schedule = useAppSelector((state) => state.schedule.schedule);
  // console.log(schedule);

  useEffect(() => {
    dispatch(FetchSchedule(id))
      .then((response) => {
        const payload = response.payload as ScheduleType;
        const availableDatesArray: Date[] = payload.date.map(
          (scheduleItem) => new Date(scheduleItem.date)
        );
        setAvailableDates(availableDatesArray);
        dispatch(setSchedule(payload));

        // 선택된 날짜가 있으면 사용 가능한 시간대 설정
        if (selectedDate) {
          const selectedDateString = selectedDate.toISOString().split('T')[0];
          const selectedSchedule = payload.date.find(
            (dateItem) => dateItem.date === selectedDateString
          );

          if (selectedSchedule) {
            setAvailableTimeSlots(selectedSchedule.timeslots);
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching schedule:', error);
      });
  }, [dispatch, id, selectedDate]);

  useEffect(() => {
    if (selectedDate && schedule) {
      const selectedDateString = selectedDate.toISOString().split('T')[0];
      const selectedSchedule = schedule.date.find(
        (dateItem) => dateItem.date === selectedDateString
      );

      if (selectedSchedule) {
        setAvailableTimeSlots(selectedSchedule.timeslots);
      }
    }
  }, [selectedDate, schedule]);

  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-5 px-4">
        <DatePicker
          className="flex items-center justify-between w-[350px] p-2 text-sm font-bold text-center text-black bg-mint-400 rounded-xl border-mint-200"
          placeholderText="날짜 선택"
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date)}
          includeDates={availableDates}
          locale={ko}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div>
        <span className="mb-5 text-sm font-bold">선택 가능한 시간</span>
        <ul>
          {availableTimeSlots.map((slot, index) => (
            <Button
              key={index}
              className="flex items-center justify-between w-full p-2 mb-5 text-sm font-bold text-black bg-mint-200 rounded-xl border-mint-200"
              size="sm"
              onClick={() => setSelectedTimeSlot(slot)}
            >
              {slot}
            </Button>
          ))}
        </ul>
      </div>
      <div>
        <span className="mb-5 text-sm font-bold">선택한 시간</span>
        {selectedTimeSlot && (
          <div className='className="flex items-center justify-between w-full p-2 mb-5 text-sm font-bold text-black bg-mint-200 rounded-xl border-mint-200"'>
            {selectedTimeSlot}
          </div>
        )}
      </div>
    </>
  );
};

export default GetSchedule;
