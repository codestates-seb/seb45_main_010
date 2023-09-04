import { Checkbox } from '@material-tailwind/react';
import { BsPencil } from 'react-icons/bs';
// import { TfiSave } from "react-icons/tfi";

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
        <div className="m-5">
          <p className="mb-5 text-sm font-bold ">강좌형식</p>
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
          <p className="mb-5 text-sm font-bold">강의료 ( 강사 소개에 노출됩니다 )</p>
          <ul>
            <li className="right-0 flex justify-end m-4">
              <BsPencil />
            </li>
            <li className="mx-4 mb-10 text-xs leading-5">{lectureFee}</li>
          </ul>
          <p className="text-sm font-bold">학력 및 경력</p>
          <ul>
            <li className="right-0 flex justify-end m-4">
              <BsPencil />
            </li>
            <li className="mx-4 mb-10 text-xs leading-5">{career}</li>
          </ul>
          <p className="text-sm font-bold">수업옵션</p>
          <ul>
            <li className="right-0 flex justify-end m-4">
              <BsPencil />
            </li>
            <li className="mx-4 mb-10 text-xs leading-5">{option}</li>
          </ul>
        </div>
      ) : (
        <>
          <p className="text-sm font-bold">수업옵션</p>
          <ul>
            <li className="right-0 flex justify-end m-4">
              <BsPencil />
            </li>
            <li className="mx-4 mb-10 text-xs leading-5">{option}</li>
          </ul>
        </>
      )}
    </>
  );
};

export default OptionList;
