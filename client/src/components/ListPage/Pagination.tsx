import React from 'react';
import { Button } from '@material-tailwind/react';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { PageNumbers } from './PageNumbers';

type props = {
  page: number;
  totalPages: number;
  setPage: (index: number) => void;
};

const Pagination = ({ page, totalPages, setPage }: props) => {
  const first = () => {
    if (page === 0) return;
    setPage(0);
  };

  const last = () => {
    if (page === totalPages - 1) return;
    setPage(totalPages - 1);
  };

  return (
    <div className="flex items-center justify-center">
      <Button
        variant="text"
        className="flex items-center p-3 rounded-full"
        onClick={first}
        disabled={page === 0}
      >
        <BiChevronsLeft className="w-8 h-8" />
      </Button>
      <div className="flex items-center">
        <PageNumbers totalPages={totalPages} page={page} setPage={setPage} />
      </div>
      <Button
        variant="text"
        className="flex items-center p-3 rounded-full "
        onClick={last}
        disabled={page === totalPages - 1}
      >
        <BiChevronsRight className="w-8 h-8" />
      </Button>
    </div>
  );
};

export default Pagination;
