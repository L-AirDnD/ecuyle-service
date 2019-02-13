import React from 'react';
import PropTypes from 'prop-types';
import GuestModalLine from './GuestModalLine';

import {
  Modal,
  CleanTitle4Light,
  LinkButton,
  RightAlignDiv,
  GuestModalInfo,
} from '../styles/common';

const GuestModal = (props) => {
  const {
    numAdults,
    numChildren,
    numInfants,
    maxGuests,
    maxInfants,
    handleModalCloseClick,
    handleIncrement,
    handleDecrement,
  } = props;

  return (
    <Modal>
      <GuestModalLine
        type="Adults"
        descr=""
        count={numAdults}
        min={1}
        max={maxGuests - numChildren}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
      <GuestModalLine
        type="Children"
        descr="Ages 2-12"
        count={numChildren}
        min={0}
        max={maxGuests - numAdults}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
      <GuestModalLine
        type="Infants"
        descr="Under 2"
        count={numInfants}
        min={0}
        max={maxInfants}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
      <GuestModalInfo>
        <CleanTitle4Light>
          { `${maxGuests} guests maximum. Infants don't count toward the number of guests.` }
        </CleanTitle4Light>
      </GuestModalInfo>
      <RightAlignDiv>
        <LinkButton onClick={handleModalCloseClick}>Close</LinkButton>
      </RightAlignDiv>
    </Modal>
  );
};

GuestModal.defaultProps = {
  numAdults: 1,
  numChildren: 0,
  numInfants: 0,
  maxGuests: 1,
  maxInfants: 0,
  handleModalCloseClick: () => {},
  handleIncrement: () => {},
  handleDecrement: () => {},
};

GuestModal.propTypes = {
  numAdults: PropTypes.number,
  numChildren: PropTypes.number,
  numInfants: PropTypes.number,
  maxGuests: PropTypes.number,
  maxInfants: PropTypes.number,
  handleModalCloseClick: PropTypes.func,
  handleIncrement: PropTypes.func,
  handleDecrement: PropTypes.func,
};

export default GuestModal;
