import React, { useEffect, useState } from 'react';
import { test } from 'configs/List/config';
import TeacherCard from 'components/ListPage/TeacherCard';
import Pagination from 'components/ListPage/Pagination';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { teacherList } from 'redux/slice/ListPageSlice';
import { getData } from 'redux/thunk/ListPageThunk';

const ListPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const limit: number = 7;
  const offset = currentPage * limit;
  const teacher = useAppSelector(teacherList);
  const dispatch = useAppDispatch();

  dispatch(getData());
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
