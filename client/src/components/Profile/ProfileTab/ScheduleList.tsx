import Schedule from '../../Schedule/SetSchedule';
import { User } from 'Types/Types';

type ScheduleListProps = {
  userId: number;
};

const ScheduleList: React.FC<ScheduleListProps> = ({ userId }) => {
  return (
    <div className="py-10">
      <p className="px-4 mb-5 text-sm font-bold ">수업가능 일정설정</p>
      <div className="flex flex-col items-center justify-center gap-5">
        <Schedule userId={userId} />
      </div>
    </div>
  );
};

export default ScheduleList;
