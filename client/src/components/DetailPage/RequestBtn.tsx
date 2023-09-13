import React from 'react';
import { ReqModal } from 'components/Modal/ReqModal';

const RequestBtn = () => {
  return (
    <div className="h-[50px] rounded-xl flex bottom-24 items-center justify-between fixed w-[360px] bg-[#008774] px-1 z-50">
      <div className="text-sm text-white">1회 50,000원 / 1시간</div>
      <ReqModal />
    </div>
  );
};

export default RequestBtn;
