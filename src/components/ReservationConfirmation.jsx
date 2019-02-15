import React from 'react';
import {
  CenteredWrapper,
  Wrapper,
  StyledConfirmation,
  Paragraph,
} from '../styles/common';

const ReservationConfirmation = () => (
  <CenteredWrapper>
    <Wrapper>
      <StyledConfirmation>Book</StyledConfirmation>
    </Wrapper>
    <Wrapper>
      <Paragraph>You won&#39;t be charged yet</Paragraph>
    </Wrapper>
  </CenteredWrapper>
);

export default ReservationConfirmation;
