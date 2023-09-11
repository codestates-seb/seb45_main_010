import React from 'react';
import { ReqModal } from 'components/Modal/ReqModal';

const RequestBtn = () => {
  return (
    <div className=" h-[50px] rounded-xl flex items-center justify-between fixed bottom-0 w-[360px] mb-32 bg-[#008774] px-1">
      <div className="text-sm text-white">1회 50,000원 / 1시간</div>
      <ReqModal />
    </div>
  );
};

export default RequestBtn;
