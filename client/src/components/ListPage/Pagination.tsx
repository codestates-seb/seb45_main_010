import React from 'react';
import { Button } from '@material-tailwind/react';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { PageNumbers } from './PageNumbers';
import { ListPageType } from 'Types/Types';

type props = {
  cardList: ListPageType[];
  limit: number;
  currentPage: number;
  setCurrentPage: (index: number) => void;
};

const Pagination = ({ cardList, limit, currentPage, setCurrentPage }: props) => {
  const total: number = cardList.length;
  const numPages: number = Math.ceil(total / limit);

  const first = () => {
    if (currentPage === 0) return;
    setCurrentPage(0);
  };

  const last = () => {
    if (currentPage === numPages - 1) return;
    setCurrentPage(numPages - 1);
  };

  return (
    <div className="flex items-center justify-center">
      <Button
        variant="text"
        className="flex items-center p-3 rounded-full"
        onClick={first}
        disabled={currentPage === 0}
      >
        <BiChevronsLeft className="w-8 h-8" />
      </Button>
      <div className="flex items-center">
        <PageNumbers
          numPages={numPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <Button
        variant="text"
        className="flex items-center p-3 rounded-full "
        onClick={last}
        disabled={currentPage === numPages - 1}
      >
        <BiChevronsRight className="w-8 h-8" />
      </Button>
    </div>
  );
};

export default Pagination;
