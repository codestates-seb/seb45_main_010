import { Button } from '@material-tailwind/react';
import NoRequestImg from '../../../public/assets/Image/book.png';

type NoRequestStatusProps = {
  teacher: boolean;
  onClick: () => void;
};

const NoRequestStatus = ({ teacher, onClick }: NoRequestStatusProps) => {
  return (
    <>
      {teacher ? (
        <div className="flex flex-col items-center justify-center gap-5">
          <img className="w-[180px]" src={NoRequestImg}></img>
          <div className="flex flex-col items-center gap-1 text-sm">
            <span>아직 매칭 시스템을 이용해보지 않으셨나요?</span>
            <span>내게 꼭 맞는 맞춤 일정을 작성해보세요</span>
            <Button
              className="flex items-center justify-between p-3 m-5 bg-blue-2 rounded-xl"
              onClick={() => onClick()}
            >
              강의 설정하기
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5">
          <img className="w-[180px]" src={NoRequestImg}></img>
          <div className="flex flex-col items-center gap-1 text-sm">
            <span>아직 매칭 시스템을 이용해보지 않으셨나요?</span>
            <span>내게 꼭 맞는 맞춤 강사님을 찾아보세요</span>
            <Button
              className="flex items-center justify-between p-3 m-5 bg-blue-2 rounded-xl"
              onClick={() => onClick()}
            >
              강사님 보러가기
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default NoRequestStatus;
