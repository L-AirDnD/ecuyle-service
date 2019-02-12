import React from 'react';
import PropTypes from 'prop-types';

import ReservationDetails from './ReservationDetails';
import DatePicker from './DatePicker';
import GuestPicker from './GuestPicker';
import ReservationConfirmation from './ReservationConfirmation';
import ReservationHook from './ReservationHook';

import StyledReservation from '../styles/Reservation';

import controller from '../controller';

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offering: {},
    };
  }

  componentDidMount() {
    const { offeringId } = this.props;
    controller.getOfferingDetailsById(offeringId)
      .then((response) => {
        this.setState({
          offering: response,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    const { offering } = this.state;
    return (
      <StyledReservation>
        <ReservationDetails offering={offering} />
        <DatePicker />
        <GuestPicker />
        <ReservationConfirmation />
        { offering.weeklyViewCount > 500
          ? <ReservationHook weeklyViewCount={offering.weeklyViewCount} />
          : ''
        }
      </StyledReservation>
    );
  }
}

Reservation.defaultProps = {
  offeringId: 0,
};

Reservation.propTypes = {
  offeringId: PropTypes.number,
};

export default Reservation;
