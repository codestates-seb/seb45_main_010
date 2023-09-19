import { BsPencil } from 'react-icons/bs';
import { Textarea } from '@material-tailwind/react';
import { ConfirmModal } from 'components/Modal/ConfirmModal';

type EditandSaveProps = {
  optionTitle?: string;
  optionDesc: string;
  editOptionDesc: string;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  setEditOptionDesc: (value: string) => void;
  saveChanges: () => void;
  onInputHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inputCount: number;
  maxLength: number;
};

const EditandSave: React.FC<EditandSaveProps> = ({
  optionDesc,
  editOptionDesc,
  isEditing,
  setIsEditing,
  setEditOptionDesc,
  saveChanges,
  maxLength,
  onInputHandler,
  inputCount,
}) => {
  return (
    <>
      <li className="right-0 flex justify-end m-4">
        {!isEditing && <BsPencil onClick={() => setIsEditing(true)} />}
        {isEditing && (
          <ConfirmModal
            title="변경사항을 저장하시겠습니까?"
            btnCheck="확인"
            onClick={() => {
              setIsEditing(false);
              saveChanges();
            }}
          />
        )}
      </li>
      <li className="text-xs leading-5">
        {isEditing ? (
          <>
            <Textarea
              color="blue"
              label="저장 버튼을 누르면 수정사항이 저장됩니다."
              value={editOptionDesc}
              maxLength={maxLength}
              onChange={(e) => {
                setEditOptionDesc(e.target.value);
                onInputHandler(e);
              }}
              className="px-2 min-h-[100px]"
            />
            <>
              <p className="flex justify-items-end">
                <span>{inputCount}</span>
                <span>/{maxLength} 자 제한</span>
              </p>
            </>
          </>
        ) : (
          optionDesc
        )}
      </li>
    </>
  );
};

export default EditandSave;
