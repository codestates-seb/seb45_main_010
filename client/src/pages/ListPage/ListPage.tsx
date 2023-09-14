import React, { useEffect, useState } from 'react';
import TeacherCard from 'components/ListPage/TeacherCard';
import Pagination from 'components/ListPage/Pagination';
import { ListPageType } from 'Types/Types';
import useSearch from 'hooks/useSearch';

const ListPage = () => {
  const [cardList, setCardList] = useState<ListPageType[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const size: number = 1;
  const teacherList = useSearch('', [], [], size, page);

  useEffect(() => {
    if (teacherList.status === 'fulfilled') {
      setCardList(teacherList.value.data);
      setTotalPages(teacherList.value.pageInfo.totalPages);
    }
  }, [teacherList]);

  return (
    <>
      <TeacherCard cardList={cardList} />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </>
  );
};

export default ListPage;
