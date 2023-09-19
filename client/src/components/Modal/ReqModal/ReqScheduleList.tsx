import { User } from 'Types/Types';
import ReqSetSchedule from './ReqSetSchedule';
type schedulesType = Pick<User, 'schedules'>;
type ScheduleListProps = {
  id: number;
  setSchedule: (selectItem: schedulesType) => void;
};

const ReqScheduleList: React.FC<ScheduleListProps> = ({ id, setSchedule }) => {
  return (
    <div className="py-10">
      <p className="px-4 mb-5 text-sm font-bold ">수업가능 일정</p>
      <div className="flex flex-col items-center justify-center gap-5">
        <ReqSetSchedule id={id} setSchedule={setSchedule} />
      </div>
    </div>
  );
};

export default ReqScheduleList;
