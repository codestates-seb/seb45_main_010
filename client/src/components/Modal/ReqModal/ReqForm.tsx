import { DialogHeader, Input, Textarea } from '@material-tailwind/react';
import React from 'react';

const ReqForm = () => {
  return (
    <>
      <DialogHeader className="p-2 text-sm">이름</DialogHeader>
      <div className="bg-mint-300">
        <Input
          label="이름"
          color="blue-gray"
          crossOrigin={undefined}
          className="flex items-center rounded-2xl"
        />
      </div>
      <DialogHeader className="p-2 text-sm">연락처</DialogHeader>
      <div className="bg-mint-300">
        <Input
          label="연락처"
          color="blue-gray"
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
          crossOrigin={undefined}
          className="flex items-center rounded-2xl"
        />
      </div>
      <DialogHeader className="p-2 text-sm">특이사항</DialogHeader>
      <div className="bg-mint-300">
        <Textarea label="특이사항" className="flex items-center rounded-2xl" />
      </div>
    </>
  );
};

export default ReqForm;
