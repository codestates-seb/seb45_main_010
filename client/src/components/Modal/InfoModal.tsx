import { Button, Dialog, DialogHeader, DialogFooter } from '@material-tailwind/react';
import CategoryDiv from 'components/Items/CategoryDiv';
import { RequestInfoType } from 'Types/Types';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useState, useEffect } from 'react';
import { FetchRequest } from 'redux/thunk/RequestThunks';
import { unwrapResult } from '@reduxjs/toolkit';

type InfoModalProps = {
  teacher: boolean;
  matchId: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const InfoModal: React.FC<InfoModalProps> = ({ teacher, matchId, open, setOpen }) => {
  const dispatch = useAppDispatch();
  const [requestDetails, setRequestDetails] = useState<RequestInfoType[]>([]);
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const apiAction = dispatch(FetchRequest(matchId));
        const response = unwrapResult(apiAction);
        setRequestDetails(response);
        console.log('request fetched successfully:', response);
      } catch (error) {
        console.error('Error fetching request:', error);
      }
    };

    fetchDetails();

    return () => {
      // Clean up logic if necessary, like cancelling an API call
    };
  }, [matchId]);

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
          <CategoryDiv category={requestDetails?.matchSubjects ?? []}></CategoryDiv>
        </section>
        <DialogHeader className="p-2 text-sm">요청 날짜</DialogHeader>
        <section className="flex items-center bg-mint-300 rounded-2xl">
          <CategoryDiv category={requestDetails.schedule}></CategoryDiv>
        </section>
        <DialogHeader className="p-2 text-sm">이름</DialogHeader>
        <section className="flex bg-mint-300 rounded-2xl">
          <span className="flex items-center h-[45px] px-3">
            {teacher ? requestDetails?.studentName : requestDetails?.teacherName}
          </span>
        </section>
        {teacher ? (
          <>
            <DialogHeader className="p-2 text-sm">연락처</DialogHeader>
            <section className="flex items-center bg-mint-300 rounded-2xl">
              <span className="flex items-center h-[45px] px-3">{requestDetails.phone}</span>
            </section>
            <DialogHeader className="p-2 text-sm">이메일</DialogHeader>
            <section className="flex items-center bg-mint-300 rounded-2xl">
              <span className="flex items-center h-[45px] px-3">{requestDetails.email}</span>
            </section>
          </>
        ) : (
          <>
            <DialogHeader className="p-2 text-sm">온/오프라인</DialogHeader>
            <section className="flex items-center bg-mint-300 rounded-2xl">
              {requestDetails.online}
              <CategoryDiv category="온라인" />
              <CategoryDiv category="오프라인" />
            </section>
            <DialogHeader className="p-2 text-sm">지역</DialogHeader>
            <section className="flex items-center bg-mint-300 rounded-2xl">
              <CategoryDiv category={requestDetails.matchRegions} />
            </section>
          </>
        )}
        <DialogHeader className="p-2 text-sm">특이사항</DialogHeader>
        <section className="flex items-center bg-mint-300 rounded-2xl">
          <span className="h-[100px] flex py-3 px-3">{requestDetails.remark}</span>
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
