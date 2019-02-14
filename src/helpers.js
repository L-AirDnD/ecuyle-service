import moment from 'moment';
import shortid from 'shortid';

const helpers = {
  checkDateInPast: (dateToCheck) => {
    const currDate = moment().format('YYYY-MM-DD');
    if (dateToCheck < currDate) return true;
    return false;
  },
  atomicForEach: (array, cb) => {
    // if the cb returns true, means user wants to exit the forEach early.
    // otherwise if cb returns false, keep iterating.
    let exitEarlyFlag = false;
    for (let i = 0; i < array.length; i += 1) {
      exitEarlyFlag = cb(array[i], i, array);
      if (exitEarlyFlag) return true;
    }
    return false;
  },
  padWithZeros: (value, finalLength) => {
    let newValue = value.toString();
    while (newValue.length < finalLength) {
      newValue = `0${newValue}`;
    }
    return newValue;
  },
  checkReservationConflict: (reservations, monthYear, date) => {
    const dateToCheck = moment(`${monthYear}-${helpers.padWithZeros(date, 2)}`).format('YYYY-MM-DD');
    if (helpers.checkDateInPast(dateToCheck)) return true;
    return helpers.atomicForEach(reservations, (reservation) => {
      const startDate = moment(reservation.start_date).format('YYYY-MM-DD');
      const endDate = moment(reservation.end_date).format('YYYY-MM-DD');
      if (startDate <= dateToCheck && dateToCheck <= endDate) return true;
      return false;
    });
  },
  generateUniqueId() {
    return shortid.generate();
  },
};

export default helpers;
