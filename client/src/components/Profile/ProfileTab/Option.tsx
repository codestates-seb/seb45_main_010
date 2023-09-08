import { BsPencil } from 'react-icons/bs';
import { TfiSave } from 'react-icons/tfi';
import { useState } from 'react';
import { Textarea } from '@material-tailwind/react';
import { useAppDispatch } from 'hooks/hooks';
import {
  updateCareer,
  updateLectureFee,
  updateOption,
  updateIntroduce,
} from 'redux/thunk/Thunk';

const Option = ({
  optionTitle,
  optionDesc: initialOptionDesc,
  userId,
}: {
  optionTitle?: string;
  optionDesc: string;
  userId: number;
}) => {
  const [optionDesc, setOptionDesc] = useState(initialOptionDesc);
  const [editOptionDesc, setEditOptionDesc] = useState(initialOptionDesc);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  const saveChanges = () => {
    setOptionDesc(editOptionDesc);
    setIsEditing(false);
    if (optionTitle === '강의료 ( 강사 소개에 노출됩니다 )') {
      dispatch(updateLectureFee({ userId, lectureFee: editOptionDesc }));
    } else if (optionTitle === '학력 및 경력') {
      dispatch(updateCareer({ userId, career: editOptionDesc }));
    } else if (optionTitle === '수업옵션') {
      dispatch(updateOption({ userId, option: editOptionDesc }));
    } else if (!optionTitle) {
      dispatch(updateIntroduce({ userId, introduce: editOptionDesc }));
    }
  };

  return (
    <>
      {optionTitle && <p className="mb-5 text-sm font-bold">{optionTitle}</p>}
      <ul>
        <li className="right-0 flex justify-end m-4">
          {!isEditing && <BsPencil onClick={() => setIsEditing(true)} />}
          {isEditing && (
            <TfiSave
              onClick={() => {
                setIsEditing(false);
                saveChanges();
                console.log(editOptionDesc);
              }}
            />
          )}
        </li>
        <li className="text-xs leading-5">
          {isEditing ? (
            <Textarea
              color="blue"
              label="저장 버튼을 누르면 수정사항이 저장됩니다."
              value={editOptionDesc}
              onChange={(e) => setEditOptionDesc(e.target.value)}
              className="px-2 min-h-[100px]"
            />
          ) : (
            optionDesc
          )}
        </li>
        <div className="py-8"></div>
      </ul>
    </>
  );
};

export default Option;
