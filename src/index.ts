import { addDays, isEqual, subDays, toDate, isValid } from 'date-fns';

const startOfDay = (date: any) => {
  return new Date(new Date(date).setHours(12, 0, 0, 0));
};

const _calculateEaster = (year: number) => {
  const C = Math.floor(year / 100);
  const N = year - 19 * Math.floor(year / 19);
  const K = Math.floor((C - 17) / 25);
  let I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
  I = I - 30 * Math.floor(I / 30);
  I =
		I -
		Math.floor(I / 28) *
			(1 -
				Math.floor(I / 28) *
					Math.floor(29 / (I + 1)) *
					Math.floor((21 - N) / 11));
  let J = year + Math.floor(year / 4) + I + 2 - C + Math.floor(C / 4);
  J = J - 7 * Math.floor(J / 7);
  const L = I - J;
  const M = 3 + Math.floor((L + 40) / 44);
  const D = L + 28 - 31 * Math.floor(M / 4);
  const month = M.toString().padStart(2, '0');
  const day = D.toString().padStart(2, '0');

  return toDate(new Date(`${year}-${month}-${day} 12:00:00`));
};

const _calculateCorpusChristi = (easterDate: Date) => {
  return addDays(easterDate, 60);
};

const _calculateCarnival = (easterDate: Date) => {
  return subDays(easterDate, 47);
};

const _calculateGodsFriday = (easterDate: Date) => {
  return subDays(easterDate, 2);
};

export const getNationalHolidays = (year: number) => {
  const easterDate = _calculateEaster(year);
  const corpusChristiDate = _calculateCorpusChristi(easterDate);
  const carnivalDate = _calculateCarnival(easterDate);
  const godsFridayDate = _calculateGodsFriday(easterDate);

  const setTimeZone = '12:00:00';

  return [
    easterDate,
    corpusChristiDate,
    carnivalDate,
    godsFridayDate,
    toDate(new Date(`${year}-01-01 ${setTimeZone}`)),
    toDate(new Date(`${year}-04-21 ${setTimeZone}`)),
    toDate(new Date(`${year}-05-01 ${setTimeZone}`)),
    toDate(new Date(`${year}-09-07 ${setTimeZone}`)),
    toDate(new Date(`${year}-10-12 ${setTimeZone}`)),
    toDate(new Date(`${year}-11-02 ${setTimeZone}`)),
    toDate(new Date(`${year}-11-15 ${setTimeZone}`)),
    toDate(new Date(`${year}-11-20 ${setTimeZone}`)),
    toDate(new Date(`${year}-12-25 ${setTimeZone}`))
  ];
};

export const isNationalHoliday = (givenDate: Date) => {
  const nationalHolidays = getNationalHolidays(givenDate.getFullYear());

  for (const holiday of nationalHolidays) {
    if (isEqual(startOfDay(givenDate), startOfDay(holiday))) {
      return true;
    }
  }

  return false;
};

const isWeekend = (date: Date) => {
  const givenDate = startOfDay(date);
  const dayOfWeek = givenDate.getDay();

  return dayOfWeek === 6 || dayOfWeek === 0;
};

const isHoliday = (date: Date) => {
  const givenDate = startOfDay(date);

  if (!isValid(givenDate)) {
    return false;
  }

  return isNationalHoliday(givenDate);
};

export const isWorkingDay = (date: Date) => {
  const givenDate = startOfDay(date);

  if (!isValid(givenDate)) {
    return false;
  }

  if (isWeekend(givenDate)) {
    return false;
  }

  return !isHoliday(givenDate);

};

export const getNextWorkingDay = (date = new Date()) => {
  let nextDate = addDays(date, 1);

  while (!isWorkingDay(nextDate)) {
    nextDate = addDays(nextDate, 1);
  }

  return nextDate;
};

// Meme !@.@!
export const getFirstDayMouth = () => {
  return 1;
};

export const getPrevWorkingDay = (date = new Date()) => {
  let nextDate = subDays(date, 1);

  while (!isWorkingDay(nextDate)) {
    nextDate = subDays(nextDate, 1);
  }

  return nextDate;
};
