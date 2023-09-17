import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, Input } from '@material-tailwind/react';
import { useAppDispatch } from 'hooks/hooks';
import axios from 'axios';
import { updateUserImage } from '../../redux/slice/MemberSlice';

type props = {
  text: string;
  warning: string;
  btnName: string;
  changeItem: string;
  userId: number;
  teacher: boolean;
};

export const ImageChangeModal = ({ text, warning, changeItem, userId, teacher }: props) => {
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
      const targetURL = `${apiURL}/${teacher === false ? 'students' : 'teachers'}/${changeItem}`;
      if (!newName) {
        alert('변경하실 내용을 입력해주세요');
        return;
      }
      const response = await axios.patch(targetURL, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      dispatch(updateUserImage(response.data.profileImg));
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
      <Button
        onClick={handleOpen}
        size="sm"
        color="gray"
        className="w-5 h-5 rounded-full mt-[-25px] bg-gray opacity-0"
      >
        {' '}
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
              onChange={handleChange}
              placeholder="imageURL"
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
