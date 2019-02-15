import React from 'react';
import helpers from '../helpers';

import {
  StyledCalendarRow,
  StyledLockedDay,
  StyledDay,
  StyledDayText,
  StyledLockedDayText,
} from '../styles/common';

const CalendarRow = (props) => {
  const { values, handleDayClick } = props;
  const getCalendarDays = () => (
    values.map((value) => {
      if (value[1] === true) {
        return (
          <StyledLockedDay id={helpers.generateUniqueId()} key={helpers.generateUniqueId()}>
            <StyledLockedDayText>{value[0]}</StyledLockedDayText>
          </StyledLockedDay>
        );
      }
      return (
        <StyledDay onClick={() => handleDayClick(value[2])} id={value[2]} key={value[2]}>
          <StyledDayText>{value[0]}</StyledDayText>
        </StyledDay>
      );
    })
  );

  return (
    <StyledCalendarRow>
      { getCalendarDays() }
    </StyledCalendarRow>
  );
};

export default CalendarRow;
