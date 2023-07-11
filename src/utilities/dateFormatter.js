const checkDateType = (passedDate) => passedDate instanceof Date ? passedDate : new Date(passedDate);

export const removeSeconds = timeString => {
  const splitTime = timeString.split(' ');
  splitTime[0] = splitTime[0].split(':').slice(0,-1).join(':');
  return splitTime.join(' ');
};

const dayLength = {
  longName: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
  shortName: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
};
const weekDayIndexes = (passedDate) => checkDateType(passedDate).getDay();

export const formattedWeekDayName = (passedDate, length) => dayLength[length][weekDayIndexes(passedDate)];
export const formattedMonth = (passedDate) => checkDateType(passedDate).getMonth();
export const formattedDay = (passedDate) => checkDateType(passedDate).getDate();
export const formattedYear = (passedDate) => checkDateType(passedDate).getFullYear();
export const formattedTime = (passedDate, showSeconds = false) => !showSeconds ? removeSeconds(checkDateType(passedDate).toLocaleTimeString()) : checkDateType(passedDate).toLocaleTimeString();

export const fullDate = passedDate => `${formattedMonth(passedDate)}/${formattedDay(passedDate)}/${formattedYear(passedDate)}`;
export const fullDateWithTime = passedDate => `${formattedMonth(passedDate)}/${formattedDay(passedDate)}/${formattedYear(passedDate)} ${formattedTime(passedDate)}`;
