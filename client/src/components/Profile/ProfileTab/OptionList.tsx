import { Checkbox } from '@material-tailwind/react';
import Option from './Option';

type OptionListProps = {
  teacher: boolean;
  lectureFee: string;
  career: string;
  option: string;
};

const OptionList: React.FC<OptionListProps> = ({ teacher, lectureFee, career, option }) => {
  return (
    <>
      {teacher ? (
        <div className="px-4 py-5">
          <p className="mb-5 text-sm font-bold">강좌형식</p>
          <div className="flex flex-row items-center gap-1 mt-5 mb-10">
            <Checkbox
              color="green"
              className="text-green bg-green"
              defaultChecked
              crossOrigin="anonymous"
            />
            <div className="flex items-center justify-center text-sm rounded-lg h-[35px] w-[63px] bg-mint-2">
              온라인
            </div>
            <Checkbox color="green" className="text-green bg-green" crossOrigin="anonymous" />
            <div className="flex items-center justify-center text-sm rounded-lg h-[35px] w-[68px] bg-mint-2">
              오프라인
            </div>
          </div>
          <Option optionTitle="강의료 ( 강사 소개에 노출됩니다 )" optionDesc={lectureFee} />
          <Option optionTitle="학력 및 경력" optionDesc={career} />
          <Option optionTitle="수업옵션" optionDesc={option} />
        </div>
      ) : (
        <>
          <Option optionTitle="수업옵션" optionDesc={option} />
        </>
      )}
    </>
  );
};

export default OptionList;
