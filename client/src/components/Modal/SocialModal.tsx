import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, Radio, Input } from '@material-tailwind/react';
import axios from 'axios';

export const SocialModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [userType, setUserType] = useState<string | null>(null);
  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/oauth2/authorization/${userType}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="text-xl text-black border-2 border-kakao-1 bg-kakao-1 rounded-lg shadow-lg shadow-gray-900/30 p-1 h-[50px] hover:bg-kakao-2"
      >
        카카오로 회원가입
      </Button>
      <Dialog open={open} handler={handleOpen} size="xs" className="overflow-hidden">
        <DialogBody divider>
          <div className="text-center border text-black bg-kakao-1 p-3">카카오로 가입하기</div>
          <div className="grid grid-flow-col p-3">
            <Radio
              crossOrigin={undefined}
              id="teacher"
              name="userType"
              label="강사"
              checked={userType === 'teacher'}
              onChange={() => setUserType('kakao?state=teacher')}
            />
            <Radio
              crossOrigin={undefined}
              id="student"
              name="userType"
              label="학생"
              checked={userType === 'student'}
              onChange={() => setUserType('kakao')}
            />
            <Button
              variant="outlined"
              color="red"
              onClick={handleSubmit}
              className="col-span-1 p-2 ml-5"
            >
              가입하기
            </Button>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center space-x-2">
          <p className="text-xs text-black">강사 혹은 학생으로 택1하여 가입하실수 있습니다</p>
        </DialogFooter>
      </Dialog>
    </>
  );
};
