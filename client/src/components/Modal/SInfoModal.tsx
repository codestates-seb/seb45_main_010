import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
  Input,
  Textarea,
} from '@material-tailwind/react';

export const SInfoModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="p-2 bg-mint-2 overflow-y-scroll max-h-[660px]"
      >
        <DialogHeader className="p-2 text-sm ">선택 과목</DialogHeader>
        <section className="flex items-center bg-mint-3 rounded-2xl ">
          <button className="px-3 py-1 m-2 text-sm text-black rounded-2xl bg-mint-2">
            수학
          </button>
        </section>
        <DialogHeader className="p-2 text-sm">선택 날짜</DialogHeader>
        <section className="flex items-center bg-mint-3 rounded-2xl">
          <button className="px-3 py-1 m-2 text-sm text-black rounded-2xl bg-mint-2">
            국어
          </button>
        </section>
        <DialogHeader className="p-2 text-sm">이름</DialogHeader>
        <section className="flex items-center bg-mint-3 rounded-2xl">
          <Input label="이름" crossOrigin={undefined} />
        </section>
        <DialogHeader className="p-2 text-sm">온/오프라인</DialogHeader>
        <section className="flex items-center bg-mint-3 rounded-2xl">
          <button className="px-3 py-1 m-2 text-sm text-black rounded-2xl bg-mint-2">
            수학
          </button>
          <button className="px-3 py-1 m-2 text-sm text-black rounded-2xl bg-mint-2">
            과학
          </button>
          <button className="px-3 py-1 m-2 text-sm text-black rounded-2xl bg-mint-2">
            국어
          </button>
        </section>
        <DialogHeader className="p-2 text-sm">지역</DialogHeader>
        <section className="flex items-center bg-mint-3 rounded-2xl">
          <button className="px-3 py-1 m-2 text-sm text-black rounded-2xl bg-mint-2">
            수학
          </button>
          <button className="px-3 py-1 m-2 text-sm text-black rounded-2xl bg-mint-2">
            과학
          </button>
          <button className="px-3 py-1 m-2 text-sm text-black rounded-2xl bg-mint-2">
            국어
          </button>
        </section>
        <DialogHeader className="p-2 text-sm">특이사항</DialogHeader>
        <section className="flex items-center bg-mint-3 rounded-2xl">
          <Textarea label="특이사항" />
        </section>
        <DialogFooter className="p-2">
          <Button
            variant="gradient"
            color="green"
            onClick={handleOpen}
            className="p-2 mx-3 my-1 text-black rounded-full bg-mint-3"
          >
            <span>취소하기</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
