import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import ScheduleSlice from 'redux/slice/ScheduleSlice';

const GetSchedule = () => {
  const dispatch = useAppDispatch();
  const schedule = useAppSelector(setSchedule);
  return;
};

export default GetSchedule;
