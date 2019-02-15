import React from 'react';
import moment from 'moment';
import helpers from '../helpers';
import DateIterator from '../DateIterator';
import CalendarHeader from './CalendarHeader';
import CalendarRow from './CalendarRow';

import {
  StyledCalendar,
  Title2,
  StyledCalendarTitle,
  StyledMonthIncrement,
  StyledMonthDecrement,
  UpsideDownImg,
  StyledLeftCalendarRow,
  Paragraph,
} from '../styles/common';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.dayMap = {
      0: 'Su',
      1: 'Mo',
      2: 'Tu',
      3: 'We',
      4: 'Th',
      5: 'Fr',
      6: 'Sa',
    };
    this.state = {
      reservations: [],
      calendar: [],
      year: '',
      month: '',
      numMonth: '',
      monthYear: '',
    };

    this.handleMonthIncrement = this.handleMonthIncrement.bind(this);
    this.handleMonthDecrement = this.handleMonthDecrement.bind(this);
    this.interceptDayClick = this.interceptDayClick.bind(this);
  }

  componentWillMount() {
    const monthYear = moment().format('YYYY-MM');
    this.generateCalendarWithNewMonthYear(monthYear);
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

  generateCalendarWithNewMonthYear(monthYear) {
    const { reservations } = this.props;
    const year = moment(monthYear).format('YYYY');
    const month = moment(monthYear).format('MMMM');
    const numMonth = moment(monthYear).format('MM');
    const calendar = this.buildCalendarDataFromRawReservations(monthYear, year, numMonth);
    this.setState({
      calendar,
      year,
      month,
      numMonth,
      monthYear,
      reservations,
    });
  }

  handleMonthIncrement() {
    const { monthYear } = this.state;
    const newMonthYear = moment(monthYear).add(1, 'month').format('YYYY-MM');
    this.generateCalendarWithNewMonthYear(newMonthYear);
  }

  handleMonthDecrement() {
    const { monthYear } = this.state;
    const newMonthYear = moment(monthYear).subtract(1, 'month').format('YYYY-MM');
    this.generateCalendarWithNewMonthYear(newMonthYear);
  }

  buildCalendarDataFromRawReservations(monthYear, year, numMonth) {
    const { reservations } = this.props;
    const calendar = [
      [this.dayMap[0], this.dayMap[1], this.dayMap[2],
        this.dayMap[3], this.dayMap[4], this.dayMap[5], this.dayMap[6]],
    ];
    const dateIterator = DateIterator(parseInt(year, 10), parseInt(numMonth, 10) - 1);

    let tempRow;
    let emptyCellCount;
    let firstDayFound = false;
    let lastDayFound = false;

    for (let i = 0; i < 6; i += 1) {
      tempRow = [];
      emptyCellCount = 0;
      for (let j = 0; j < 7; j += 1) {
        if (!firstDayFound && (i + j) === dateIterator(false).getDay()) {
          firstDayFound = true;
          const fullDate = dateIterator(true);
          const date = fullDate.getDate();
          tempRow.push([
            date,
            helpers.checkReservationConflict(reservations, monthYear, date),
            fullDate,
          ]);
        } else if (firstDayFound && !lastDayFound) {
          const fullDate = dateIterator(true);
          if (fullDate) {
            const date = fullDate.getDate();
            tempRow.push([
              date,
              helpers.checkReservationConflict(reservations, monthYear, date),
              fullDate,
            ]);
          } else {
            lastDayFound = true;
            tempRow.push(['', true, helpers.generateUniqueId()]);
            emptyCellCount += 1;
          }
        } else {
          tempRow.push(['', true, helpers.generateUniqueId()]);
          emptyCellCount += 1;
        }
      }
      if (emptyCellCount !== 7) calendar.push(tempRow);
    }

    return calendar;
  }

  interceptDayClick(date) {
    const { focus, handleDayClick } = this.props;
    const { monthYear } = this.state;
    if (focus === 'checkIn') {
      const reservations = this.buildAvailableDatesAfterCheckIn(date);
      this.setState({ reservations }, () => {
        this.generateCalendarWithNewMonthYear(monthYear);
      });
    }
    handleDayClick(date);
  }


  render() {
    const {
      calendar,
      year,
      month,
      numMonth,
    } = this.state;

    return (
      <StyledCalendar>
        <StyledCalendarTitle>
          <div>
            <StyledMonthDecrement onClick={this.handleMonthDecrement}>
              <UpsideDownImg src="assets/right-arrow.svg" alt="right-arrow" height="15px" width="30px" />
            </StyledMonthDecrement>
          </div>
          <div>
            <Title2>
              {`${month} ${year}`}
            </Title2>
          </div>
          <div>
            <StyledMonthIncrement onClick={this.handleMonthIncrement}>
              <img src="assets/right-arrow.svg" alt="right-arrow" height="15px" width="30px" />
            </StyledMonthIncrement>
          </div>
        </StyledCalendarTitle>
        <CalendarHeader values={calendar[0]} />
        <CalendarRow values={calendar[1]} handleDayClick={this.interceptDayClick} />
        <CalendarRow values={calendar[2]} handleDayClick={this.interceptDayClick} />
        <CalendarRow values={calendar[3]} handleDayClick={this.interceptDayClick} />
        <CalendarRow values={calendar[4]} handleDayClick={this.interceptDayClick} />
        { calendar.length >= 6
          ? <CalendarRow values={calendar[5]} handleDayClick={this.interceptDayClick} />
          : ''
        }
        { calendar.length >= 7
          ? <CalendarRow values={calendar[6]} handleDayClick={this.interceptDayClick} />
          : ''
        }
        <StyledLeftCalendarRow>
          <Paragraph>
            Updated today
          </Paragraph>
        </StyledLeftCalendarRow>
      </StyledCalendar>
    );
  }
}

export default Calendar;
