import React from 'react';
import DateModal from './DateModal';
import moment from 'moment';

import controller from '../controller';

import {
  Wrapper,
  Title3Light,
  StyledDates,
  Paragraph,
  StyledDate,
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
    };

    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleClearDates = this.handleClearDates.bind(this);
  }

  componentDidMount() {
    const { getCloseDateModalFunc, checkIn, checkOut } = this.props;
    getCloseDateModalFunc(this.closeModal);
    this.setState({
      checkIn,
      checkOut,
    });
  }

  getModalIfAppropriate() {
    const { modalShowing, checkIn, checkOut } = this.state;
    const { reservations } = this.props;

    if (modalShowing) {
      return (
        <DateModal
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
    let { checkIn, focus } = this.state;
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
    let { checkOut, focus } = this.state;
    if (focus === 'checkOut') {
      return checkOut === ''
        ? <StyledFocusText id="checkOut" onClick={e => this.handleDateClick(e)}>Check out</StyledFocusText>
        : <StyledFocusText id="checkOut" onClick={e => this.handleDateClick(e)}>{moment(checkOut).format('MM/DD/YYYY')}</StyledFocusText>;
    }
    return checkOut === ''
      ? <Title3Light id="checkOut" onClick={e => this.handleDateClick(e)}>Check out</Title3Light>
      : <StyledSelectedDateText id="checkOut" onClick={e => this.handleDateClick(e)}>{moment(checkOut).format('MM/DD/YYYY')}</StyledSelectedDateText>;
  }

  handleDayClick(date) {
    const { focus, checkIn, checkOut } = this.state;
    if (focus === 'checkOut') {
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
    } else if (focus === 'checkIn') {
      if (checkOut === '') {
        this.setState({
          checkIn: date,
          focus: 'checkOut',
        }, () => {
          this.sendDateDetailsToParentIfComplete();
        });
      } else {
        this.setState({ checkIn: date }, () => {
          this.closeModal();
          this.sendDateDetailsToParentIfComplete();
        });
      }
    }
  }

  sendDateDetailsToParentIfComplete() {
    const { checkIn, checkOut } = this.state;
    if (checkIn !== '' && checkOut !== '') {
      const { handleDateModalFinish } = this.props;
      handleDateModalFinish({
        checkIn,
        checkOut,
      });
    }
  }

  handleDateClick(e) {
    const { id } = e.target;
    this.showModal(id);
  }

  handleClearDates() {
    this.setState({
      checkIn: '',
      checkOut: '',
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
          <StyledDate>
            { this.getCheckInComponent() }
          </StyledDate>
          <StyledArrow>
            <img src="assets/right-arrow.svg" alt="right-arrow" height="20px" width="50px" />
          </StyledArrow>
          <StyledDate>
            { this.getCheckOutComponent() }
          </StyledDate>
        </StyledDates>
        { this.getModalIfAppropriate() }
      </Wrapper>
    );
  }
}

export default DatePicker;
