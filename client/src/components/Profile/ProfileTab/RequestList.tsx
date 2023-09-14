import { Button } from '@material-tailwind/react';
import NoRequestStatus from 'components/Items/NoRequestStatus';
import InfoModal from 'components/Modal/InfoModal';
import { useState } from 'react';
import { RequestType } from 'Types/Types';

type RequestListProps = {
  teacher: boolean;
  matches: RequestType;
};

const RequestList: React.FC<RequestListProps> = ({ teacher, matches }) => {
  const noFn = () => {};

  return (
    <div className="py-5">
      <InfoModal teacher={teacher} matches={matches} />
      <p className="flex-1 mb-4 text-sm font-bold">{teacher ? '강의요청목록' : '수업요청목록'}</p>
      <div className="flex justify-end text-right">
        <Button
          className="flex items-center mx-1 h-7 p-2 text-[8px] text-gray-700 bg-white rounded-xl border-mint-200"
          variant="outlined"
        >
          과목
        </Button>
        <Button
          className="flex items-center mx-1 h-7 p-2 text-[8px] text-gray-700 bg-white rounded-xl border-mint-200"
          variant="outlined"
        >
          {!teacher ? '강사' : '학생'}
        </Button>
      </div>
      {matches.length > 0 ? (
        <div>
          {matches.map((match) => (
            <div
              key={`match number ${match.matchId}`}
              onClick={() => setShowModal(true)}
              className={`my-5 border rounded-lg w-100% ${
                match.status === '수업요청'
                  ? 'bg-[#BEDEF1] border-blue-3 hover:bg-blue-1 hover:border-blue-1'
                  : 'bg-mint-200 border-[#BEDEF1] hover:bg-gray-1 hover:border-gray-1'
              } cursor-pointer duration-300`}
            >
              <div className="flex flex-row items-center justify-between p-4">
                <span className="text-[16px] font-semibold">{match.status}</span>
                <div className="flex h-6 text-sm font-normal bg-white rounded-md">
                  <span className="flex items-center justify-center flex-1 p-2">
                    {match.subjects.join('| ')}
                  </span>
                  <span className="flex items-center justify-center flex-1 w-20 p-2">
                    {teacher ? match.studentName : match.name}
                  </span>
                </div>
              </div>
              <div className="flex justify-end p-4 text-right">
                <span>{match.schedule}</span>
              </div>
              {}
            </div>
          ))}
        </div>
      ) : (
        <>
          <NoRequestStatus teacher={teacher} onClick={noFn} />
        </>
      )}
    </div>
  );
};
export default RequestList;
