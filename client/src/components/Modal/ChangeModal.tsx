import React, { useState } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, Input } from '@material-tailwind/react';

type props = {
  title: string;
  text: string;
  warning: string;
  btnName: string;
  btnCheck: string;
};

export const ChangeModal = ({ title, text, warning, btnName, btnCheck }: props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen}>{btnName}</Button>
      <Dialog open={open} handler={handleOpen} size="xs" className="overflow-hidden ">
        <DialogBody divider>
          <p className="text-center text-black">{title}</p>
          <div className="grid grid-flow-col">
            <Input label={text} crossOrigin={undefined} color="blue" className="text-black " />
            <Button
              variant="outlined"
              color="red"
              onClick={handleOpen}
              className="col-span-1 p-2 ml-5"
            >
              {btnCheck}
            </Button>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center space-x-2">
          <p className="text-black text-xs">{warning}</p>
        </DialogFooter>
      </Dialog>
    </>
  );
};
