import React from 'react';
import ReservationDetails from './ReservationDetails';
import DatePicker from './DatePicker';
import GuestPicker from './GuestPicker';
import ReservationConfirmation from './ReservationConfirmation';
import ReservationHook from './ReservationHook';

import StyledReservation from '../styles/Reservation';

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <StyledReservation>
        <ReservationDetails />
        <DatePicker />
        <GuestPicker />
        <ReservationConfirmation />
        <ReservationHook />
      </StyledReservation>
    );
  }
}

export default Reservation;
