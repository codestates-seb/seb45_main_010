import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, Input } from '@material-tailwind/react';
import { useAppDispatch } from 'hooks/hooks';
import axios from 'axios';
import { updateUserName, updateUserPhone } from '../../redux/slice/MemberSlice';

type props = {
  text: string;
  warning: string;
  btnName: string;
  changeItem: string;
  userId: number;
  teacher: boolean;
  placeholder: string;
};

export const ChangeModal = ({
  text,
  warning,
  btnName,
  changeItem,
  userId,
  teacher,
  placeholder,
}: props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const apiURL = 'http://ec2-3-34-116-209.ap-northeast-2.compute.amazonaws.com:8080';
  const dispatch = useAppDispatch();
  const handleNameChange = async (newName: string) => {
    try {
      const data = {
        id: userId,
        [changeItem]: newName,
      };
      const accessToken = localStorage.getItem('access_jwt');
      const targetURL = `${apiURL}/${teacher === true ? 'teachers' : 'students'}/${changeItem}`;
      const response = await axios.patch(targetURL, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      {
        changeItem === 'name'
          ? dispatch(updateUserName(response.data.name))
          : changeItem === 'phone'
          ? dispatch(updateUserPhone(response.data.phone))
          : changeItem === 'password'
          ? alert('비밀번호가 변경됩니다')
          : '';
      }
    } catch (error) {
      console.log(`${changeItem}`, error);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClick = () => {
    handleNameChange(inputValue);
    handleOpen();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Button onClick={handleOpen} size="sm" className="bg-blue-1 opacity-100">
        {btnName}
      </Button>
      <Dialog open={open} handler={handleOpen} size="xs" className="overflow-hidden">
        <DialogBody divider>
          <div className="grid grid-flow-col">
            <Input
              label={text}
              crossOrigin={undefined}
              color="blue"
              className="text-black"
              value={inputValue}
              onChange={handleChange} // 입력 값을 업데이트
              placeholder={placeholder}
            />
            <Button
              variant="outlined"
              color="red"
              onClick={handleClick}
              className="col-span-1 p-2 ml-5"
            >
              {btnName}
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
