import React from 'react';
import {
  Wrapper,
  Title3Light,
  StyledDates,
  Paragraph,
  StyledDate,
  StyledArrow,
} from '../styles/common';

const DatePicker = (props) => {
  return (
    <Wrapper>
      <Paragraph>
        Dates
      </Paragraph>
      <StyledDates>
        <StyledDate>
          <Title3Light>Check in</Title3Light>
        </StyledDate>
        <StyledArrow>
          <img src="assets/right-arrow.svg" alt="right-arrow" height="20px" width="50px" />
        </StyledArrow>
        <StyledDate>
          <Title3Light>Check out</Title3Light>
        </StyledDate>
      </StyledDates>
    </Wrapper>
  );
};

export default DatePicker;
