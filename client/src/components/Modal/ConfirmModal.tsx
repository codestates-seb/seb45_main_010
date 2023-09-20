import { useState } from 'react';
import { Button, Dialog, DialogBody } from '@material-tailwind/react';
import { TfiSave } from 'react-icons/tfi';

type props = {
  title: string;
  btnCheck: string;
  onClick: () => void;
};

export const ConfirmModal = ({ title, btnCheck, onClick }: props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <TfiSave onClick={handleOpen} />
      <Dialog open={open} handler={handleOpen} size="xs" className="overflow-hidden ">
        <DialogBody divider>
          <p className="m-10 text-center text-black">{title}</p>
          <div className="grid grid-flow-col">
            <Button
              variant="outlined"
              color="red"
              onClick={() => {
                handleOpen();
                onClick();
              }}
              className="col-span-1 p-2 ml-5"
            >
              {btnCheck}
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};
