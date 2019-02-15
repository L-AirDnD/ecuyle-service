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
      checkIn: '',
      checkOut: '',
      numAdults: 1,
      numChildren: 0,
      numInfants: 0,
      closeDateModalFunc: () => {},
      closeGuestModalFunc: () => {},
    };

    this.handleGuestModalClose = this.handleGuestModalClose.bind(this);
    this.handleDateModalFinish = this.handleDateModalFinish.bind(this);
    this.handleStrayClick = this.handleStrayClick.bind(this);
    this.getCloseDateModalFunc = this.getCloseDateModalFunc.bind(this);
    this.getCloseGuestModalFunc = this.getCloseGuestModalFunc.bind(this);
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

  getCloseDateModalFunc(closeDateModalFunc) {
    this.setState({
      closeDateModalFunc,
    });
  }

  getCloseGuestModalFunc(closeGuestModalFunc) {
    this.setState({
      closeGuestModalFunc,
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

  handleDateModalFinish(dateDetails) {
    const { checkIn, checkOut } = dateDetails;
    this.setState({
      checkIn,
      checkOut,
    });
  }

  handleStrayClick(e) {
    const { target } = e;
    const { id } = target;
    const { closeDateModalFunc, closeGuestModalFunc } = this.state;
    if (id !== 'checkIn' && id !== 'checkOut' && document.querySelector('#dateModal') && !document.querySelector('#dateModal').contains(target)) {
      closeDateModalFunc();
    }
    if (document.querySelector('#guestModal') && !document.querySelector('#guestModal').contains(target)) {
      closeGuestModalFunc();
    }
  }

  render() {
    console.log(this.state);
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
      checkIn,
      checkOut,
    } = this.state;

    return (
      <StyledReservation onClick={this.handleStrayClick}>
        <ReservationDetails
          pricePerDay={pricePerDay}
          averageRating={averageRating}
          totalReviewCount={totalReviewCount}
        />
        <DatePicker
          checkIn={checkIn}
          checkOut={checkOut}
          reservations={reservations}
          getCloseDateModalFunc={this.getCloseDateModalFunc}
          handleDateModalFinish={this.handleDateModalFinish}
        />
        <GuestPicker
          maxGuests={maxGuests}
          maxInfants={maxInfants}
          numAdults={numAdults}
          numChildren={numChildren}
          numInfants={numInfants}
          handleGuestModalClose={this.handleGuestModalClose}
          getCloseGuestModalFunc={this.getCloseGuestModalFunc}
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
