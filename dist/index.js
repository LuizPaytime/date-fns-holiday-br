"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextWorkingDay = exports.isWorkingDay = exports.isNationalHoliday = exports.getNationalHolidays = void 0;
const date_fns_1 = require("date-fns");
const startOfDay = (date) => {
    return new Date(new Date(date).setHours(12, 0, 0, 0));
};
const _calculateEaster = (year) => {
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
    return (0, date_fns_1.toDate)(new Date(`${year}-${month}-${day} 12:00:00`));
};
const _calculateCorpusChristi = (easterDate) => {
    return (0, date_fns_1.addDays)(easterDate, 60);
};
const _calculateCarnival = (easterDate) => {
    return (0, date_fns_1.subDays)(easterDate, 47);
};
const _calculateGodsFriday = (easterDate) => {
    return (0, date_fns_1.subDays)(easterDate, 2);
};
const getNationalHolidays = (year) => {
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
        (0, date_fns_1.toDate)(new Date(`${year}-01-01 ${setTimeZone}`)),
        (0, date_fns_1.toDate)(new Date(`${year}-04-21 ${setTimeZone}`)),
        (0, date_fns_1.toDate)(new Date(`${year}-05-01 ${setTimeZone}`)),
        (0, date_fns_1.toDate)(new Date(`${year}-09-07 ${setTimeZone}`)),
        (0, date_fns_1.toDate)(new Date(`${year}-10-12 ${setTimeZone}`)),
        (0, date_fns_1.toDate)(new Date(`${year}-11-02 ${setTimeZone}`)),
        (0, date_fns_1.toDate)(new Date(`${year}-11-15 ${setTimeZone}`)),
        (0, date_fns_1.toDate)(new Date(`${year}-11-20 ${setTimeZone}`)),
        (0, date_fns_1.toDate)(new Date(`${year}-12-25 ${setTimeZone}`))
    ];
};
exports.getNationalHolidays = getNationalHolidays;
const isNationalHoliday = (givenDate) => {
    const nationalHolidays = (0, exports.getNationalHolidays)(givenDate.getFullYear());
    for (const holiday of nationalHolidays) {
        if ((0, date_fns_1.isEqual)(startOfDay(givenDate), startOfDay(holiday))) {
            return true;
        }
    }
    return false;
};
exports.isNationalHoliday = isNationalHoliday;
const isWeekend = (date) => {
    const givenDate = startOfDay(date);
    const dayOfWeek = givenDate.getDay();
    return dayOfWeek === 6 || dayOfWeek === 0;
};
const isHoliday = (date) => {
    const givenDate = startOfDay(date);
    if (!(0, date_fns_1.isValid)(givenDate)) {
        return false;
    }
    if ((0, exports.isNationalHoliday)(givenDate)) {
        return true;
    }
    return false;
};
const isWorkingDay = (date) => {
    const givenDate = startOfDay(date);
    if (!(0, date_fns_1.isValid)(givenDate)) {
        return false;
    }
    if (isWeekend(givenDate)) {
        return false;
    }
    if (isHoliday(givenDate)) {
        return false;
    }
    return true;
};
exports.isWorkingDay = isWorkingDay;
const getNextWorkingDay = (date = new Date()) => {
    let nextDate = (0, date_fns_1.addDays)(date, 1);
    while (!(0, exports.isWorkingDay)(nextDate)) {
        nextDate = (0, date_fns_1.addDays)(nextDate, 1);
    }
    return nextDate;
};
exports.getNextWorkingDay = getNextWorkingDay;
