import { teacherList } from 'redux/slice/ListPageSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { useEffect } from 'react';
import { getData } from 'redux/thunk/ListPageThunk';

const useSearch = (
  teacherName: string,
  subject: string[],
  regions: string[],
  size: number = 1,
  page: number = 0
) => {
  const dispatch = useAppDispatch();
  const teacher = useAppSelector(teacherList);
  console.log(teacher);

  useEffect(() => {
    dispatch(
      getData({
        teacherName,
        subject,
        regions,
        size,
        page: page + 1,
      })
    );
  }, [page, teacherName]);

  return teacher;
};

export default useSearch;
