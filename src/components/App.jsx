import React from 'react';
import Reservation from './Reservation';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <Reservation offeringId="1" />
      </div>
    );
  }
}

export default App;
