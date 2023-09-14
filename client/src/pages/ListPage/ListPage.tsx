import React, { useEffect, useState } from 'react';
import TeacherCard from 'components/ListPage/TeacherCard';
import Pagination from 'components/ListPage/Pagination';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { teacherList } from 'redux/slice/ListPageSlice';
import { getData } from 'redux/thunk/ListPageThunk';
import { ListPageType } from 'Types/Types';
import { search } from 'configs/ListPage/config';

const ListPage = () => {
  const dispatch = useAppDispatch();
  const teacher = useAppSelector(teacherList);
  const [cardList, setCardList] = useState<ListPageType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const limit: number = 7;
  const offset = currentPage * limit;

  useEffect(() => {
    dispatch(getData(search));
  }, []);

  useEffect(() => {
    if (teacher.status === 'fulfilled') {
      setCardList(teacher.value.data);
    }
  }, [teacher]);

  return (
    <>
      <TeacherCard cardList={cardList.slice(offset, offset + limit)} />
      <Pagination
        cardList={cardList}
        limit={limit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default ListPage;
