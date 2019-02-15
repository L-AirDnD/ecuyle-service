import React from 'react';
import PropTypes from 'prop-types';
import Calendar from './Calendar';

import {
  Modal,
  LinkButton,
  StyledRightCalendarRow,
} from '../styles/common';

const DateModal = (props) => {
  const {
    handleDayClick,
    reservations,
    checkIn,
    checkOut,
    handleClearDates,
  } = props;

  const showClearDatesIfApplicable = () => {
    if (checkIn !== '' || checkOut !== '') {
      return (
        <StyledRightCalendarRow>
          <LinkButton onClick={handleClearDates}>
            Clear Dates
          </LinkButton>
        </StyledRightCalendarRow>
      );
    }
    return <StyledRightCalendarRow />;
  };

  return (
    <Modal id="dateModal">
      <Calendar
        reservations={reservations}
        handleDayClick={handleDayClick}
      />
      { showClearDatesIfApplicable() }
    </Modal>
  );
};

export default DateModal;
