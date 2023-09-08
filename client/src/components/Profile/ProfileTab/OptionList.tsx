import { Checkbox } from '@material-tailwind/react';
import Option from './Option';
import OnlineDiv from 'components/Items/OnlineDiv';
import { useState } from 'react';

type OptionListProps = {
  teacher: boolean;
  lectureFee: string;
  career: string;
  option: string;
  classMethod: {
    onLine: boolean;
    offLine: boolean;
  };
  handleClassMethodUpdate: (onLine: boolean, offLine: boolean) => void;
  userId: number;
};

const OptionList: React.FC<OptionListProps> = ({
  teacher,
  lectureFee,
  career,
  option,
  classMethod = { onLine: true, offLine: false },
  handleClassMethodUpdate,
  userId,
}) => {
  const [onLine, setOnLine] = useState(classMethod.onLine);
  const [offLine, setOffLine] = useState(classMethod.offLine);
  const handleOnLineChange = () => {
    const newOnLineState = !onLine;
    setOnLine(newOnLineState);
    handleClassMethodUpdate(newOnLineState, offLine);
  };

  const handleOffLineChange = () => {
    const newOffLineState = !offLine;
    setOffLine(newOffLineState);
    handleClassMethodUpdate(onLine, newOffLineState);
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
              checked={onLine}
              onChange={() => handleOnLineChange()}
              crossOrigin="anonymous"
            />
            <OnlineDiv onoff="온라인" />

            <Checkbox
              color="green"
              className="text-green bg-green"
              checked={offLine}
              onChange={() => handleOffLineChange()}
              crossOrigin="anonymous"
            />
            <OnlineDiv onoff="오프라인" />
          </div>
          <Option
            optionTitle="강의료 ( 강사 소개에 노출됩니다 )"
            optionDesc={lectureFee}
            userId={userId}
          />
          <Option
            optionTitle="학력 및 경력"
            optionDesc={career}
            userId={userId}
          />
          <Option optionTitle="수업옵션" optionDesc={option} userId={userId} />
        </div>
      ) : (
        <>
          <Option optionTitle="수업옵션" optionDesc={option} userId={userId} />
        </>
      )}
    </>
  );
};

export default OptionList;
