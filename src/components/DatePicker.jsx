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
    } = this.props;
    getOpenDateModalFunc(this.showModal);
    getCloseDateModalFunc(this.closeModal);
  }

  getModalIfAppropriate() {
    const {
      modalShowing,
      focus,
    } = this.state;
    const {
      checkIn,
      checkOut,
    } = this.props;
    let { reservations } = this.props;

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
    const { focus } = this.state;
    const { checkIn } = this.props;
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
    const { focus } = this.state;
    const { checkOut } = this.props;
    if (focus === 'checkOut') {
      return checkOut === ''
        ? <StyledFocusText id="checkOut" onClick={e => this.handleDateClick(e)}>Check out</StyledFocusText>
        : <StyledFocusText id="checkOut" onClick={e => this.handleDateClick(e)}>{moment(checkOut).format('MM/DD/YYYY')}</StyledFocusText>;
    }
    return checkOut === ''
      ? <Title3Light id="checkOut" onClick={e => this.handleDateClick(e)}>Check out</Title3Light>
      : <StyledSelectedDateText id="checkOut" onClick={e => this.handleDateClick(e)}>{moment(checkOut).format('MM/DD/YYYY')}</StyledSelectedDateText>;
  }

  setCheckInDate(date) {
    const { checkOut, setCheckIn } = this.props;
    setCheckIn(date);
    if (checkOut !== '' && this.checkReservationDatesValidity(date, checkOut)) {
      this.closeModal();
    } else {
      this.setState({
        focus: 'checkOut',
      });
    }
  }

  setCheckOutDate(date) {
    const { checkIn, setCheckOut } = this.props;
    setCheckOut(date);
    if (checkIn === '') {
      this.setState({
        focus: 'checkIn',
      });
    } else {
      this.closeModal();
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

  handleDayClick(date) {
    const { focus } = this.state;
    if (focus === 'checkIn') {
      this.setCheckInDate(date);
    } else if (focus === 'checkOut') {
      this.setCheckOutDate(date);
    }
  }

  handleDateClick(e) {
    const { id } = e.target;
    this.showModal(id);
  }

  handleClearDates() {
    const { clearDatePicker } = this.props;
    clearDatePicker();
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
