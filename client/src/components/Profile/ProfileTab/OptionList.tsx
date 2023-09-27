import { Checkbox } from '@material-tailwind/react';
import Option from './Option';
import OnlineDiv from 'components/Items/OnlineDiv';
import { useState } from 'react';

type OptionListProps = {
  teacher: boolean;
  lectureFee: string;
  career: string;
  option: string;
  onLine: boolean;
  offLine: boolean;
  id: number;
  onUpdateOnline: (newState: boolean) => void;
  onUpdateOffline: (newState: boolean) => void;
};

const OptionList: React.FC<OptionListProps> = ({
  teacher,
  lectureFee,
  career,
  option,
  onLine,
  offLine,
  id,
  onUpdateOnline,
  onUpdateOffline,
}) => {
  const [onLineState, setOnLineState] = useState(onLine);
  const [offLineState, setOffLineState] = useState(offLine);

  const handleOnLineChange = () => {
    const newOnLineState = !onLineState;
    setOnLineState(newOnLineState);
    onUpdateOnline(newOnLineState);
  };

  const handleOffLineChange = () => {
    const newOffLineState = !offLineState;
    setOffLineState(newOffLineState);
    onUpdateOffline(newOffLineState);
  };

  return (
    <>
      {teacher ? (
        <div className="px-4 py-5">
          <p className="mb-5 text-sm font-bold">강좌형식</p>
          <div className="flex flex-row items-center gap-1 mt-5 mb-10">
            <Checkbox
              color="green"
              className="text-green bg-green"
              checked={onLineState}
              onChange={handleOnLineChange}
              crossOrigin="anonymous"
            />
            <OnlineDiv onoff="온라인" />

            <Checkbox
              color="green"
              className="text-green bg-green"
              checked={offLineState}
              onChange={handleOffLineChange}
              crossOrigin="anonymous"
            />
            <OnlineDiv onoff="오프라인" />
          </div>
          <Option
            optionTitle="강의료 ( 강사 소개에 노출됩니다 )"
            optionDesc={lectureFee}
            id={id}
            teacher={teacher}
          />
          <Option optionTitle="학력 및 경력" optionDesc={career} id={id} teacher={teacher} />
          <Option optionTitle="수업옵션" optionDesc={option} id={id} teacher={teacher} />
        </div>
      ) : (
        <>
          <Option optionTitle="수업옵션" optionDesc={option} id={id} teacher={teacher} />
        </>
      )}
    </>
  );
};

export default OptionList;
