import { BsPencil } from 'react-icons/bs';
import { TfiSave } from 'react-icons/tfi';
import { useState } from 'react';
import { Textarea } from '@material-tailwind/react';

const Option = ({
  optionTitle,
  optionDesc: initialOptionDesc,
}: {
  optionTitle?: string;
  optionDesc: string;
}) => {
  const [optionDesc, setOptionDesc] = useState(initialOptionDesc);
  const [editOptionDesc, setEditOptionDesc] = useState(initialOptionDesc);
  const [isEditing, setIsEditing] = useState(false);

  const saveChanges = () => {
    setOptionDesc(editOptionDesc);
    setIsEditing(false);
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
              }}
            />
          )}
        </li>
        <li className="px-2 mb-10 text-xs leading-5">
          {isEditing ? (
            <Textarea
              color="blue"
              label="저장 버튼을 누르면 수정사항이 저장됩니다."
              value={editOptionDesc}
              onChange={(e) => setEditOptionDesc(e.target.value)}
              className="w-full min-h-[100px]"
            />
          ) : (
            optionDesc
          )}
        </li>
      </ul>
    </>
  );
};

export default Option;
