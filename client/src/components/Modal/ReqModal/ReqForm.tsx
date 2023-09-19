import { DialogHeader, Input, Textarea } from '@material-tailwind/react';
import React, { ChangeEvent, useState } from 'react';

type props = {
  name: string;
  phone: string;
  email: string;
  setStudentInfo: (add: { name: string; phone: string; email: string; remaks: string }) => void;
};

const ReqForm = ({ name, phone, email, setStudentInfo }: props) => {
  const [currentName, setCurrentName] = useState<string>('');
  const [currentPhone, setCurrentPhone] = useState<string>('');
  const [currentEmail, setCurrentEmail] = useState<string>('');
  const [currentRemaks, setCurrentRemaks] = useState<string>('');
  const addStudent = {
    name: currentName,
    phone: currentPhone,
    email: currentEmail,
    remaks: currentRemaks,
  };

  const handlerName = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setCurrentName(newText);
    setStudentInfo(addStudent);
  };
  const handlerPhone = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setCurrentPhone(newText);
    setStudentInfo(addStudent);
  };
  const handlerEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setCurrentEmail(newText);
    setStudentInfo(addStudent);
  };
  const handlerRemaks = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setCurrentRemaks(newText);
    setStudentInfo(addStudent);
  };

  return (
    <>
      <DialogHeader className="p-2 text-sm">이름</DialogHeader>
      <div className="bg-mint-300">
        <Input
          label="이름"
          color="blue-gray"
          defaultValue={name}
          onChange={handlerName}
          crossOrigin={undefined}
          className="flex items-center rounded-2xl"
        />
      </div>
      <DialogHeader className="p-2 text-sm">연락처</DialogHeader>
      <div className="bg-mint-300">
        <Input
          label="연락처"
          color="blue-gray"
          defaultValue={phone}
          onChange={handlerPhone}
          crossOrigin={undefined}
          className="flex items-center rounded-2xl"
        />
      </div>
      <DialogHeader className="p-2 text-sm">이메일</DialogHeader>
      <div className="bg-mint-300">
        <Input
          label="이메일"
          type="email"
          color="blue-gray"
          defaultValue={email}
          onChange={handlerEmail}
          crossOrigin={undefined}
          className="flex items-center rounded-2xl"
        />
      </div>
      <DialogHeader className="p-2 text-sm">특이사항</DialogHeader>
      <div className="bg-mint-300">
        <Textarea
          label="특이사항"
          color="blue-gray"
          className="flex items-center rounded-2xl"
          onChange={handlerRemaks}
        />
      </div>
    </>
  );
};

export default ReqForm;
