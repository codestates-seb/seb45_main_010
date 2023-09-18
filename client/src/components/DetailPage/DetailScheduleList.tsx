import DetailSetSchedule from './DetailSetSchedule';

type ScheduleListProps = {
  id: number;
};

const DetailScheduleList: React.FC<ScheduleListProps> = ({ id }) => {
  return (
    <div className="py-10">
      <p className="px-4 mb-5 text-sm font-bold ">수업가능 일정</p>
      <div className="flex flex-col items-center justify-center gap-5">
        <DetailSetSchedule id={id} />
      </div>
    </div>
  );
};

export default DetailScheduleList;
