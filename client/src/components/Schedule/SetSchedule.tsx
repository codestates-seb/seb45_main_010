import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { Button, Option, Select } from '@material-tailwind/react';
import { useState, useEffect, useRef } from 'react';
import { ScheduleType, ScheduleObjType } from 'Types/Types';
import { generateAvailableTimeSlots, formatDate } from './MakeDateFunctions';
import { updateSchedule, FetchSchedule } from 'redux/thunk/ProfilePageThunk';
import { useAppDispatch } from 'hooks/hooks';
import SortedTimeSlots from './SortedTimeSlots';

const availableTimeSlots = generateAvailableTimeSlots();

const SetSchedule = ({ id }: { id: number }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [oneDayTimeSlot, setOneDayTimeSlot] = useState<ScheduleType['timeslots']>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<ScheduleType[]>([]);
  const [newSchedule, setNewSchedule] = useState<ScheduleType[]>([]);
  const dispatch = useAppDispatch();

  const prevScheduleRef = useRef<ScheduleType[]>([]);

  useEffect(() => {
    dispatch(FetchSchedule(id))
      .then((response) => {
        if (response.payload) {
          const payload = response.payload as ScheduleObjType;
          const schedule = payload.schedules;
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
    const currentSchedule = newSchedule.find((slot) => slot.date === formatSelectedDate);

    if (!currentSchedule) {
      console.log('No selected date or no changes to update.');
      return;
    }

    const { date, timeslots } = currentSchedule;

    console.log('Updating schedule with:', { id: id, date, timeslots });
    return dispatch(updateSchedule({ id: id, date, timeslots }));
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

      let newSlots: ScheduleType[] = [];
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

        const newScheduleUpdate = [...prevNewSchedule];
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
  const handleSaveMessages = async () => {
    try {
      await handleSave();
      alert('저장되었습니다.');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('변경 사항을 저장하는 동안 오류가 발생했습니다. 다시 시도해주세요.');
    }
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
        inline={selectedDate ? true : undefined}
      />

      {selectedDate ? (
        <div className="w-full mt-5">
          <span className="mb-5 text-sm font-bold">선택 가능한 시간 목록</span>
          <div className="my-10 w-72">
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
                <SortedTimeSlots
                  key={timeSlotObj.date + index}
                  timeSlotObj={timeSlotObj}
                  handleSelectedTimeSlot={handleSelectedTimeSlot}
                />
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
        onClick={handleSaveMessages}
      >
        <span className="flex-1 text-center">저장</span>
      </Button>
    </div>
  );
};

export default SetSchedule;
