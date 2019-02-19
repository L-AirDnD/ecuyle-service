import React from 'react';
import PropTypes from 'prop-types';
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

    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleClearDates = this.handleClearDates.bind(this);
  }

  getModalIfAppropriate() {
    const {
      checkIn,
      checkOut,
      dateFocus,
      dateModalShowing,
    } = this.props;
    const { reservations } = this.props;

    if (dateModalShowing) {
      return (
        <DateModal
          focus={dateFocus}
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
    const { checkIn, dateFocus } = this.props;
    if (dateFocus === 'checkIn') {
      return checkIn === ''
        ? <StyledFocusText id="checkIn" onClick={e => this.handleDateClick(e)}>Check in</StyledFocusText>
        : <StyledFocusText id="checkIn" onClick={e => this.handleDateClick(e)}>{moment(checkIn).format('MM/DD/YYYY')}</StyledFocusText>;
    }
    return checkIn === ''
      ? <Title3Light id="checkIn" onClick={e => this.handleDateClick(e)}>Check in</Title3Light>
      : <StyledSelectedDateText id="checkIn" onClick={e => this.handleDateClick(e)}>{moment(checkIn).format('MM/DD/YYYY')}</StyledSelectedDateText>;
  }

  getCheckOutComponent() {
    const { checkOut, dateFocus } = this.props;
    if (dateFocus === 'checkOut') {
      return checkOut === ''
        ? <StyledFocusText id="checkOut" onClick={e => this.handleDateClick(e)}>Check out</StyledFocusText>
        : <StyledFocusText id="checkOut" onClick={e => this.handleDateClick(e)}>{moment(checkOut).format('MM/DD/YYYY')}</StyledFocusText>;
    }
    return checkOut === ''
      ? <Title3Light id="checkOut" onClick={e => this.handleDateClick(e)}>Check out</Title3Light>
      : <StyledSelectedDateText id="checkOut" onClick={e => this.handleDateClick(e)}>{moment(checkOut).format('MM/DD/YYYY')}</StyledSelectedDateText>;
  }

  setCheckInDate(date) {
    const {
      checkOut,
      setCheckIn,
      closeDateModal,
      setDatePickerFocus,
    } = this.props;
    setCheckIn(date);
    if (checkOut !== '' && this.checkReservationDatesValidity(date, checkOut)) {
      closeDateModal();
    } else {
      setDatePickerFocus('checkOut');
    }
  }

  setCheckOutDate(date) {
    const {
      checkIn,
      setCheckOut,
      closeDateModal,
      setDatePickerFocus,
    } = this.props;
    setCheckOut(date);
    if (checkIn === '') {
      setDatePickerFocus('checkIn');
    } else {
      closeDateModal();
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
    const { dateFocus } = this.props;
    if (dateFocus === 'checkIn') {
      this.setCheckInDate(date);
    } else if (dateFocus === 'checkOut') {
      this.setCheckOutDate(date);
    }
  }

  handleDateClick(e) {
    const { id } = e.target;
    const { showDateModal } = this.props;
    showDateModal(id);
  }

  handleClearDates() {
    const { clearDatePicker } = this.props;
    clearDatePicker();
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

DatePicker.defaultProps = {
  checkIn: '',
  checkOut: '',
  reservations: [],
  dateFocus: '',
  showDateModal: () => {},
  closeDateModal: () => {},
  clearDatePicker: () => {},
  setCheckIn: () => {},
  setCheckOut: () => {},
  setDatePickerFocus: () => {},
  dateModalShowing: false,
};

DatePicker.propTypes = {
  checkIn: PropTypes.string,
  checkOut: PropTypes.string,
  reservations: PropTypes.array,
  dateFocus: PropTypes.string,
  showDateModal: PropTypes.func,
  closeDateModal: PropTypes.func,
  clearDatePicker: PropTypes.func,
  setCheckIn: PropTypes.func,
  setCheckOut: PropTypes.func,
  setDatePickerFocus: PropTypes.func,
  dateModalShowing: PropTypes.bool,
};

export default DatePicker;
