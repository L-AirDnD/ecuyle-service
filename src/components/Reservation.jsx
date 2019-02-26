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
      dateModalShowing: false,
      guestModalShowing: false,
      dateFocus: '',
    };

    this.handleBookingClick = this.handleBookingClick.bind(this);
    this.clearDatePicker = this.clearDatePicker.bind(this);
    this.setCheckIn = this.setCheckIn.bind(this);
    this.setCheckOut = this.setCheckOut.bind(this);
    this.showDateModal = this.showDateModal.bind(this);
    this.closeDateModal = this.closeDateModal.bind(this);
    this.showGuestModal = this.showGuestModal.bind(this);
    this.closeGuestModal = this.closeGuestModal.bind(this);
    this.handleGuestPickerClick = this.handleGuestPickerClick.bind(this);
    this.setDatePickerFocus = this.setDatePickerFocus.bind(this);
    this.clearParentGuestCount = this.clearParentGuestCount.bind(this);
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

  setDatePickerFocus(dateFocus) {
    this.setState({ dateFocus });
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

  showDateModal(dateFocus) {
    this.setState({
      dateModalShowing: true,
      dateFocus,
    }, () => {
      document.getElementById('dateModal').focus();
    });
  }

  showGuestModal() {
    this.setState({
      guestModalShowing: true,
    }, () => {
      document.getElementById('guestModal').focus();
    });
  }

  closeDateModal() {
    this.setState({
      dateModalShowing: false,
      dateFocus: '',
    });
  }

  closeGuestModal(numAdults, numChildren, numInfants) {
    this.setState({
      guestModalShowing: false,
      numAdults,
      numChildren,
      numInfants,
    });
  }

  clearParentGuestCount(numAdults, numChildren, numInfants) {
    this.setState({
      numAdults,
      numChildren,
      numInfants,
    });
  }

  handleGuestPickerClick() {
    const { guestModalShowing } = this.state;
    if (guestModalShowing) {
      this.closeGuestModal();
    } else {
      this.showGuestModal();
    }
  }

  clearDatePicker() {
    this.getOfferingDetails();
  }

  handleBookingClick() {
    const {
      checkIn,
      checkOut,
    } = this.state;

    if (checkIn === '') {
      this.showDateModal('checkIn');
    } else if (checkOut === '') {
      this.showDateModal('checkOut');
    } else {
      controller.postReservationByOfferingId(this.buildReservation())
        .then(() => {
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
      dateModalShowing,
      dateFocus,
      guestModalShowing,
    } = this.state;

    return (
      <StyledReservation id="reservation">
        <ReservationDetails
          pricePerDay={pricePerDay}
          averageRating={averageRating}
          totalReviewCount={totalReviewCount}
        />
        <DatePicker
          checkIn={checkIn}
          checkOut={checkOut}
          reservations={reservations}
          dateModalShowing={dateModalShowing}
          dateFocus={dateFocus}
          clearDatePicker={this.clearDatePicker}
          setCheckIn={this.setCheckIn}
          setCheckOut={this.setCheckOut}
          showDateModal={this.showDateModal}
          closeDateModal={this.closeDateModal}
          setDatePickerFocus={this.setDatePickerFocus}
        />
        <GuestPicker
          maxGuests={maxGuests}
          maxInfants={maxInfants}
          numAdults={numAdults}
          numChildren={numChildren}
          numInfants={numInfants}
          guestModalShowing={guestModalShowing}
          showGuestModal={this.showGuestModal}
          closeGuestModal={this.closeGuestModal}
          clearParentGuestCount={this.clearParentGuestCount}
          handleGuestPickerClick={this.handleGuestPickerClick}
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
  guestId: 0,
};

Reservation.propTypes = {
  offeringId: PropTypes.number,
  guestId: PropTypes.number,
};

export default Reservation;
