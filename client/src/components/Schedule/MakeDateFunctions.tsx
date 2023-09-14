//시간슬롯 만들기 00시 ~ 24시 까지, 1시간 단위로
export function generateTimeSlots(startDate: string): string[] {
  const startHour = 0;
  const endHour = 24;
  const timeSlots: string[] = [];

  for (let hour = startHour; hour < endHour; hour++) {
    const start = new Date(startDate);
    start.setHours(hour, 0, 0);
    const end = new Date(startDate);
    end.setHours(hour + 1, 0, 0);

    const perHour: string = `${start.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}~${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    timeSlots.push(perHour);
  }

  return timeSlots;
}

//yyyy-mm-dd 문자열로 날짜 생성
export function formatDate(date: Date): string {
  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${MM}-${dd}`;
}

//해당 문자열 날짜에 timeslot이 구성된 객체 생성
export function generateAvailableTimeSlots(): { date: string; timeslots: string[] }[] {
  const availableTimeSlots: { date: string; timeslots: string[] }[] = [];

  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);

  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const formattedDate = formatDate(date);
    const timeSlots = generateTimeSlots(formattedDate);
    availableTimeSlots.push({ date: formattedDate, timeslots: timeSlots });
  }

  return availableTimeSlots;
}
