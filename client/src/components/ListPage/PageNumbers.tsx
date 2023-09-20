import { IconButton } from '@material-tailwind/react';
import React from 'react';

type props = {
  totalPages: number;
  page: number;
  setPage: (index: number) => void;
};

export const PageNumbers = ({ totalPages, page, setPage }: props) => {
  const pagesToShow = 4;
  const pageNumbers = [];

  if (totalPages <= pagesToShow) {
    for (let i = 0; i < totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const start = Math.max(0, page - Math.floor(pagesToShow / 2));
    const end = Math.min(totalPages - 1, start + pagesToShow - 1);

    if (start > 0) {
      pageNumbers.push(-1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (end < totalPages - 1) {
      pageNumbers.push(totalPages);
    }
  }

  return pageNumbers.map((item, index) => (
    <div key={index}>
      {item === -1 || item === totalPages ? (
        <span className="mx-2">...</span>
      ) : (
        <IconButton
          className={page === item ? 'bg-mint-200 rounded-full text-black' : 'rounded-full'}
          onClick={() => setPage(item)}
          variant={page === item ? 'filled' : 'text'}
        >
          {item + 1}
        </IconButton>
      )}
    </div>
  ));
};
