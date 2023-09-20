import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { setSchedule } from 'redux/slice/ScheduleSlice';
import { FetchSchedule } from 'redux/thunk/ProfilePageThunk';
import { useEffect, useState } from 'react';
import { ScheduleObjType } from 'Types/Types';
import { Select, Option } from '@material-tailwind/react';

const GetSchedule = ({
  id,
  onDateSelect,
}: {
  id: number;
  onDateSelect?: (dateString: string | null, timeSlot: string | null) => void;
}) => {
  const dispatch = useAppDispatch();
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const schedule = useAppSelector((state) => state.schedule.schedule);

  useEffect(() => {
    dispatch(FetchSchedule(id))
      .then((response) => {
        const payload = response.payload as ScheduleObjType;
        const availableDatesArray: Date[] = payload.schedules.map(
          (scheduleItem) => new Date(scheduleItem.date)
        );
        setAvailableDates(availableDatesArray);
        dispatch(setSchedule(payload));

        if (selectedDate) {
          const selectedDateString = selectedDate.toISOString().split('T')[0];
          const selectedSchedule = payload.schedules.find(
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
  }, [id, selectedDate]);

  useEffect(() => {
    if (selectedDate && schedule) {
      const selectedDateString = selectedDate.toISOString().split('T')[0];
      const selectedSchedule = schedule.schedules.find(
        (dateItem) => dateItem.date === selectedDateString
      );

      if (selectedSchedule) {
        setAvailableTimeSlots(selectedSchedule.timeslots);
      }
    }
  }, [selectedDate, schedule]);

  useEffect(() => {
    const selectedDateString = selectedDate ? selectedDate.toISOString().split('T')[0] : null;
    if (onDateSelect) onDateSelect(selectedDateString, selectedTimeSlot);
  }, [selectedDate, selectedTimeSlot]);

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
        {selectedDate ? (
          <Select className="w-[300px]" color="blue" label="시간을 선택하세요">
            {availableTimeSlots.map((slot, index) => (
              <Option
                key={index}
                className="flex items-center justify-between w-[350px] my-3 text-sm font-bold text-black bg-mint-200 rounded-xl border-mint-200"
                onClick={() => setSelectedTimeSlot(slot)}
              >
                {slot}
              </Option>
            ))}
          </Select>
        ) : null}
      </div>
      <div></div>
    </>
  );
};

export default GetSchedule;
