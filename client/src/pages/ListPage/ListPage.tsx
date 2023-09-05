import React, { useState } from 'react';
import { test } from 'configs/List/config';
import TeacherCard from 'components/ListPage/TeacherCard';
import Pagination from 'components/ListPage/Pagination';

const ListPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const limit: number = 5;
  const offset = currentPage * limit;

  return (
    <>
      <TeacherCard test={test.slice(offset, offset + limit)} />
      <Pagination
        test={test}
        limit={limit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default ListPage;
