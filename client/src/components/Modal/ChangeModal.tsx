import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, Input } from '@material-tailwind/react';
import { useAppDispatch } from 'hooks/hooks';
import axios from 'axios';
import { updateUserName, updateUserPhone } from '../../redux/slice/MemberSlice';

type props = {
  text: string;
  warning: string;
  changeItem: string;
  userId: number;
  teacher: boolean;
  placeholder: string;
  oauthUser: boolean;
};

export const ChangeModal = ({ text, warning, changeItem, userId, teacher, oauthUser }: props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const UpdateUser = {
    text: text,
    warning: warning,
    changeItem: changeItem,
    userId: userId,
    teacher: teacher,
    oauthUser: oauthUser,
  };
  const apiURL = 'http://ec2-3-34-116-209.ap-northeast-2.compute.amazonaws.com:8080';
  const dispatch = useAppDispatch();
  const handleNameChange = async (newName: string) => {
    try {
      const data = {
        id: userId,
        [changeItem]: newName,
      };
      const accessToken = localStorage.getItem('access_jwt');
      const targetURL = `${apiURL}/${UpdateUser.teacher === true ? 'teachers' : 'students'}/${
        UpdateUser.changeItem
      }`;
      if (!newName) {
        alert('변경하실 내용을 입력해주세요');
        return;
      }
      if (UpdateUser.changeItem === 'password') {
        if (oauthUser) {
          alert('카카오 가입회원은 비밀번호를 변경할수 없습니다');
          return;
        } else {
          const isValiePassword: boolean = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(newName);
          if (!isValiePassword) {
            alert(
              '고객님의 정보보안을 위해 비밀번호는 영문과 숫자를 조합하여 8자 이상으로 입력해주세요'
            );
            return;
          }
        }
      }
      if (UpdateUser.changeItem === 'phone') {
        const isValidPhone: boolean = /^\d{7,}$/.test(newName);
        if (!isValidPhone) {
          alert('유효한 전화번호를 입력해주세요(숫자, 7자리 이상)');
          return;
        }
      }
      const response = await axios.patch(targetURL, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      {
        if (UpdateUser.changeItem === 'name') {
          dispatch(updateUserName(response.data.name));
          alert('이름이 변경됩니다');
        } else if (UpdateUser.changeItem === 'phone') {
          dispatch(updateUserPhone(response.data.phone));
          alert('전화번호가 변경됩니다');
        } else if (UpdateUser.changeItem === 'password') {
          alert('비밀번호가 변경됩니다');
        }
      }
    } catch (error) {
      console.log(`${UpdateUser.changeItem}`, error);
    }
    handleOpen();
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClick = () => {
    handleNameChange(inputValue);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Button onClick={handleOpen} size="sm" className="bg-blue-1 opacity-100">
        변경
      </Button>
      <Dialog open={open} handler={handleOpen} size="xs" className="overflow-hidden">
        <DialogBody divider>
          <div className="flex justify-center items-center">
            <Input
              label={text}
              crossOrigin={undefined}
              color="blue"
              className="text-black"
              value={inputValue}
              onChange={handleChange} // 입력 값을 업데이트
            />
            <Button
              size="sm"
              onClick={handleClick}
              className="w-10 h-10 p-0.5 ml-1 bg-blue-1 text-white"
            >
              변경
            </Button>
            <Button
              size="sm"
              onClick={handleOpen}
              className="w-10 h-10 p-0.5 ml-1 bg-gray-1 text-gray"
            >
              취소
            </Button>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center space-x-2">
          <p className="text-xs text-black">{warning}</p>
        </DialogFooter>
      </Dialog>
    </>
  );
};
