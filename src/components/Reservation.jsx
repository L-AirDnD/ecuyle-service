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
      datesSelected: false,
      openDateModalFunc: () => {},
      closeDateModalFunc: () => {},
      closeGuestModalFunc: () => {},
      clearGuestsFunc: () => {},
    };

    this.handleGuestModalClose = this.handleGuestModalClose.bind(this);
    this.handleDateModalFinish = this.handleDateModalFinish.bind(this);
    this.handleStrayClick = this.handleStrayClick.bind(this);
    this.getOpenDateModalFunc = this.getOpenDateModalFunc.bind(this);
    this.getCloseDateModalFunc = this.getCloseDateModalFunc.bind(this);
    this.getCloseGuestModalFunc = this.getCloseGuestModalFunc.bind(this);
    this.handleBookingClick = this.handleBookingClick.bind(this);
    this.getClearGuestsFunc = this.getClearGuestsFunc.bind(this);

    this.clearDatePicker = this.clearDatePicker.bind(this);
    this.setCheckIn = this.setCheckIn.bind(this);
    this.setCheckOut = this.setCheckOut.bind(this);
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
              datesSelected: false,
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

  setCheckIn(checkIn) {
    const { checkOut } = this.state;
    const reservations = this.buildAvailableDatesAfterCheckIn(checkIn);
    const datesSelected = checkOut !== '';
    this.setState({
      checkIn,
      reservations,
      datesSelected,
    });
  }

  setCheckOut(checkOut) {
    const { checkIn } = this.state;
    const datesSelected = checkIn !== '';
    this.setState({
      checkOut,
      datesSelected,
    });
  }

  getClosestReservationToCheckIn(checkIn) {
    const MAX_DATE = moment(8640000000000000);
    const { reservations } = this.state;
    if (reservations.length === 1) return MAX_DATE;
    for (let i = 0; i < reservations.length - 1; i += 1) {
      const reservationStartDate = moment(reservations[i].start_date);
      const reservationEndDate = moment(reservations[i].end_date);
      const nextReservationStartDate = moment(reservations[i + 1].start_date);
      const checkInDate = moment(checkIn);
      if (checkInDate < reservationStartDate) {
        return reservationStartDate;
      }
      if (checkInDate < nextReservationStartDate && checkInDate > reservationEndDate) {
        return nextReservationStartDate;
      }
    }
    return MAX_DATE;
  }

  buildAvailableDatesAfterCheckIn(checkIn) {
    const MAX_DATE = moment(8640000000000000);
    const latestCheckOut = this.getClosestReservationToCheckIn(checkIn);
    const availBeforeCheckIn = {
      start_date: moment().format(),
      end_date: moment(checkIn).subtract(1, 'days').format(),
    };
    const availAfterLatestCheckOut = {
      start_date: latestCheckOut.format(),
      end_date: MAX_DATE.format(),
    };
    return [availBeforeCheckIn, availAfterLatestCheckOut];
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
      datesSelected: true,
    });
  }

  handleStrayClick(e) {
    const { target } = e;
    const { id } = target;
    const { closeDateModalFunc, closeGuestModalFunc } = this.state;
    if (id !== 'checkIn' && id !== 'checkOut' && document.querySelector('#dateModal') && !document.querySelector('#dateModal').contains(target)) {
      console.log('called inside');
      closeDateModalFunc();
    }
    if (document.querySelector('#guestModal') && !document.querySelector('#guestModal').contains(target)) {
      closeGuestModalFunc();
    }
  }

  clearDatePicker() {
    this.getOfferingDetails();
  }

  handleBookingClick() {
    const {
      checkIn,
      checkOut,
      openDateModalFunc,
      clearGuestsFunc,
    } = this.state;

    if (checkIn === '') {
      openDateModalFunc('checkIn');
    } else if (checkOut === '') {
      openDateModalFunc('checkOut');
    } else {
      controller.postReservationByOfferingId(this.buildReservation())
        .then(() => {
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
      datesSelected,
    } = this.state;

    return (
      <StyledReservation id="reservation" onClick={this.handleStrayClick}>
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
          clearDatePicker={this.clearDatePicker}
          setCheckIn={this.setCheckIn}
          setCheckOut={this.setCheckOut}
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
        <ReservationConfirmation
          datesSelected={datesSelected}
          pricePerDay={pricePerDay}
          checkIn={checkIn}
          checkOut={checkOut}
          handleBookingClick={this.handleBookingClick}
        />
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
