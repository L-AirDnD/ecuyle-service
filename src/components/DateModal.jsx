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
    focus,
    closeDateModal,
  } = props;

  const showClearDatesIfApplicable = () => {
    if (checkIn !== '' || checkOut !== '') {
      return (
        <StyledRightCalendarRow>
          <LinkButton id="clearDates" onClick={handleClearDates}>
            Clear Dates
          </LinkButton>
        </StyledRightCalendarRow>
      );
    }
    return <StyledRightCalendarRow />;
  };

  return (
    <Modal id="dateModal" tabIndex="0" onBlur={closeDateModal}>
      <Calendar
        focus={focus}
        reservations={reservations}
        handleDayClick={handleDayClick}
        checkIn={checkIn}
        checkOut={checkOut}
      />
      { showClearDatesIfApplicable() }
    </Modal>
  );
};

DateModal.defaultProps = {
  handleDayClick: () => {},
  reservations: [],
  checkIn: '',
  checkOut: '',
  handleClearDates: () => {},
  focus: '',
};

DateModal.propTypes = {
  handleDayClick: PropTypes.func,
  reservations: PropTypes.array,
  checkIn: PropTypes.string,
  checkOut: PropTypes.string,
  handleClearDates: PropTypes.func,
  focus: PropTypes.string,
};

export default DateModal;
