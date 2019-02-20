import React from 'react';
import ReactDOM from 'react-dom';
import Reservation from './components/Reservation';

ReactDOM.render(<Reservation offeringId={4} guestId={2} />, document.getElementById('reservation'));
window.Reservation = Reservation;
