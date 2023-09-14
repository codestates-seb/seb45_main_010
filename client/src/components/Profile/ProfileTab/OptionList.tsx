import { Checkbox } from '@material-tailwind/react';
import Option from './Option';
import OnlineDiv from 'components/Items/OnlineDiv';
import { useState } from 'react';
import { updateOnline, updateOffline, FetchProfile } from 'redux/thunk/Thunk';
import { useAppDispatch } from 'hooks/hooks';

type OptionListProps = {
  teacher: boolean;
  lectureFee: string;
  career: string;
  option: string;
  onLine: boolean;
  offLine: boolean;
  id: number;
};

const OptionList: React.FC<OptionListProps> = ({
  teacher,
  lectureFee,
  career,
  option,
  onLine,
  offLine,
  id,
}) => {
  const dispatch = useAppDispatch();
  const [onLineState, setOnLineState] = useState(onLine);
  const [offLineState, setOffLineState] = useState(offLine);

  const handleOnLineChange = () => {
    const newOnLineState = !onLine;
    setOnLineState(newOnLineState);
    dispatch(updateOnline({ id, onLine: newOnLineState })).then(() => dispatch(FetchProfile(id)));
  };

  const handleOffLineChange = () => {
    const newOffLineState = !offLine;
    setOffLineState(newOffLineState);
    dispatch(updateOffline({ id, offLine: newOffLineState })).then(() =>
      dispatch(FetchProfile(id))
    );
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
          <Option optionTitle="강의료 ( 강사 소개에 노출됩니다 )" optionDesc={lectureFee} id={id} />
          <Option optionTitle="학력 및 경력" optionDesc={career} id={id} />
          <Option optionTitle="수업옵션" optionDesc={option} id={id} />
        </div>
      ) : (
        <>
          <Option optionTitle="수업옵션" optionDesc={option} id={id} />
        </>
      )}
    </>
  );
};

export default OptionList;
