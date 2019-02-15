import React from 'react';
import DateModal from './DateModal';

import controller from '../controller';

import {
  Wrapper,
  Title3Light,
  StyledDates,
  Paragraph,
  StyledDate,
  StyledArrow,
} from '../styles/common';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShowing: false,
      focus: 'checkIn',
      checkIn: '',
      checkOut: '',
    };

    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const { getCloseDateModalFunc } = this.props;
    getCloseDateModalFunc(this.closeModal);
  }

  getModalIfAppropriate() {
    const { modalShowing } = this.state;
    const { reservations } = this.props;

    if (modalShowing) {
      return (
        <DateModal
          reservations={reservations}
          handleModalCloseClick={this.handleModalCloseClick}
          handleDayClick={this.handleDayClick}
        />
      );
    }
    return '';
  }

  handleDayClick(date) {
    console.log(date);
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

  handleDateClick(e) {
    const { id } = e.target;
    this.showModal(id);
  }

  render() {
    return (
      <Wrapper>
        <Paragraph>
          Dates
        </Paragraph>
        <StyledDates>
          <StyledDate>
            <Title3Light id="checkIn" onClick={e => this.handleDateClick(e)}>Check in</Title3Light>
          </StyledDate>
          <StyledArrow>
            <img src="assets/right-arrow.svg" alt="right-arrow" height="20px" width="50px" />
          </StyledArrow>
          <StyledDate>
            <Title3Light id="checkOut" onClick={e => this.handleDateClick(e)}>Check out</Title3Light>
          </StyledDate>
        </StyledDates>
        { this.getModalIfAppropriate() }
      </Wrapper>
    );
  }
}

export default DatePicker;
