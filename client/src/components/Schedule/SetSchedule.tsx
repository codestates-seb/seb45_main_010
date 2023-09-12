import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { Button, Option, Select } from '@material-tailwind/react';
import { useState, useEffect, useRef } from 'react';
import { TimeSlot } from 'Types/Types';
import { generateAvailableTimeSlots, generateTimeSlots, formatDate } from './Functions';
import { updateSchedule, FetchSchedule } from 'redux/thunk/Thunk';
import { useAppDispatch } from 'hooks/hooks';

type ScheduleProps = {
  schedule: { date: string; timeslots: string[] }[];
  userId: number;
};

const availableTimeSlots = generateAvailableTimeSlots();

const SetSchedule: React.FC<ScheduleProps> = ({ schedule, userId }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot['timeslots']>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<
    { date: string; timeslots: string[] }[]
  >(schedule ? schedule : []);
  const formatSelectedDate = selectedDate ? formatDate(selectedDate) : null;
  const [newSchedule, setNewSchedule] = useState<{ date: string; timeslots: string[] }[]>(
    schedule ? selectedTimeSlots : []
  );
  const dispatch = useAppDispatch();

  const prevScheduleRef = useRef(schedule ? schedule : []);

  useEffect(() => {
    prevScheduleRef.current = schedule;
  }, [schedule, timeSlots]);

  const handleSave = async () => {
    if (schedule === null) {
      prevScheduleRef.current = [];
    }
    const prevSchedule = prevScheduleRef.current;
    if (JSON.stringify(newSchedule) !== JSON.stringify(prevSchedule)) {
      dispatch(updateSchedule({ userId: userId, date: newSchedule }));
    } else {
      console.log('No matching condition, please check the logic.', newSchedule, prevSchedule);
      return;
    }
    console.log('Updating schedule with:', { userId: userId, date: newSchedule });
    return;
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = formatDate(date);
      const timeSlot = availableTimeSlots.find((slot) => slot.date === formattedDate);

      setTimeSlots(
        timeSlot ? timeSlot.timeslots : availableTimeSlots.flatMap((slot) => slot.timeslots)
      );
    } else {
      setTimeSlots([]);
    }
  };
  const handleTimeSlotSelection = (perHour: string) => {
    setSelectedTimeSlots((prevSlots: { date: string; timeslots: string[] }[]) => {
      const existingDateIndex = prevSlots.findIndex((i) => i.date === formatSelectedDate);

      let newSlots;
      if (existingDateIndex !== -1) {
        const alreadySelected = prevSlots[existingDateIndex].timeslots.includes(perHour);

        newSlots = prevSlots.map((slot, index) =>
          index === existingDateIndex
            ? {
                ...slot,
                timeslots: alreadySelected
                  ? slot.timeslots.filter((time) => time !== perHour)
                  : [...slot.timeslots, perHour],
              }
            : slot
        );
      } else if (formatSelectedDate) {
        // 새로운 날짜 객체를 추가
        newSlots = [...prevSlots, { date: formatSelectedDate, timeslots: [perHour] }];
      } else {
        newSlots = prevSlots;
      }

      setNewSchedule(newSlots); // newSchedule 상태 업데이트
      console.log(`"newSlots" ${newSlots}`);
      return newSlots;
    });
  };

  const handleSelectedTimeSlot = (
    timeSlotObj: { date: string; timeslots: string[] },
    timeslot: string
  ) => {
    return () => {
      setSelectedTimeSlots((prevSlots) => {
        const updatedSlots = prevSlots
          .map((slot) => {
            if (slot.date === timeSlotObj.date) {
              return {
                ...slot,
                timeslots: slot.timeslots.filter((slotTime) => slotTime !== timeslot),
              };
            }
            return slot;
          })
          .filter((slot) => slot.timeslots.length > 0);

        setNewSchedule(updatedSlots);
        return updatedSlots;
      });
    };
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-5 px-4">
      <DatePicker
        className="flex items-center justify-between w-[350px] p-2 text-sm font-bold text-center text-black bg-mint-4 rounded-xl border-mint-2"
        placeholderText="날짜 선택"
        showPopperArrow={false}
        fixedHeight
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={today}
        dateFormat="yyyy-MM-dd"
        locale={ko}
      />

      {selectedDate ? (
        <div className="w-full mt-5">
          <span className="mb-5 text-sm font-bold">선택 가능한 시간 목록</span>
          <div className="my-10">
            <Select color="blue" label="선택 가능한 시간 목록">
              {timeSlots.map((perHour: string) => (
                <Option
                  className="flex items-center justify-between w-full mb-5 text-sm font-bold text-black list-disc list-inside"
                  key={perHour}
                  onClick={() => handleTimeSlotSelection(perHour)}
                >
                  {perHour}
                </Option>
              ))}
            </Select>
          </div>
          <span className="mb-5 text-sm font-bold">선택한 시간 목록</span>
          <div className="my-10">
            {selectedTimeSlots.map((timeSlotObj, index) => (
              <div key={timeSlotObj.date + timeSlotObj.timeslots[index]}>
                {timeSlotObj.timeslots.map((timeslot) => (
                  <div key={timeSlotObj.date + timeslot}>
                    <Button
                      className="flex items-center justify-between w-full p-2 mb-5 text-sm font-bold text-black bg-mint-2 rounded-xl border-mint-2"
                      size="sm"
                      onClick={handleSelectedTimeSlot(timeSlotObj, timeslot)}
                    >
                      <div className="flex items-center justify-center text-sm rounded-lg h-[35px] w-auto p-3 bg-mint-3">
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
          날짜를 선택하시면 강의 시간을 정할 수 있습니다
        </span>
      )}
      <Button
        className="flex items-center justify-between w-[350px] mb-5 text-sm font-bold text-white bg-blue-1 rounded-xl "
        size="sm"
        onClick={handleSave}
      >
        <span className="flex-1 text-center">저장</span>
      </Button>
    </div>
  );
};

export default SetSchedule;
