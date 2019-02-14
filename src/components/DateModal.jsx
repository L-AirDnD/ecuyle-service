import React from 'react';
import PropTypes from 'prop-types';
import Calendar from './Calendar';

import {
  Modal,
} from '../styles/common';

const DateModal = (props) => {
  const { handleDayClick, reservations } = props;
  return (
    <Modal>
      <Calendar
        reservations={reservations}
        handleDayClick={handleDayClick}
      />
    </Modal>
  );
};

export default DateModal;
