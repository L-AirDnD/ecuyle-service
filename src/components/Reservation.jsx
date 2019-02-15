import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import controller from '../controller';

import ReservationDetails from './ReservationDetails';
import DatePicker from './DatePicker';
import GuestPicker from './GuestPicker';
import ReservationConfirmation from './ReservationConfirmation';
import ReservationHook from './ReservationHook';

import StyledReservation from '../styles/Reservation';


class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offering: {},
      reservations: [],
      checkIn: '',
      checkOut: '',
      numAdults: 1,
      numChildren: 0,
      numInfants: 0,
      openDateModalFunc: () => {},
      closeDateModalFunc: () => {},
      closeGuestModalFunc: () => {},
      clearDatesFunc: () => {},
      clearGuestsFunc: () => {},
    };

    this.handleGuestModalClose = this.handleGuestModalClose.bind(this);
    this.handleDateModalFinish = this.handleDateModalFinish.bind(this);
    this.handleStrayClick = this.handleStrayClick.bind(this);
    this.getOpenDateModalFunc = this.getOpenDateModalFunc.bind(this);
    this.getCloseDateModalFunc = this.getCloseDateModalFunc.bind(this);
    this.getCloseGuestModalFunc = this.getCloseGuestModalFunc.bind(this);
    this.handleBookingClick = this.handleBookingClick.bind(this);
    this.getClearDatesFunc = this.getClearDatesFunc.bind(this);
    this.getClearGuestsFunc = this.getClearGuestsFunc.bind(this);
  }

  componentDidMount() {
    this.getOfferingDetails();
  }

  getOfferingDetails() {
    const { offeringId } = this.props;
    controller.getOfferingDetailsById(offeringId)
      .then((offering) => {
        controller.getReservationsByOfferingId(offeringId)
          .then((reservations) => {
            this.setState({
              offering,
              reservations,
              checkIn: '',
              checkOut: '',
              numAdults: 1,
              numChildren: 0,
              numInfants: 0,
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

  getOpenDateModalFunc(openDateModalFunc) {
    this.setState({
      openDateModalFunc,
    });
  }

  getClearDatesFunc(clearDatesFunc) {
    this.setState({
      clearDatesFunc,
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

  getClearGuestsFunc(clearGuestsFunc) {
    this.setState({
      clearGuestsFunc,
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

  handleBookingClick() {
    const {
      checkIn,
      checkOut,
      numAdults,
      numChildren,
      numInfants,
      openDateModalFunc,
      clearDatesFunc,
      clearGuestsFunc,
    } = this.state;

    if (checkIn === '') {
      openDateModalFunc('checkIn');
    } else if (checkOut === '') {
      openDateModalFunc('checkOut');
    } else {
      controller.postReservationByOfferingId(this.buildReservation())
        .then(() => {
          clearDatesFunc();
          clearGuestsFunc();
          this.getOfferingDetails();
        })
        .catch((err) => {
          throw err;
        });
    }
  }

  buildReservation() {
    const {
      numAdults,
      numChildren,
      numInfants,
      offering: { pricePerDay },
    } = this.state;
    let { checkIn, checkOut } = this.state;
    const { offeringId, guestId } = this.props;
    const totalPrice = pricePerDay * (moment(checkOut).diff(moment(checkIn), 'days'));

    checkIn = moment(checkIn).format('YYYY-MM-DD HH:MM:SS');
    checkOut = moment(checkOut).format('YYYY-MM-DD HH:MM:SS');

    return {
      offeringId,
      guestId,
      startDate: checkIn,
      endDate: checkOut,
      numAdults,
      numChildren,
      numInfants,
      totalPrice,
    };
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
          getOpenDateModalFunc={this.getOpenDateModalFunc}
          getCloseDateModalFunc={this.getCloseDateModalFunc}
          handleDateModalFinish={this.handleDateModalFinish}
          getClearDatesFunc={this.getClearDatesFunc}
        />
        <GuestPicker
          maxGuests={maxGuests}
          maxInfants={maxInfants}
          numAdults={numAdults}
          numChildren={numChildren}
          numInfants={numInfants}
          handleGuestModalClose={this.handleGuestModalClose}
          getCloseGuestModalFunc={this.getCloseGuestModalFunc}
          getClearGuestsFunc={this.getClearGuestsFunc}
        />
        <ReservationConfirmation handleBookingClick={this.handleBookingClick} />
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
