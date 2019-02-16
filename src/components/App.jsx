import React from 'react';
import Reservation from './Reservation';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Reservation offeringId={4} guestId={2} />
    );
  }
}

export default App;
