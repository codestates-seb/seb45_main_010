import React from 'react';
import { Button, Dialog, DialogHeader, DialogFooter } from '@material-tailwind/react';
import CategoryDiv from 'components/Items/CategoryDiv';
import { RequestType } from 'Types/Types';

type InfoModalProps = {
  teacher: boolean;
  matches: RequestType;
};

const InfoModal: React.FC<InfoModalProps> = ({ teacher, matches }) => {
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
          <CategoryDiv category="수학"></CategoryDiv>
        </section>
        <DialogHeader className="p-2 text-sm">요청 날짜</DialogHeader>
        <section className="flex items-center bg-mint-300 rounded-2xl">
          <CategoryDiv category="수학"></CategoryDiv>
        </section>
        <DialogHeader className="p-2 text-sm">이름</DialogHeader>
        <section className="flex bg-mint-300 rounded-2xl">
          <span className="flex items-center h-[45px] px-3">
            {teacher ? matches.studentName : matches.name}
          </span>
        </section>
        {teacher ? (
          <>
            <DialogHeader className="p-2 text-sm">연락처</DialogHeader>
            <section className="flex items-center bg-mint-300 rounded-2xl">
              <span className="flex items-center h-[45px] px-3">연락처</span>
            </section>
            <DialogHeader className="p-2 text-sm">이메일</DialogHeader>
            <section className="flex items-center bg-mint-300 rounded-2xl">
              <span className="flex items-center h-[45px] px-3">이메일</span>
            </section>
          </>
        ) : (
          <>
            <DialogHeader className="p-2 text-sm">온/오프라인</DialogHeader>
            <section className="flex items-center bg-mint-300 rounded-2xl">
              <CategoryDiv category="온라인" />
              <CategoryDiv category="오프라인" />
            </section>
            <DialogHeader className="p-2 text-sm">지역</DialogHeader>
            <section className="flex items-center bg-mint-300 rounded-2xl">
              <CategoryDiv category="강서구" />
              <CategoryDiv category="마포구" />
            </section>
          </>
        )}
        <DialogHeader className="p-2 text-sm">특이사항</DialogHeader>
        <section className="flex items-center bg-mint-300 rounded-2xl">
          <span className="h-[100px] flex py-3 px-3">특이사항</span>
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

export default InfoModal;
