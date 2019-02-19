import React from 'react';
import moment from 'moment';

import {
  CenteredWrapper,
  Wrapper,
  StyledConfirmation,
  Paragraph,
  StyledLineShort,
  StyledSummary,
  StyledSummaryRow,
  Title4Light,
  Title4Bold,
} from '../styles/common';

const ReservationConfirmation = (props) => {
  const {
    datesSelected,
    checkIn,
    checkOut,
    pricePerDay,
    handleBookingClick,
  } = props;

  const getRandomInt = max => (
    Math.floor(Math.random() * Math.floor(max))
  );

  const serviceFee = getRandomInt(200);

  const getNumDaysBetweenSelectedDates = () => (
    moment(checkOut).diff(moment(checkIn), 'days')
  );

  const getTotalPriceForDateSelectionString = () => (
    `$${Math.round(pricePerDay * getNumDaysBetweenSelectedDates())}`
  );

  const getTotalPriceForDateSelectionInt = () => (
    Math.round(pricePerDay * getNumDaysBetweenSelectedDates())
  );

  const getTotalSummaryInvoice = () => (
    serviceFee + getTotalPriceForDateSelectionInt()
  );

  const generateReservationSummary = () => (
    <StyledSummary>
      <StyledSummaryRow>
        <Title4Light>{`$${pricePerDay} x ${getNumDaysBetweenSelectedDates()} nights`}</Title4Light>
        <Title4Light>{getTotalPriceForDateSelectionString()}</Title4Light>
      </StyledSummaryRow>
      <StyledLineShort />
      <StyledSummaryRow>
        <Title4Light>Service Fee</Title4Light>
        <Title4Light>{`$${serviceFee}`}</Title4Light>
      </StyledSummaryRow>
      <StyledLineShort />
      <StyledSummaryRow>
        <Title4Bold>Total</Title4Bold>
        <Title4Bold>{`$${getTotalSummaryInvoice()}`}</Title4Bold>
      </StyledSummaryRow>
    </StyledSummary>
  );

  return (
    <div>
      { datesSelected ? generateReservationSummary() : '' }
      <CenteredWrapper>
        <Wrapper>
          <StyledConfirmation id="book" onClick={handleBookingClick}>Book</StyledConfirmation>
        </Wrapper>
        <Wrapper>
          <Paragraph>You won&#39;t be charged yet</Paragraph>
        </Wrapper>
      </CenteredWrapper>
    </div>
  );
};

export default ReservationConfirmation;
