import Schedule from '../../Schedule/SetSchedule';

type ScheduleListProps = {
  id: number;
};

const ScheduleList: React.FC<ScheduleListProps> = ({ id }) => {
  return (
    <div className="py-10">
      <p className="px-4 mb-5 text-sm font-bold ">수업가능 일정설정</p>
      <div className="flex flex-col items-center justify-center gap-5">
        <Schedule id={id} />
      </div>
    </div>
  );
};

export default ScheduleList;
