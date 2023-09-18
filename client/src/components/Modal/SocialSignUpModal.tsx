import React, { useState, ChangeEvent } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, Radio } from '@material-tailwind/react';
import axios from 'axios';
import { URL } from 'configs/Url/config';

export const SocialSignupModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [userType, setUserType] = useState<string>('');
  const handleSubmit = async () => {
    console.log(userType);
    try {
      const response = await axios.get(`${URL}/oauth2/authorization/${userType}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert('카카오 로그인에 실패하였습니다. 다시 시도해주세요');
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSetType = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === '강사') {
      setUserType('kakao');
    } else if (event.target.id === 'student') {
      setUserType('kakao?state=teacher');
    }
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
              name="userType"
              id="teacher"
              label="강사"
              onChange={handleSetType}
            />
            <Radio
              crossOrigin={undefined}
              name="userType"
              id="student"
              label="학생"
              onChange={handleSetType}
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
