import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { Button, Option, Select } from '@material-tailwind/react';
import { useState, useEffect, useRef } from 'react';
import { TimeSlotType, ScheduleType } from 'Types/Types';
import { generateAvailableTimeSlots, generateTimeSlots, formatDate } from './MakeDateFunctions';
import { updateSchedule, FetchSchedule } from 'redux/thunk/Thunk';
import { useAppDispatch } from 'hooks/hooks';
import GetSchedule from './GetSchedule';

type ScheduleProps = {
  id: number;
};

const availableTimeSlots = generateAvailableTimeSlots();

const SetSchedule: React.FC<ScheduleProps> = ({ id }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [oneDayTimeSlot, setOneDayTimeSlot] = useState<TimeSlotType['timeslots']>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlotType[]>([]);
  const [newSchedule, setNewSchedule] = useState<TimeSlotType[]>([]);
  const dispatch = useAppDispatch();

  const prevScheduleRef = useRef<TimeSlotType[]>([]);

  useEffect(() => {
    dispatch(FetchSchedule(id))
      .then((response) => {
        if (response.payload) {
          const schedule = response.payload.date;
          setSelectedTimeSlots(schedule);
          setNewSchedule(schedule);
          prevScheduleRef.current = schedule;
        }
      })
      .catch((error) => {
        console.error('Error fetching schedule:', error);
      });
  }, [dispatch, id]);

  const formatSelectedDate = selectedDate ? formatDate(selectedDate) : null;

  const handleSave = async () => {
    let method: 'POST' | 'PATCH' | 'DELETE';

    const currentSchedule = newSchedule.find((slot) => slot.date === formatSelectedDate);

    if (!currentSchedule) {
      console.log('No selected date or no changes to update.');
      return;
    }
    if (prevScheduleRef.current === null) {
      prevScheduleRef.current = [];
    }
    const prevSchedule = prevScheduleRef.current;
    if (JSON.stringify(newSchedule) !== JSON.stringify(prevSchedule)) {
      //   if (newSchedule.length > 0 && (!prevSchedule || prevSchedule.length === 0)) {
      //     method = 'POST';
      //     console.log('POST');
      //   }
      //   // else if (newSchedule.length === 0 && prevSchedule && prevSchedule.length > 0) {
      //   //   method = 'DELETE';
      //   //   console.log('DELETE');
      //   // }
      //   else {
      method = 'PATCH';
      console.log('PATCH');
    } else {
      console.log('No changes to update.');
      return;
    }

    console.log('Updating schedule with:', { id: id, date: newSchedule });
    return dispatch(updateSchedule({ id: id, date: newSchedule, method }));
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = formatDate(date);
      const timeSlot = availableTimeSlots.find((slot) => slot.date === formattedDate);

      setOneDayTimeSlot(
        timeSlot ? timeSlot.timeslots : availableTimeSlots.flatMap((slot) => slot.timeslots)
      );
    } else {
      setOneDayTimeSlot([]);
    }
  };
  const handleTimeSlotSelection = (perHour: string) => {
    setSelectedTimeSlots((prevSlots) => {
      const existingDateIndex = prevSlots.findIndex((i) => i.date === formatSelectedDate);

      let newSlots: TimeSlotType[] = [];
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
        newSlots = [...prevSlots, { date: formatSelectedDate, timeslots: [perHour] }];
      } else {
        newSlots = prevSlots;
      }

      setNewSchedule((prevNewSchedule) => {
        const updatedSlot = newSlots.find((slot) => slot.date === formatSelectedDate);

        const existingIndex = prevNewSchedule.findIndex((slot) => slot.date === formatSelectedDate);

        let newScheduleUpdate = [...prevNewSchedule];
        if (existingIndex !== -1) {
          newScheduleUpdate[existingIndex] = updatedSlot!;
        } else {
          newScheduleUpdate.push(updatedSlot!);
        }

        return newScheduleUpdate;
      });

      return newSlots;
    });
  };

  // console.log(newSchedule);
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
        className="flex items-center justify-between w-[350px] p-2 text-sm font-bold text-center text-black bg-mint-400 rounded-xl border-mint-200"
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
              {oneDayTimeSlot.map((perHour: string) => (
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
            {selectedTimeSlots
              .filter((timeSlotObj) => timeSlotObj.date === formatSelectedDate)
              .map((timeSlotObj, index) => (
                <div key={timeSlotObj.date + timeSlotObj.timeslots[index]}>
                  {timeSlotObj.timeslots.map((timeslot) => (
                    <div key={timeSlotObj.date + timeslot}>
                      <Button
                        className="flex items-center justify-between w-full p-2 mb-5 text-sm font-bold text-black bg-mint-200 rounded-xl border-mint-200"
                        size="sm"
                        onClick={handleSelectedTimeSlot(timeSlotObj, timeslot)}
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
      <GetSchedule />
    </div>
  );
};

export default SetSchedule;
