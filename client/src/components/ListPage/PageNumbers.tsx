import { IconButton } from '@material-tailwind/react';
import React from 'react';

type props = {
  numPages: number;
  currentPage: number;
  setCurrentPage: (index: number) => void;
};

export const PageNumbers = ({ numPages, currentPage, setCurrentPage }: props) => {
  const pagesToShow = 4;
  const pageNumbers = [];

  if (numPages <= pagesToShow) {
    for (let i = 0; i < numPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const start = Math.max(0, currentPage - Math.floor(pagesToShow / 2));
    const end = Math.min(numPages - 1, start + pagesToShow - 1);

    if (start > 0) {
      pageNumbers.push(-1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (end < numPages - 1) {
      pageNumbers.push(numPages);
    }
  }

  return pageNumbers.map((page, index) => (
    <div key={index}>
      {page === -1 || page === numPages ? (
        <span className="mx-2">...</span>
      ) : (
        <IconButton
          className={currentPage === page ? 'bg-mint-2 rounded-full text-black' : 'rounded-full'}
          onClick={() => setCurrentPage(page)}
          variant={currentPage === page ? 'filled' : 'text'}
        >
          {page + 1}
        </IconButton>
      )}
    </div>
  ));
};
