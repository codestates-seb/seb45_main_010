import React, { useState } from 'react';

export const KaKaoModal = ({ isOpen, onClose }) => {
  console.log(kakao);
  const [open, setOpen] = useState<boolean>(true);
  const [kakaoInfo, setKakaoInfo] = useState<string>(''); // 카카오 정보 입력 상태
  const [userType, setUserType] = useState<string>('teacher'); // 강사 또는 학생 선택

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>모달 제목</h2>
        <p>모달 내용을 여기에 추가하세요.</p>
        <p className="text-center text-black">{title}</p>
        <div className="grid grid-flow-col">
          <input type = radio
            crossOrigin={undefined}
            id="teacher"
            name="userType"
            label="강사"
            checked={userType === 'teacher'}
            onChange={() => setUserType('teacher')}
          />
          <Radio
            crossOrigin={undefined}
            id="student"
            name="userType"
            label="학생"
            checked={userType === 'student'}
            onChange={() => setUserType('student')}
          />
          <Button
            variant="outlined"
            color="red"
            onClick={handleSubmit}
            className="col-span-1 p-2 ml-5"
          >
            {btnCheck}
          </Button>
        </div>
      </div>
    </div>
  );
};
