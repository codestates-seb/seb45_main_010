import { useState } from 'react';
import { Button, Dialog, DialogBody } from '@material-tailwind/react';

type props = {
  title: string;
  btnCheck: string;
  handleRequestPost: () => void;
};

export const SubmitModal = ({ title, btnCheck, handleRequestPost }: props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    if (open) {
      handleRequestPost();
    }
    setOpen(!open);
  };

  return (
    <>
      <Button
        variant="text"
        color="red"
        className="p-2 mx-3 my-1 text-black rounded-full bg-mint-300"
        children="신청하기"
        onClick={handleOpen}
      />
      <Dialog open={open} handler={handleOpen} size="xs" className="overflow-hidden ">
        <DialogBody divider>
          <p className="m-10 text-center text-black">{title}</p>
          <div className="grid grid-flow-col">
            <Button
              variant="outlined"
              children={btnCheck}
              color="red"
              onClick={handleOpen}
              className="col-span-1 p-2 ml-5"
            />
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};
