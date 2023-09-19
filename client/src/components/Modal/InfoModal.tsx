import { Button, Dialog, DialogHeader, DialogFooter } from '@material-tailwind/react';
import CategoryDiv from 'components/Items/CategoryDiv';
import { RequestInfoType } from 'Types/Types';
import { useAppDispatch } from 'hooks/hooks';
import { useState, useEffect } from 'react';
import { FetchRequestInfo, updateRequestStatus } from 'redux/thunk/RequestThunks';
import { unwrapResult } from '@reduxjs/toolkit';

type InfoModalProps = {
  teacher: boolean;
  matchId: number;
};

const InfoModal: React.FC<InfoModalProps> = ({ teacher, matchId }) => {
  const dispatch = useAppDispatch();
  const [requestDetails, setRequestDetails] = useState<RequestInfoType | null>(null);
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const apiAction = await dispatch(FetchRequestInfo(matchId));
        const response = unwrapResult(apiAction);
        if (response) {
          setRequestDetails(response);
          setStatus(response.status);
          console.log('request fetched successfully:', response);
        } else console.log('request가 없는 값입니다');
      } catch (error) {
        console.error('Error fetching request:', error);
      }
    };

    fetchDetails();

    return () => {};
  }, [matchId, status, dispatch]);

  const handleAccept = async () => {
    try {
      const resultAction = await dispatch(updateRequestStatus({ id: matchId, status: 'answer' }));
      alert('요청이 수락됐습니다.');
      unwrapResult(resultAction);
      setStatus('answer');
      handleOpen();
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  const handleCancel = async () => {
    try {
      const resultAction = await dispatch(updateRequestStatus({ id: matchId, status: 'cancel' }));
      alert('요청이 취소되었습니다.');
      unwrapResult(resultAction);
      setStatus('cancel');
      handleOpen();
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };
  return (
    <>
      <Button
        variant="text"
        onClick={handleOpen}
        className="flex flex-row items-center justify-between w-[100px] h-[30px] bottom-[105px]"
      >
        {' '}
      </Button>
      <>
        {requestDetails ? (
          <>
            <Dialog
              size="xs"
              open={open}
              handler={handleOpen}
              className="p-2 bg-mint-200 overflow-y-scroll max-h-[660px]"
            >
              <DialogHeader className="p-2 text-sm">요청 과목</DialogHeader>
              <section className="flex items-center bg-mint-300 rounded-2xl">
                {requestDetails.matchSubjects.map((item) => (
                  <CategoryDiv key={item} category={item}></CategoryDiv>
                ))}
              </section>
              <DialogHeader className="p-2 text-sm">요청 날짜</DialogHeader>
              <section className="flex items-center bg-mint-300 rounded-2xl">
                <CategoryDiv
                  category={`${requestDetails.date}   |   ${requestDetails.timeslot}`}
                ></CategoryDiv>
              </section>
              <DialogHeader className="p-2 text-sm">이름</DialogHeader>
              <section className="flex bg-mint-300 rounded-2xl">
                <span className="flex items-center h-[45px] px-3">
                  {teacher ? requestDetails.studentName : requestDetails.teacherName}
                </span>
              </section>
              {teacher ? (
                <>
                  <DialogHeader className="p-2 text-sm">연락처</DialogHeader>
                  <section className="flex items-center bg-mint-300 rounded-2xl">
                    <span className="flex items-center h-[45px] px-3">
                      {requestDetails.studentPhone}
                    </span>
                  </section>
                  <DialogHeader className="p-2 text-sm">이메일</DialogHeader>
                  <section className="flex items-center bg-mint-300 rounded-2xl">
                    <span className="flex items-center h-[45px] px-3">
                      {requestDetails.studentEmail}
                    </span>
                  </section>
                </>
              ) : (
                <>
                  <DialogHeader className="p-2 text-sm">온/오프라인</DialogHeader>
                  <section className="flex items-center bg-mint-300 rounded-2xl">
                    {requestDetails.online ? (
                      <CategoryDiv category="온라인" />
                    ) : (
                      <CategoryDiv category="오프라인" />
                    )}
                  </section>
                  <DialogHeader className="p-2 text-sm">지역</DialogHeader>
                  <section className="flex items-center bg-mint-300 rounded-2xl">
                    {requestDetails.matchRegions.map((item) => (
                      <CategoryDiv key={item} category={item}></CategoryDiv>
                    ))}
                  </section>
                </>
              )}
              <DialogHeader className="p-2 text-sm">특이사항</DialogHeader>
              <section className="flex items-center bg-mint-300 rounded-2xl">
                <span className="h-[100px] flex py-3 px-3">{requestDetails.remarks}</span>
              </section>
              <DialogFooter className="p-2">
                {teacher ? (
                  <>
                    {status === 'MATCH_REQUEST' ? (
                      <>
                        <Button
                          variant="text"
                          color="red"
                          onClick={handleAccept}
                          className="p-2 mx-3 my-1 text-black rounded-full bg-mint-300"
                        >
                          <span>수락하기</span>
                        </Button>
                        <Button
                          variant="gradient"
                          color="green"
                          onClick={handleCancel}
                          className="p-2 mx-3 my-1 text-black rounded-full bg-mint-300"
                        >
                          <span>거절하기</span>
                        </Button>
                      </>
                    ) : null}
                  </>
                ) : (
                  <>
                    {status === 'MATCH_REQUEST' && (
                      <Button
                        variant="gradient"
                        color="green"
                        onClick={handleCancel}
                        className="p-2 mx-3 my-1 text-black rounded-full bg-mint-300"
                      >
                        <span>취소하기</span>
                      </Button>
                    )}
                  </>
                )}
              </DialogFooter>
            </Dialog>
          </>
        ) : null}
      </>
    </>
  );
};

export default InfoModal;
