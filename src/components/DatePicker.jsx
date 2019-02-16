import React from 'react';
import moment from 'moment';
import DateModal from './DateModal';

import {
  Wrapper,
  Title3Light,
  StyledDates,
  Paragraph,
  StyledCheckIn,
  StyledCheckOut,
  StyledArrow,
  StyledFocusText,
  StyledSelectedDateText,
} from '../styles/common';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShowing: false,
      focus: '',
      checkIn: '',
      checkOut: '',
      currReservations: [],
    };

    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleClearDates = this.handleClearDates.bind(this);
  }

  componentDidMount() {
    const {
      getOpenDateModalFunc,
      getCloseDateModalFunc,
      getClearDatesFunc,
      checkIn,
      checkOut,
      reservations,
    } = this.props;
    getOpenDateModalFunc(this.showModal);
    getCloseDateModalFunc(this.closeModal);
    getClearDatesFunc(this.handleClearDates);
    this.setState({
      checkIn,
      checkOut,
      currReservations: reservations,
    });
  }

  getModalIfAppropriate() {
    const {
      modalShowing,
      checkIn,
      checkOut,
      focus,
    } = this.state;
    let { reservations } = this.props;
    if (checkIn !== '') {
      const { currReservations } = this.state;
      reservations = currReservations;
    }

    if (modalShowing) {
      return (
        <DateModal
          focus={focus}
          reservations={reservations}
          checkIn={checkIn}
          checkOut={checkOut}
          handleModalCloseClick={this.handleModalCloseClick}
          handleDayClick={this.handleDayClick}
          handleClearDates={this.handleClearDates}
        />
      );
    }
    return '';
  }

  getCheckInComponent() {
    const { focus, checkIn } = this.state;
    if (focus === 'checkIn') {
      return checkIn === ''
        ? <StyledFocusText id="checkIn" onClick={e => this.handleDateClick(e)}>Check in</StyledFocusText>
        : <StyledFocusText id="checkIn" onClick={e => this.handleDateClick(e)}>{moment(checkIn).format('MM/DD/YYYY')}</StyledFocusText>;
    }
    return checkIn === ''
      ? <Title3Light id="checkIn" onClick={e => this.handleDateClick(e)}>Check in</Title3Light>
      : <StyledSelectedDateText id="checkIn" onClick={e => this.handleDateClick(e)}>{moment(checkIn).format('MM/DD/YYYY')}</StyledSelectedDateText>;
  }

  getCheckOutComponent() {
    const { focus, checkOut } = this.state;
    if (focus === 'checkOut') {
      return checkOut === ''
        ? <StyledFocusText id="checkOut" onClick={e => this.handleDateClick(e)}>Check out</StyledFocusText>
        : <StyledFocusText id="checkOut" onClick={e => this.handleDateClick(e)}>{moment(checkOut).format('MM/DD/YYYY')}</StyledFocusText>;
    }
    return checkOut === ''
      ? <Title3Light id="checkOut" onClick={e => this.handleDateClick(e)}>Check out</Title3Light>
      : <StyledSelectedDateText id="checkOut" onClick={e => this.handleDateClick(e)}>{moment(checkOut).format('MM/DD/YYYY')}</StyledSelectedDateText>;
  }

  getClosestReservationToCheckIn(checkIn) {
    const MAX_DATE = moment(8640000000000000);
    const { reservations } = this.props;
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

  setCheckInDate(date) {
    const { checkOut } = this.state;
    if (checkOut !== '' && this.checkReservationDatesValidity(date, checkOut)) {
      this.setState({ checkIn: date }, () => {
        this.closeModal();
        this.sendDateDetailsToParentIfComplete();
      });
    } else {
      const currReservations = this.buildAvailableDatesAfterCheckIn(date);
      this.setState({
        checkIn: date,
        focus: 'checkOut',
        currReservations,
        checkOut: '',
      }, () => {
        this.sendDateDetailsToParentIfComplete();
      });
    }
  }

  setCheckOutDate(date) {
    const { checkIn } = this.state;
    if (checkIn === '') {
      this.setState({
        checkOut: date,
        focus: 'checkIn',
      }, () => {
        this.sendDateDetailsToParentIfComplete();
      });
    } else {
      this.setState({ checkOut: date }, () => {
        this.closeModal();
        this.sendDateDetailsToParentIfComplete();
      });
    }
  }

  checkReservationDatesValidity(checkIn, checkOut) {
    const { reservations } = this.props;
    const checkInDate = moment(checkIn);
    const checkOutDate = moment(checkOut);
    if (checkInDate > checkOutDate) return false;
    for (let i = 0; i < reservations.length; i += 1) {
      const reservationStart = moment(reservations[i].start_date);
      const reservationEnd = moment(reservations[i].end_date);
      if (checkInDate < reservationStart && checkOutDate > reservationEnd) return false;
    }
    return true;
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

  handleDayClick(date) {
    const { focus } = this.state;
    if (focus === 'checkIn') {
      this.setCheckInDate(date);
    } else if (focus === 'checkOut') {
      this.setCheckOutDate(date);
    }
  }

  sendDateDetailsToParentIfComplete() {
    const { checkIn, checkOut } = this.state;
    const { handleDateModalFinish } = this.props;
    handleDateModalFinish({
      checkIn,
      checkOut,
    });
  }

  handleDateClick(e) {
    const { id } = e.target;
    this.showModal(id);
  }

  handleClearDates() {
    const { reservations } = this.props;
    this.setState({
      checkIn: '',
      checkOut: '',
      currReservations: reservations,
    }, () => {
      this.closeModal();
    });
  }

  showModal(focus) {
    this.setState({
      modalShowing: true,
      focus,
    });
  }

  closeModal(focus) {
    this.setState({
      modalShowing: false,
      focus,
    });
  }

  render() {
    return (
      <Wrapper>
        <Paragraph>
          Dates
        </Paragraph>
        <StyledDates>
          <StyledCheckIn>
            { this.getCheckInComponent() }
          </StyledCheckIn>
          <StyledArrow>
            <img src="assets/right-arrow.svg" alt="right-arrow" height="20px" width="50px" />
          </StyledArrow>
          <StyledCheckOut>
            { this.getCheckOutComponent() }
          </StyledCheckOut>
        </StyledDates>
        { this.getModalIfAppropriate() }
      </Wrapper>
    );
  }
}

export default DatePicker;
