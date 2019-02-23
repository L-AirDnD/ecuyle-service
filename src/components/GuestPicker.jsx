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

  getExpandArrowDirection() {
    const { modalShowing } = this.state;
    return !modalShowing
      ? <img src="https://s3.us-east-2.amazonaws.com/lairdnd-reservations/down-arrow.svg" alt="expand more" height="18px" width="18px" />
      : <UpsideDownImg src="https://s3.us-east-2.amazonaws.com/lairdnd-reservations/down-arrow.svg" alt="expand less" height="18px" width="18px" />;
  }

  getModalIfAppropriate() {
    const {
      numAdults, numChildren, numInfants,
    } = this.state;
    const { maxGuests, maxInfants, guestModalShowing } = this.props;

    if (guestModalShowing) {
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
    const { clearParentGuestCount } = this.props;
    this.setState({
      numAdults: 1,
      numChildren: 0,
      numInfants: 0,
    }, () => {
      clearParentGuestCount(1, 0, 0);
    });
  }

  handleModalCloseClick(e) {
    e.stopPropagation();
    const { numAdults, numChildren, numInfants } = this.state;
    const { closeGuestModal } = this.props;
    closeGuestModal(numAdults, numChildren, numInfants);
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
    const { handleGuestPickerClick, closeGuestModal } = this.props;
    return (
      <Wrapper id="guestPicker" tabIndex="0" onBlur={closeGuestModal}>
        <Paragraph>
          Guests
        </Paragraph>
        <StyledGuests onClick={handleGuestPickerClick}>
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
  maxGuests: 1,
  maxInfants: 0,
  clearParentGuestCount: () => {},
  handleGuestPickerClick: () => {},
  closeGuestModal: () => {},
  guestModalShowing: () => {},
};

GuestPicker.propTypes = {
  numAdults: PropTypes.number,
  numChildren: PropTypes.number,
  numInfants: PropTypes.number,
  maxGuests: PropTypes.number,
  maxInfants: PropTypes.number,
  clearParentGuestCount: PropTypes.func,
  handleGuestPickerClick: PropTypes.func,
  closeGuestModal: PropTypes.func,
  guestModalShowing: PropTypes.func,


};

export default GuestPicker;
