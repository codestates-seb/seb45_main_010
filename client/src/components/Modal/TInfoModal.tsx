import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
  Textarea,
  Input,
} from '@material-tailwind/react';

export const TInfoModal = () => {
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
        className="p-2 bg-mint-200 overflow-y-scroll max-h-[660px]"
      >
        <DialogHeader className="p-2 text-sm ">요청 과목</DialogHeader>
        <section className="flex items-center bg-mint-300 rounded-2xl ">
          <button className="px-3 py-1 m-2 text-sm text-black rounded-2xl bg-mint-200">수학</button>
        </section>
        <DialogHeader className="p-2 text-sm">요청 날짜</DialogHeader>
        <section className="flex items-center bg-mint-300 rounded-2xl">
          <button className="px-3 py-1 m-2 text-sm text-black rounded-2xl bg-mint-200">수학</button>
        </section>
        <DialogHeader className="p-2 text-sm">이름</DialogHeader>
        <section className="flex items-center bg-mint-300 rounded-2xl">
          <Input label="이름" crossOrigin={undefined} />
        </section>
        <DialogHeader className="p-2 text-sm">연락처</DialogHeader>
        <section className="flex items-center bg-mint-300 rounded-2xl">
          <Input label="연락처" crossOrigin={undefined} />
        </section>
        <DialogHeader className="p-2 text-sm">이메일</DialogHeader>
        <section className="flex items-center bg-mint-300 rounded-2xl">
          <Input label="이메일" type="email" crossOrigin={undefined} />
        </section>
        <DialogHeader className="p-2 text-sm">특이사항</DialogHeader>
        <section className="flex items-center bg-mint-300 rounded-2xl">
          <Textarea label="특이사항" />
        </section>
        <DialogFooter className="p-2">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="p-2 mx-3 my-1 text-black rounded-full bg-mint-300"
          >
            <span>수락하기</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleOpen}
            className="p-2 mx-3 my-1 text-black rounded-full bg-mint-300"
          >
            <span>취소하기</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
