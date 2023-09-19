import { useState } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, Input } from '@material-tailwind/react';

type props = {
  title: string;
  text: string;
  warning: string;
  btnName: string;
  btnCheck: string;
  onConfirm: () => void;
  selectedDate: string;
  selectedTimeSlots: string[];
};

export const AlertModal = ({
  title,
  text,
  warning,
  btnName,
  btnCheck,
  onConfirm,
  selectedDate,
  selectedTimeSlots,
}: props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(!open);

  const handleConfirm = () => {
    onConfirm();
    handleOpen();
  };
  return (
    <>
      <Button onClick={handleOpen}>{btnName}</Button>
      <Dialog open={open} handler={handleOpen} size="xs" className="overflow-hidden ">
        <DialogBody divider>
          <p className="text-center text-black">{title}</p>
          <div className="grid grid-flow-col">
            <Input
              label={text
                .replace('{date}', selectedDate)
                .replace('{timeslot}', selectedTimeSlots.join(', '))}
              crossOrigin={undefined}
              color="blue"
              className="text-black "
              readOnly
            />
            <Button
              variant="outlined"
              color="red"
              onClick={handleConfirm}
              className="col-span-1 p-2 ml-5"
            >
              {btnCheck}
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
