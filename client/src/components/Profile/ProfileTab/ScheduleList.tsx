import Schedule from '../../Schedule/SetSchedule';
import { User } from 'Types/Types';

type ScheduleListProps = {
  schedule: User['date'];
  userId: number;
};

const ScheduleList: React.FC<ScheduleListProps> = ({ schedule, userId }) => {
  return (
    <div className="py-10">
      <p className="px-4 mb-5 text-sm font-bold ">수업가능 일정설정</p>
      <div className="flex flex-col items-center justify-center gap-5">
        <Schedule schedule={schedule} userId={userId} />
      </div>
    </div>
  );
};

export default ScheduleList;
