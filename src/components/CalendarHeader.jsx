import React from 'react';

import {
  StyledCalendarRow,
  StyledCalendarHeader,
  StyledDayHeaderText,
} from '../styles/common';

const CalendarHeader = (props) => {
  const { values } = props;
  return (
    <StyledCalendarRow>
      <StyledCalendarHeader>
        <StyledDayHeaderText>{values[0]}</StyledDayHeaderText>
      </StyledCalendarHeader>
      <StyledCalendarHeader>
        <StyledDayHeaderText>{values[1]}</StyledDayHeaderText>
      </StyledCalendarHeader>
      <StyledCalendarHeader>
        <StyledDayHeaderText>{values[2]}</StyledDayHeaderText>
      </StyledCalendarHeader>
      <StyledCalendarHeader>
        <StyledDayHeaderText>{values[3]}</StyledDayHeaderText>
      </StyledCalendarHeader>
      <StyledCalendarHeader>
        <StyledDayHeaderText>{values[4]}</StyledDayHeaderText>
      </StyledCalendarHeader>
      <StyledCalendarHeader>
        <StyledDayHeaderText>{values[5]}</StyledDayHeaderText>
      </StyledCalendarHeader>
      <StyledCalendarHeader>
        <StyledDayHeaderText>{values[6]}</StyledDayHeaderText>
      </StyledCalendarHeader>
    </StyledCalendarRow>
  );
};

export default CalendarHeader;
