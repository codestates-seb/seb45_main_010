import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { Button, Option, Select } from '@material-tailwind/react';
import { ko } from 'date-fns/locale';

export type TimeSlot = {
  timeRange: string;
  date: string;
};

function generateTimeSlots(startDate: string): TimeSlot[] {
  const startHour = 1;
  const endHour = 24;
  const timeSlotsPerDay: TimeSlot[] = [];

  for (let hour = startHour; hour < endHour; hour++) {
    const start = new Date(startDate);
    start.setHours(hour, 0, 0);
    const end = new Date(startDate);
    end.setHours(hour + 1, 0, 0);

    const timeRange = `${start.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}~${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    timeSlotsPerDay.push({ timeRange, date: startDate });
  }

  return timeSlotsPerDay;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function generateAvailableTimeSlots(): Record<string, TimeSlot[]> {
  const availableTimeSlots: Record<string, TimeSlot[]> = {};

  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);

  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const formattedDate = formatDate(date);
    availableTimeSlots[formattedDate] = generateTimeSlots(formattedDate);
  }

  return availableTimeSlots;
}

const availableTimeSlots = generateAvailableTimeSlots();

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlots, setSelcetedTimeSlots] = useState<TimeSlot[]>([]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

    if (date) {
      const formattedDate = formatDate(date);
      setTimeSlots(availableTimeSlots[formattedDate] || []);
    } else {
      setTimeSlots([]);
    }
  };
  const handleTimeSlotClick = (timeSlot: TimeSlot): void => {
    setSelcetedTimeSlots((prevSlots) => [...prevSlots, timeSlot]);
    setTimeSlots((prevSlots) =>
      prevSlots.filter(
        (slot) => slot.timeRange !== timeSlot.timeRange || slot.date !== timeSlot.date
      )
    );
  };

  const handleSelectedTimeSlotClick = (timeSlot: TimeSlot): void => {
    setSelcetedTimeSlots((prevSlots) =>
      prevSlots.filter(
        (slot) => slot.timeRange !== timeSlot.timeRange || slot.date !== timeSlot.date
      )
    );
    setTimeSlots((prevSlots) => [...prevSlots, timeSlot]);
  };
  const scheduleData = {
    date: {
      select: {
        [(selectedDate && formatDate(selectedDate)) || '']: selectedTimeSlots.map(
          (slot) => slot.timeRange
        ),
      },
    },
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-5 px-4">
      <DatePicker
        className="flex items-center justify-between w-[350px] p-2 text-sm font-bold text-center text-black bg-mint-4 rounded-xl border-mint-2"
        placeholderText="날짜 선택"
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={today}
        dateFormat="yyyy/MM/dd"
        locale={ko}
      />

      {timeSlots.length > 0 ? (
        <div className="w-full mt-5">
          <span className="text-xs">시간을 선택해주세요</span>
          <div className="my-10">
            <Select color="blue" label="선택 가능한 시간 목록">
              {timeSlots.map((slot: TimeSlot) => (
                <Option
                  className="flex items-center justify-between w-full mb-5 text-sm font-bold text-black list-disc list-inside"
                  key={slot.date + slot.timeRange}
                  onClick={() => handleTimeSlotClick(slot)}
                >
                  {slot.timeRange}
                </Option>
              ))}
            </Select>
          </div>
          <span className="mb-5 text-sm font-bold">선택한 시간 목록</span>
          <div className="my-10">
            {selectedTimeSlots.map((slot: TimeSlot) => (
              <Button
                className="flex items-center justify-between w-full p-2 mb-5 text-sm font-bold text-black bg-mint-2 rounded-xl border-mint-2"
                size="sm"
                key={slot.date + slot.timeRange}
                onClick={() => handleSelectedTimeSlotClick(slot)}
              >
                <span className="flex-1 text-center">{slot.timeRange}</span>
              </Button>
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
        onClick={() => {
          {
            console.log(scheduleData);
          }
        }}
      >
        <span className="flex-1 text-center">저장</span>
      </Button>
    </div>
  );
};

export default Calendar;
