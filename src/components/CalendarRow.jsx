import React from 'react';
import helpers from '../helpers';
import moment from 'moment';

import {
  StyledCalendarRow,
  StyledLockedDay,
  StyledDay,
  StyledSelectedDay,
  StyledDayText,
  StyledLockedDayText,
  StyledHighlightedDay,
  StyledHighlightedText,
  StyledDate,
} from '../styles/common';

const CalendarRow = (props) => {
  const {
    values,
    handleDayClick,
    hasOneDateSelected,
    checkIn,
    checkOut,
  } = props;

  const getCalendarDays = () => {
    const checkInDate = moment(checkIn).format('YYYY-MM-DD');
    const checkOutDate = moment(checkOut).format('YYYY-MM-DD');
    return values.map((value) => {
      const calendarDate = moment(value[2]).format('YYYY-MM-DD');
      if (value[1] === true) {
        return (
          <StyledLockedDay id={helpers.generateUniqueId()} key={helpers.generateUniqueId()}>
            <StyledLockedDayText>{value[0]}</StyledLockedDayText>
          </StyledLockedDay>
        );
      }
      if (calendarDate === checkInDate || calendarDate === checkOutDate) {
        return (
          <StyledSelectedDay
            onClick={() => handleDayClick(value[2])}
            id={value[2]}
            key={value[2]}
          >
            <StyledHighlightedText>{value[0]}</StyledHighlightedText>
          </StyledSelectedDay>
        );
      }
      if (hasOneDateSelected) {
        return (
          <StyledHighlightedDay
            onClick={() => handleDayClick(value[2])}
            id={value[2]}
            key={value[2]}
          >
            <StyledDayText>{value[0]}</StyledDayText>
          </StyledHighlightedDay>
        );
      }
      return (
        <StyledDay onClick={() => handleDayClick(value[2])} id={value[2]} key={value[2]}>
          <StyledDayText>{value[0]}</StyledDayText>
        </StyledDay>
      );
    });
  };

  return (
    <StyledCalendarRow>
      { getCalendarDays() }
    </StyledCalendarRow>
  );
};

export default CalendarRow;
