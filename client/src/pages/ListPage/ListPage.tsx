import React, { useEffect, useState } from 'react';
import TeacherCard from 'components/ListPage/TeacherCard';
import Pagination from 'components/ListPage/Pagination';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { teacherList } from 'redux/slice/ListPageSlice';
import { getData } from 'redux/thunk/ListPageThunk';
import { ListPageType } from 'Types/Types';
import { search } from 'configs/Listpage/config';

const ListPage = () => {
  const dispatch = useAppDispatch();
  const teacher = useAppSelector(teacherList);
  const [cardList, setCardList] = useState<ListPageType[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const size: number = 1;

  useEffect(() => {
    search.size = size;
    search.page = page + 1;
    dispatch(getData(search));
  }, [page]);

  useEffect(() => {
    if (teacher.status === 'fulfilled') {
      setCardList(teacher.value.data);
      setTotalPages(teacher.value.pageInfo.totalPages);
    }
  }, [teacher]);

  return (
    <>
      <TeacherCard cardList={cardList} />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </>
  );
};

export default ListPage;
