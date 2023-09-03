import DatePicker from 'react-datepicker';
import { useState } from 'react';

export default function Calendar() {
  const [startDate, setStartDate] = useState(new Date());
  return <DatePicker selected={startDate} onChange={(date) => date && setStartDate(date)} />;
}
