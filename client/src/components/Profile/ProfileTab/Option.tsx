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
    setInputCount(e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length);
  };
  const dispatch = useAppDispatch();

  const saveChanges = () => {
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
  let maxLength;

  switch (optionTitle) {
    case '강의료 ( 강사 소개에 노출됩니다 )':
      maxLength = 20;
      break;
    case '학력 및 경력':
      maxLength = 200;
      break;
    case '수업옵션':
      maxLength = 200;
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
