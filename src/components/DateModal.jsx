import React from 'react';
import PropTypes from 'prop-types';
import Calendar from './Calendar';

import {
  Modal,
  LinkButton,
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
        <LinkButton onClick={handleClearDates}>
          Clear Dates
        </LinkButton>
      );
    }
    return '';
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
