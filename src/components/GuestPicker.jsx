import React from 'react';
import PropTypes from 'prop-types';
import GuestModal from './GuestModal';

import {
  Wrapper,
  UpsideDownImg,
  Title3Dark,
  StyledGuests,
  Paragraph,
  StyledGuestLeft,
  StyledGuest,
  StyledInfant,
  StyledGuestRight,
} from '../styles/common';

class GuestPicker extends React.Component {
  constructor(props) {
    super(props);
    const { numAdults, numChildren, numInfants } = this.props;
    this.state = {
      numAdults,
      numChildren,
      numInfants,
      modalShowing: false,
    };

    this.handleGuestPickerClick = this.handleGuestPickerClick.bind(this);
    this.handleModalCloseClick = this.handleModalCloseClick.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.clearGuestCount = this.clearGuestCount.bind(this);
  }

  componentDidMount() {
    const { getCloseGuestModalFunc, getClearGuestsFunc } = this.props;
    getCloseGuestModalFunc(this.closeModal);
    getClearGuestsFunc(this.clearGuestCount);
  }

  getExpandArrowDirection() {
    const { modalShowing } = this.state;
    return !modalShowing
      ? <img src="assets/down-arrow.svg" alt="expand more" height="18px" width="18px" />
      : <UpsideDownImg src="assets/down-arrow.svg" alt="expand less" height="18px" width="18px" />;
  }

  getModalIfAppropriate() {
    const {
      modalShowing, numAdults, numChildren, numInfants,
    } = this.state;

    const { maxGuests, maxInfants } = this.props;

    if (modalShowing) {
      return (
        <GuestModal
          numAdults={numAdults}
          numChildren={numChildren}
          numInfants={numInfants}
          maxGuests={maxGuests}
          maxInfants={maxInfants}
          handleModalCloseClick={this.handleModalCloseClick}
          handleIncrement={this.handleIncrement}
          handleDecrement={this.handleDecrement}
        />
      );
    }
    return '';
  }

  buildGuestCount() {
    const { numAdults, numChildren, numInfants } = this.state;
    const numGuests = numAdults + numChildren;
    const guestCount = [
      <StyledGuest key={0}>
        <Title3Dark id="guestCount">
          {numGuests + (numGuests > 1 ? ' guests' : ' guest')}
        </Title3Dark>
      </StyledGuest>,
    ];
    if (numInfants > 0) {
      guestCount.push(
        <StyledInfant key={1}>
          <Title3Dark id="guestCount">
            {`, ${numInfants} ${numInfants > 1 ? ' infants' : ' infant'}`}
          </Title3Dark>
        </StyledInfant>,
      );
    }
    return guestCount;
  }

  clearGuestCount() {
    this.setState({
      numAdults: 1,
      numChildren: 0,
      numInfants: 0,
    });
  }

  handleGuestPickerClick() {
    const { modalShowing } = this.state;
    if (modalShowing) {
      this.closeModal();
    } else {
      this.showModal();
    }
  }

  handleModalCloseClick(e) {
    console.log(e.target);
    e.stopPropagation();
    this.closeModal();
  }

  showModal() {
    this.setState({
      modalShowing: true,
    }, () => {
      document.getElementById('guestModal').focus();
    });
  }

  closeModal() {
    this.sendGuestDetailsToParent();
    this.setState({
      modalShowing: false,
    });
  }

  sendGuestDetailsToParent() {
    const { numAdults, numChildren, numInfants } = this.state;
    const { handleGuestModalClose } = this.props;
    const guestDetails = {
      numAdults,
      numChildren,
      numInfants,
    };
    handleGuestModalClose(guestDetails);
  }

  handleIncrement(type) {
    let { numAdults, numChildren, numInfants } = this.state;
    const { maxGuests, maxInfants } = this.props;
    if (type === 'Adults') {
      numAdults = Math.min(maxGuests - numChildren, numAdults + 1);
      this.setState({ numAdults });
    } else if (type === 'Children') {
      numChildren = Math.min(maxGuests - numAdults, numChildren + 1);
      this.setState({ numChildren });
    } else if (type === 'Infants') {
      numInfants = Math.min(maxInfants, numInfants + 1);
      this.setState({ numInfants });
    }
  }

  handleDecrement(type) {
    let { numAdults, numChildren, numInfants } = this.state;
    if (type === 'Adults') {
      numAdults = Math.max(1, numAdults - 1);
      this.setState({ numAdults });
    } else if (type === 'Children') {
      numChildren = Math.max(0, numChildren - 1);
      this.setState({ numChildren });
    } else if (type === 'Infants') {
      numInfants = Math.max(0, numInfants - 1);
      this.setState({ numInfants });
    }
  }

  render() {
    return (
      <Wrapper id="guestPicker" tabIndex="0" onBlur={this.closeModal}>
        <Paragraph>
          Guests
        </Paragraph>
        <StyledGuests onClick={this.handleGuestPickerClick}>
          <StyledGuestLeft>
            { this.buildGuestCount() }
          </StyledGuestLeft>
          <StyledGuestRight>
            { this.getExpandArrowDirection() }
          </StyledGuestRight>
        </StyledGuests>
        { this.getModalIfAppropriate() }
      </Wrapper>
    );
  }
}

GuestPicker.defaultProps = {
  numAdults: 1,
  numChildren: 0,
  numInfants: 0,
  handleGuestModalClose: () => {},
  maxGuests: 1,
  maxInfants: 0,
};

GuestPicker.propTypes = {
  numAdults: PropTypes.number,
  numChildren: PropTypes.number,
  numInfants: PropTypes.number,
  handleGuestModalClose: PropTypes.func,
  maxGuests: PropTypes.number,
  maxInfants: PropTypes.number,
};

export default GuestPicker;
