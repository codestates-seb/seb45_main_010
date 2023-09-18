import { Button } from '@material-tailwind/react';
import NoRequestStatus from 'components/Items/NoRequestStatus';
import InfoModal from 'components/Modal/InfoModal';
import useStatusTranslator from 'hooks/useStatusTranslator';
import { useState } from 'react';
import { MatchType, StatusType } from 'Types/Types';
import ModalPortal from 'components/Items/ModalPortal';

type RequestListProps = {
  teacher: boolean;
  matches: MatchType;
};

const RequestList: React.FC<RequestListProps> = ({ teacher, matches }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);
  const translateStatus = useStatusTranslator();
  const noFn = () => {};

  return (
    <div className="py-5">
      <p className="flex-1 mb-4 text-sm font-bold">{teacher ? '강의요청목록' : '수업요청목록'}</p>
      {matches.length > 0 ? (
        <>
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
          {matches.map((match) => {
            const { text, className } = translateStatus(match.status);

            return (
              <div
                key={`match number ${match.matchId}`}
                onClick={() => {
                  setShowModal(true);
                  setSelectedMatchId(match.matchId);
                }}
                className={`my-5 border rounded-lg w-100% ${className} cursor-pointer duration-300`}
              >
                <div className="flex flex-row items-center justify-between p-4">
                  <span className="text-[16px] font-semibold">{text}</span>
                  <div className="flex h-6 text-sm font-normal bg-white rounded-md">
                    <span className="flex items-center justify-center flex-1 p-2">
                      {match.subjects.join(' | ')}
                    </span>
                    <span className="flex items-center justify-center flex-1 w-20 p-2">
                      {teacher ? match.studentName : match.teacherName}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end p-4 text-right">
                  <span>{match.schedule}</span>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <NoRequestStatus teacher={teacher} onClick={noFn} />
        </>
      )}
      {selectedMatchId !== null && (
        <ModalPortal>
          <InfoModal
            teacher={teacher}
            matchId={selectedMatchId}
            open={showModal}
            setOpen={setShowModal}
          />
        </ModalPortal>
      )}
    </div>
  );
};
export default RequestList;
