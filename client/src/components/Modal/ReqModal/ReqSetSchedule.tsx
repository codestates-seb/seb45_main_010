import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { Button } from '@material-tailwind/react';
import { useState, useEffect, useRef } from 'react';
import { ScheduleType, ScheduleObjType, User } from 'Types/Types';
import { FetchSchedule } from 'redux/thunk/ProfilePageThunk';
import { useAppDispatch } from 'hooks/hooks';
import { formatDate } from 'components/Schedule/MakeDateFunctions';

type props = {
  id: number;
  setSchedule: (selectItem: schedulesType) => void;
};
type schedulesType = Pick<User, 'schedules'>;

const ReqSetSchedule = ({ id, setSchedule }: props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<ScheduleType[]>([]);
  const dispatch = useAppDispatch();
  const [isSelect, setIsSelect] = useState<boolean[]>([]);
  const [selectItem, setSelectItem] = useState<schedulesType>({
    schedules: {
      date: '',
      timeslots: [],
    },
  });
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

  useEffect(() => {
    setSchedule(selectItem);
  }, [selectItem]);

  const formatSelectedDate: string | null = selectedDate ? formatDate(selectedDate) : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleCategory = (timeslot: string, index: number): void => {
    const selectDate: string | null = formatSelectedDate;
    const newButtonStates: boolean[] = Array(isSelect.length).fill(false);
    newButtonStates[index] = true;
    setIsSelect(newButtonStates);
    setSelectItem({
      schedules: {
        date: selectDate ? selectDate : '',
        timeslots: [timeslot],
      },
    });
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-5 px-4">
      <DatePicker
        className="flex items-center caret-transparent justify-between p-2 text-sm font-bold text-center text-black cursor-pointer w-[20rem] bg-mint-300 rounded-xl"
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
                  {timeSlotObj.timeslots.map((timeslot, index) => (
                    <div
                      onClick={() => handleCategory(timeslot, index)}
                      key={timeSlotObj.date + timeslot}
                    >
                      <Button
                        className={`${
                          isSelect[index] ? 'bg-gray-3' : 'bg-mint-300'
                        } flex items-center justify-between w-full p-2 mb-5 text-sm font-bold text-black rounded-xl border-mint-200`}
                        size="sm"
                      >
                        <div
                          className={`${
                            isSelect[index] ? 'bg-gray-3' : 'bg-white'
                          }flex items-center justify-center text-sm rounded-lg h-[35px] w-auto p-3 bg-white `}
                        >
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

export default ReqSetSchedule;
