import React from 'react';
import { ReqModal } from 'components/Modal/ReqModal/ReqModal';

type props = {
  subjectNames: string[];
  regionsNames: string[];
  schedules: {
    date: string[];
  }[];
  onLine: boolean;
  offLine: boolean;
  lectureFee: string;
};

const RequestBtn = ({
  subjectNames,
  regionsNames,
  schedules,
  onLine,
  offLine,
  lectureFee,
}: props) => {
  return (
    <div className="h-[50px] rounded-xl flex bottom-24 items-center justify-between fixed w-[360px] bg-[#008774] px-1 z-50">
      <div className="text-sm text-white">{lectureFee}</div>
      <ReqModal
        subjectNames={subjectNames}
        regionsNames={regionsNames}
        schedules={schedules}
        onLine={onLine}
        offLine={offLine}
      />
    </div>
  );
};

export default RequestBtn;
