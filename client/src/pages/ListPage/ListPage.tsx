import React, { useState } from 'react';
import { test } from 'configs/List/config';
import TeacherCard from 'components/ListPage/TeacherCard';
import Pagination from 'components/ListPage/Pagination';
import { useAppSelector } from 'hooks/hooks';
import { RootState } from 'redux/store';

const ListPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const limit: number = 7;
  const offset = currentPage * limit;
  const teacher = useAppSelector((state: RootState) => state.teacherList);

  console.log(teacher);

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
