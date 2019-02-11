import React from 'react';
import ReservationDetails from './ReservationDetails';
import DatePicker from './DatePicker';
import GuestPicker from './GuestPicker';
import ReservationConfirmation from './ReservationConfirmation';
import ReservationHook from './ReservationHook';

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="reservation">
        <ReservationDetails />
        <DatePicker />
        <GuestPicker />
        <ReservationConfirmation />
        <ReservationHook />
      </div>
    );
  }
}

export default Reservation;
