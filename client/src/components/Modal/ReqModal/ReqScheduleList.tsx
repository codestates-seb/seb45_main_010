import ReqSetSchedule from './ReqSetSchedule';

type ScheduleListProps = {
  id: number;
  setSchedule: () => void;
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
