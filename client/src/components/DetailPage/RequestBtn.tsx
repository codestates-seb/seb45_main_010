import React from 'react';
import { ReqModal } from 'components/Modal/ReqModal/ReqModal';

type props = {
  lectureFee: string;
};

const RequestBtn = ({ lectureFee }: props) => {
  return (
    <div className="h-[50px] rounded-xl flex bottom-24 items-center justify-between fixed w-[360px] bg-[#008774] px-1 z-50">
      <div className="text-sm text-white">{lectureFee}</div>
      <ReqModal />
    </div>
  );
};

export default RequestBtn;
