import { useState } from 'react';
import { useAppDispatch } from 'hooks/hooks';
import {
  updateCareer,
  updateLectureFee,
  updateOption,
  updateIntroduction,
} from 'redux/thunk/ProfilePageThunk';
import EditandSave from 'components/Items/EditandSave';

const Option = ({
  optionTitle,
  optionDesc: initialOptionDesc,
  id,
}: {
  optionTitle?: string;
  optionDesc: string;
  id: number;
}) => {
  const [optionDesc, setOptionDesc] = useState(initialOptionDesc);
  const [editOptionDesc, setEditOptionDesc] = useState(initialOptionDesc);
  const [isEditing, setIsEditing] = useState(false);
  const [inputCount, setInputCount] = useState(0);

  const onInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInputValue = e.target.value;
    if (newInputValue.length <= maxLength) {
      setEditOptionDesc(newInputValue);
      setInputCount(newInputValue.length);
    } else {
      alert(`글자수는 ${maxLength}를 넘을 수 없습니다!`);
    }
  };

  const dispatch = useAppDispatch();

  const saveChanges = () => {
    if (editOptionDesc.trim().length === 0) {
      alert('내용을 비워둘 수 없습니다.');
      setEditOptionDesc(' ');
      return;
    }
    setOptionDesc(editOptionDesc);
    setIsEditing(false);
    if (optionTitle === '강의료 ( 강사 소개에 노출됩니다 )') {
      dispatch(updateLectureFee({ id: id, lectureFee: editOptionDesc }));
    } else if (optionTitle === '학력 및 경력') {
      dispatch(updateCareer({ id: id, career: editOptionDesc }));
    } else if (optionTitle === '수업옵션') {
      dispatch(updateOption({ id: id, option: editOptionDesc }));
    } else if (!optionTitle) {
      dispatch(updateIntroduction({ id: id, introduction: editOptionDesc }));
    }
  };
  let maxLength: number;

  switch (optionTitle) {
    case '강의료 ( 강사 소개에 노출됩니다 )':
      maxLength = 20;
      break;
    case '학력 및 경력':
      maxLength = 200;
      break;
    case '수업옵션':
      maxLength = 500;
      break;
    default:
      maxLength = 200;
  }
  return (
    <>
      {optionTitle && <p className="mb-5 text-sm font-bold">{optionTitle}</p>}
      <ul>
        <EditandSave
          optionTitle={optionTitle}
          optionDesc={optionDesc}
          editOptionDesc={editOptionDesc}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setEditOptionDesc={setEditOptionDesc}
          saveChanges={saveChanges}
          onInputHandler={onInputHandler}
          inputCount={inputCount}
          maxLength={maxLength}
        />
        <div className="py-8"></div>
      </ul>
    </>
  );
};

export default Option;
