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
      reservations: {},
      startDate: '',
      endDate: '',
      numAdults: 1,
      numChildren: 0,
      numInfants: 0,
    };

    this.handleGuestModalClose = this.handleGuestModalClose.bind(this);
  }

  componentDidMount() {
    const { offeringId } = this.props;
    controller.getOfferingDetailsById(offeringId)
      .then((offering) => {
        controller.getReservationsByOfferingId(offeringId)
          .then((reservations) => {
            this.setState({
              offering,
              reservations,
            });
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }

  handleGuestModalClose(guestDetails) {
    const { numAdults, numChildren, numInfants } = guestDetails;
    this.setState({
      numAdults,
      numChildren,
      numInfants,
    });
  }

  render() {
    const {
      offering: {
        pricePerDay,
        averageRating,
        totalReviewCount,
        weeklyViewCount,
        maxGuests,
        maxInfants,
      },
      numAdults,
      numChildren,
      numInfants,
      reservations,
    } = this.state;

    return (
      <StyledReservation>
        <ReservationDetails
          pricePerDay={pricePerDay}
          averageRating={averageRating}
          totalReviewCount={totalReviewCount}
        />
        <DatePicker reservations={reservations} />
        <GuestPicker
          maxGuests={maxGuests}
          maxInfants={maxInfants}
          numAdults={numAdults}
          numChildren={numChildren}
          numInfants={numInfants}
          handleGuestModalClose={this.handleGuestModalClose}
        />
        <ReservationConfirmation />
        { weeklyViewCount > 500
          ? <ReservationHook weeklyViewCount={weeklyViewCount} />
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
