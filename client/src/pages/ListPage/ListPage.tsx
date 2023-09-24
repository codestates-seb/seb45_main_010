import React, { useEffect, useState } from 'react';
import TeacherCard from 'components/ListPage/TeacherCard';
import Pagination from 'components/ListPage/Pagination';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { teacherList } from 'redux/slice/ListPageSlice';
import { getData } from 'redux/thunk/ListPageThunk';
import { ListPageType } from 'Types/Types';
import { search } from 'configs/Listpage/config';
import IsLoading from 'components/Loading/Loading';

const ListPage = () => {
  const dispatch = useAppDispatch();
  const teacher = useAppSelector(teacherList);
  const [cardList, setCardList] = useState<ListPageType[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const size: number = 7;

  useEffect(() => {
    search.size = size;
    search.page = page + 1;
    dispatch(getData(search));
  }, [page]);

  useEffect(() => {
    if (teacher.status === 'loding') {
      setIsLoading(true);
    }
    if (teacher.status === 'fulfilled') {
      setIsLoading(false);
      setCardList(teacher.value.data);
      setTotalPages(teacher.value.pageInfo.totalPages);
    }
  }, [teacher]);

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          <TeacherCard cardList={cardList} />
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}
    </>
  );
};

export default ListPage;
