import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

type props = {
  title: string;
  text: string;
  btnName: string;
  btnCheck: string;
};

export const AlertModal = ({ title, text, btnName, btnCheck }: props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        {btnName}
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="xs"
        className="overflow-hidden "
      >
        <DialogHeader className="bg-gray-3 test-xl">{title}</DialogHeader>
        <DialogBody divider>{text}</DialogBody>
        <DialogFooter className="justify-center felx">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="text-white bg-blue-1 hover:bg-blue-2"
          >
            <span>{btnCheck}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
