import React from 'react';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Teacher } from 'configs/List/config';

type props = {
  test: Teacher;
  limit: number;
  currentPage: number;
  setCurrentPage: (index: number) => void;
};

const Pagination = ({ test, limit, currentPage, setCurrentPage }: props) => {
  const total: number = test.length;
  const numPages: number = Math.ceil(total / limit);

  const prev = () => {
    if (currentPage === 0) return;
    setCurrentPage(currentPage - 1);
  };

  const next = () => {
    if (currentPage === numPages) return;
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center ">
      <Button
        variant="text"
        className="flex items-center p-3 rounded-full"
        onClick={prev}
        disabled={currentPage === 0}
      >
        <ArrowLeftIcon strokeWidth={2} className="w-3 h-3" /> 이전
      </Button>
      <div className="flex items-center">
        {Array.from({ length: numPages }, (_, index) => (
          <IconButton
            key={index}
            className={currentPage === index ? 'bg-mint-2 rounded-full text-black' : 'rounded-full'}
            onClick={() => setCurrentPage(index)}
            variant={currentPage === index ? 'filled' : 'text'}
          >
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center p-3 rounded-full "
        onClick={next}
        disabled={currentPage === numPages}
      >
        다음
        <ArrowRightIcon strokeWidth={2} className="w-3 h-3" />
      </Button>
    </div>
  );
};

export default Pagination;
