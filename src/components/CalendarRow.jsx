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
  const { values } = props;
  const getCalendarDays = () => (
    values.map((value) => {
      if (value[1] === true) {
        return (
          <StyledLockedDay key={helpers.generateUniqueId()}>
            <StyledLockedDayText>{value[0]}</StyledLockedDayText>
          </StyledLockedDay>
        );
      }
      return (
        <StyledDay key={helpers.generateUniqueId()}>
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
