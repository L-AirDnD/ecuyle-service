const DateIterator = (year, month) => {
  // year and month must both be ints, where month starts at 0 for Jan
  // returns null when iteration is finished for the given month
  let i = 1;
  const firstDay = new Date(year, month, i);
  let currDay = firstDay;
  const lastDay = new Date(year, month + 1, 0);
  const iterator = (shouldStartIterating) => {
    if (shouldStartIterating) {
      currDay = new Date(year, month, i);
      i += 1;
      if (currDay <= lastDay) {
        return currDay;
      }
      return null;
    }
    return currDay;
  };
  return iterator;
};

export default DateIterator;
