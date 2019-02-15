import React from 'react';
import moment from 'moment';
import helpers from '../helpers';
import DateIterator from '../DateIterator';
import CalendarHeader from './CalendarHeader';
import CalendarRow from './CalendarRow';

import {
  StyledCalendar,
  Title2,
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
      calendar: [],
      year: '',
      month: '',
      numMonth: '',
      monthYear: '',
    };

    this.handleMonthIncrement = this.handleMonthIncrement.bind(this);
    this.handleMonthDecrement = this.handleMonthDecrement.bind(this);
  }

  componentWillMount() {
    const monthYear = moment().format('YYYY-MM');
    this.generateCalendarWithNewMonthYear(monthYear);
  }

  generateCalendarWithNewMonthYear(monthYear) {
    const year = moment(monthYear).format('YYYY');
    const month = moment(monthYear).format('MMMM');
    const numMonth = moment(monthYear).format('MM');
    this.setState({
      calendar: this.buildCalendarDataFromRawReservations(monthYear, year, numMonth),
      year,
      month,
      numMonth,
      monthYear,
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

  render() {
    const {
      calendar,
      year,
      month,
      numMonth,
    } = this.state;

    return (
      <StyledCalendar>
        <Title2>
          <button onClick={this.handleMonthDecrement}>{'<'}</button>
          {`${month} ${year}`}
          <button onClick={this.handleMonthIncrement}>{'>'}</button>
        </Title2>
        <CalendarHeader values={calendar[0]} />
        <CalendarRow values={calendar[1]} />
        <CalendarRow values={calendar[2]} />
        <CalendarRow values={calendar[3]} />
        <CalendarRow values={calendar[4]} />
        { calendar.length >= 6
          ? <CalendarRow values={calendar[5]} />
          : ''
        }
        { calendar.length >= 7
          ? <CalendarRow values={calendar[6]} />
          : ''
        }
        <div>
          Updated 1 month ago
        </div>
      </StyledCalendar>
    );
  }
}

export default Calendar;
