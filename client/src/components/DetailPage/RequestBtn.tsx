import React from 'react';
import { ReqModal } from 'components/Modal/ReqModal/ReqModal';
import { DetailType } from 'Types/Types';

type props = {
  teacherInfo: DetailType;
};

const RequestBtn = ({ teacherInfo }: props) => {
  console.log(teacherInfo);

  return (
    <div className="h-[50px] rounded-xl flex bottom-24 items-center justify-between fixed w-[360px] bg-[#008774] px-1 z-50">
      <div className="text-sm text-white">{teacherInfo.lectureFee}</div>
      <ReqModal
        subjectNames={teacherInfo.subjects}
        regionsNames={teacherInfo.regions}
        schedules={teacherInfo.schedules}
        onLine={teacherInfo.onLine}
        offLine={teacherInfo.offLine}
      />
    </div>
  );
};

export default RequestBtn;
