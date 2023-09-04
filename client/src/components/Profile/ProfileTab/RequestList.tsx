import { Button } from '@material-tailwind/react';
import { UserRequest } from 'components/Type/User';

type RequestListProps = {
  teacher: boolean;
  requests: UserRequest[];
};

const RequestList: React.FC<RequestListProps> = ({ requests, teacher }) => {
  return (
    <div className="my-5">
      <p className="flex-1 mx-5 mb-4 text-sm font-bold">
        {teacher ? '강의요청목록' : '수업요청목록'}
      </p>
      <div className="flex justify-end text-right">
        <Button
          className="flex items-center mx-1 h-7 p-2 text-[8px] text-gray-700 bg-white rounded-xl border-mint-2"
          variant="outlined"
        >
          과목
        </Button>
        <Button
          className="flex items-center mx-1 h-7 p-2 text-[8px] text-gray-700 bg-white rounded-xl border-mint-2"
          variant="outlined"
        >
          {!teacher ? '강사' : '학생'}
        </Button>
      </div>
      {requests &&
        requests.map((request, index) => (
          <div
            key={index}
            className={`my-5 border rounded-lg w-320 ${
              request.note === '수업요청'
                ? 'bg-[#BEDEF1] border-blue-3 hover:bg-blue-1 hover:border-blue-1'
                : 'bg-mint-2 border-[#BEDEF1] hover:bg-grey-1 hover:border-gey-1'
            } cursor-pointer duration-300`}
          >
            <div className="flex flex-row items-center justify-between p-4">
              <span className="text-[16px] font-semibold">{request.note}</span>
              <div className="flex h-6 text-sm font-normal bg-white rounded-md">
                <span className="flex items-center justify-center flex-1 p-2">
                  {request.requestcategory.join(', ')}
                </span>
                <span className="flex items-center justify-center flex-1 w-20 p-2">
                  {request.name}
                </span>
              </div>
            </div>
            <div className="flex justify-end p-4 text-right">
              <span>{request.date}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RequestList;
