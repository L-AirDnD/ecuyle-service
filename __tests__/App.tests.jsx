/* eslint-disable no-undef */
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import moment from 'moment';

import App from '../src/components/App';
import Reservation from '../src/components/Reservation';
import DatePicker from '../src/components/DatePicker';
import GuestPicker from '../src/components/GuestPicker';
import ReservationHook from '../src/components/ReservationHook';
import Star from '../src/components/Star';
import controller from '../src/controller';

import {
  StyledConfirmation,
  Modal,
  Title3Light,
  StyledGuests,
  CircleButton,
  Title3Dark,
  LinkButton,
  StyledDay,
} from '../src/styles/common';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  test('it should render the App component', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});

describe('Reservations', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Reservation offeringId={4} guestId={2} />);
  });

  test('it should render the Reservations component with appropriate number of children', () => {
    const numChildren = wrapper.find('#reservation').children().length;
    expect(numChildren).toBe(6);
  });

  test('it should open the check in modal when the Book button is selected with no dates selected', () => {
    wrapper.find(StyledConfirmation).simulate('click');
    expect(wrapper.find(Modal).length).toBe(1);
  });

  test('it should open the date modal with a focus on checkIn when "Check In" is selected', () => {
    wrapper.find(`${Title3Light}#checkIn`).simulate('click');
    expect(wrapper.find(Modal).length).toBe(1);
    expect(wrapper.find(DatePicker).state('focus')).toBe('checkIn');
    wrapper.find(`${Title3Light}#checkOut`).simulate('click');
    expect(wrapper.find(Modal).length).toBe(1);
    expect(wrapper.find(DatePicker).state('focus')).toBe('checkOut');
  });

  test('it should open the guest modal when selecting guest picker', () => {
    wrapper.find(StyledGuests).simulate('click');
    expect(wrapper.find(`${Modal}#guestModal`).length).toBe(1);
  });

  test('should not open modal when Book button is selected and both dates are picked', () => {
    wrapper.setState({
      checkIn: moment().add(2, 'days').format('YYYY-MM-DD HH:MM:SS'),
      checkOut: moment().add(4, 'days').format('YYYY-MM-DD HH:MM:SS'),
      numAdults: 2,
      numChildren: 3,
      numInfants: 4,
    }, () => {
      wrapper.find(StyledConfirmation).simulate('click');
      expect(wrapper.find(DatePicker).state('modalShowing')).toBe(false);
    });
  });

  test('it should render hook', () => {
    const hook = shallow(<ReservationHook />);
    expect(hook).toMatchSnapshot();
  });

  test('it should render a full star', () => {
    const star = mount(<Star type="full" />);
    expect(star.prop('type')).toBe('full');
    expect(star).toMatchSnapshot();
  });

  test('it should render a half star', () => {
    const star = mount(<Star type="half" />);
    expect(star.prop('type')).toBe('half');
    expect(star).toMatchSnapshot();
  });

  test('it should render a empty star', () => {
    const star = mount(<Star type="empty" />);
    expect(star.prop('type')).toBe('empty');
    expect(star).toMatchSnapshot();
  });
});

describe('Date Picker', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Reservation offeringId={4} guestId={2} />);
  });

  test('it should select checkIn date', () => {
    expect(wrapper.find(DatePicker).state('modalShowing')).toBe(false);
    wrapper.find(`${Title3Light}#checkIn`).simulate('click');
    expect(wrapper.find(Modal).length).toBe(1);
    expect(wrapper.find(DatePicker).state('focus')).toBe('checkIn');
    expect(wrapper.find(DatePicker).state('modalShowing')).toBe(true);
    wrapper.find(StyledDay).first().simulate('click');
    expect(wrapper.find(DatePicker).state('focus')).toBe('checkOut');
  });

  test('it should select checkOut date', () => {
    expect(wrapper.find(DatePicker).state('modalShowing')).toBe(false);
    wrapper.find(`${Title3Light}#checkOut`).simulate('click');
    expect(wrapper.find(Modal).length).toBe(1);
    expect(wrapper.find(DatePicker).state('focus')).toBe('checkOut');
    expect(wrapper.find(DatePicker).state('modalShowing')).toBe(true);
    wrapper.find(StyledDay).first().simulate('click');
    expect(wrapper.find(DatePicker).state('focus')).toBe('checkIn');
  });

  test('it should select clear dates button', () => {
    wrapper.find(`${Title3Light}#checkIn`).simulate('click');
    wrapper.find(DatePicker).setState({
      checkIn: moment().format('YYYY-MM-DD'),
    }, () => {
      wrapper.find(`${LinkButton}#clearDates`).simulate('click');
    });
  });
});

describe('Guest Picker', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Reservation offeringId={4} guestId={2} />);
  });

  test('it should increment Adult count when state is set', () => {
    wrapper.find(StyledGuests).simulate('click');
    expect(wrapper.find(`${Modal}#guestModal`).length).toBe(1);
    wrapper.find(`${CircleButton}#incrementAdults`).simulate('click');
    wrapper.find(GuestPicker).setState({
      numAdults: 2,
      numChildren: 0,
      numInfants: 3,
      modalShowing: true,
    }, () => {
      wrapper.find(StyledGuests).simulate('click');
      expect(wrapper.find(GuestPicker).state('numAdults')).toBe(2);
    });
  });
});

describe('Controller', () => {
  test('should successfully call getOfferingDetailsById', () => {
    controller.getOfferingDetailsById(4)
      .then((response) => {
        expect(typeof response).toBe('object');
      })
      .catch((err) => {
        throw err;
      });
  });

  test('should successfully call getReservationsByOfferingId', () => {
    controller.getReservationsByOfferingId(4)
      .then((response) => {
        expect(typeof response).toBe('object');
      })
      .catch((err) => {
        throw err;
      });
  });

  test('should fail to call getReservationsByOfferingId', () => {
    controller.getReservationsByOfferingId('hello')
      .catch((err) => {
        expect(err).toBe(!undefined);
      });
  });

  test('should successfully call postReservationByOfferingId', () => {
    const reservation = {
      offeringId: 4,
      guestId: 1,
      startDate: '2019-08-13 16:00:36.00',
      endDate: '2019-10-01 00:29:40.00',
      numAdults: 1,
      numChildren: 1,
      numInfants: 1,
      totalPrice: 400,
    };
    controller.postReservationByOfferingId(reservation)
      .then((response) => {
        expect(typeof response).toBe('object');
      })
      .catch((err) => {
        throw err;
      });
  });
});
