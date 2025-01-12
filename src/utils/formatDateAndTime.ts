const monthMap: Record<string, string> = {
  '01': 'янв',
  '02': 'фев',
  '03': 'мар',
  '04': 'апр',
  '05': 'май',
  '06': 'июн',
  '07': 'июл',
  '08': 'авг',
  '09': 'сен',
  '10': 'окт',
  '11': 'ноя',
  '12': 'дек',
};

function formatDateAndTime(fullDate: string) {
  const [date, time] = fullDate.split('T');
  const [year, month, day] = date.split('-');
  const [hours, minutes] = time.split(':');

  return `${day} ${monthMap[month]} ${year} (${hours}:${minutes})`;
}

export default formatDateAndTime;
