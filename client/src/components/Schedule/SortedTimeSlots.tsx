import React from 'react';
import { Button } from '@material-tailwind/react';

type SortedTimeSlotsProps = {
  timeSlotObj: { date: string; timeslots: string[] };
  handleSelectedTimeSlot: (
    timeSlotObj: { date: string; timeslots: string[] },
    timeslot: string
  ) => () => void;
};

const SortedTimeSlots: React.FC<SortedTimeSlotsProps> = ({
  timeSlotObj,
  handleSelectedTimeSlot,
}) => {
  return (
    <div>
      {[...timeSlotObj.timeslots]
        .sort((a, b) => a.localeCompare(b))
        .map((timeslot) => (
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
  );
};

export default SortedTimeSlots;
