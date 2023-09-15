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
  const dispatch = useAppDispatch();

  const saveChanges = () => {
    setOptionDesc(editOptionDesc);
    setIsEditing(false);
    if (optionTitle === '강의료 ( 강사 소개에 노출됩니다 )') {
      dispatch(updateLectureFee({ id, lectureFee: editOptionDesc }));
    } else if (optionTitle === '학력 및 경력') {
      dispatch(updateCareer({ id, career: editOptionDesc }));
    } else if (optionTitle === '수업옵션') {
      dispatch(updateOption({ id, option: editOptionDesc }));
    } else if (!optionTitle) {
      dispatch(updateIntroduction({ id, introduction: editOptionDesc }));
    }
  };

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
        />
        <div className="py-8"></div>
      </ul>
    </>
  );
};

export default Option;
