import React from 'react';
import {
  CenteredWrapper,
  Wrapper,
  StyledConfirmation,
  Paragraph,
} from '../styles/common';

const ReservationConfirmation = (props) => {
  const { handleBookingClick } = props;
  return (
    <CenteredWrapper>
      <Wrapper>
        <StyledConfirmation onClick={handleBookingClick}>Book</StyledConfirmation>
      </Wrapper>
      <Wrapper>
        <Paragraph>You won&#39;t be charged yet</Paragraph>
      </Wrapper>
    </CenteredWrapper>
  );
};

export default ReservationConfirmation;
