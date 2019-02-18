import React from 'react';
import PropTypes from 'prop-types';

import {
  GuestModalRow,
  Wrapper,
  CleanTitle4,
  GuestModalCount,
  CleanTitle4Light,
  CircleButton,
  LockedCircleButton,
  CenteredWrapper,
} from '../styles/common';

const GuestModalLine = (props) => {
  const {
    type,
    descr,
    count,
    min,
    max,
    handleIncrement,
    handleDecrement,
  } = props;

  const getAppropriateDecrement = (innerText) => {
    if (count === min) {
      return (
        <LockedCircleButton id={`decrement${type}`} onClick={() => handleDecrement(type)}>
          {innerText}
        </LockedCircleButton>
      );
    }
    return (
      <CircleButton id={`decrement${type}`} onClick={() => handleDecrement(type)}>
        {innerText}
      </CircleButton>
    );
  };

  const getAppropriateIncrement = (innerText) => {
    if (count === max) {
      return (
        <LockedCircleButton id={`increment${type}`} onClick={() => handleIncrement(type)}>
          {innerText}
        </LockedCircleButton>
      );
    }
    return (
      <CircleButton id={`increment${type}`} onClick={() => handleIncrement(type)}>
        {innerText}
      </CircleButton>
    );
  };

  return (
    <GuestModalRow>
      <Wrapper>
        <CleanTitle4>
          { type }
        </CleanTitle4>
        <CleanTitle4Light>
          { descr }
        </CleanTitle4Light>
      </Wrapper>
      <CenteredWrapper>
        { getAppropriateDecrement('-') }
      </CenteredWrapper>
      <CenteredWrapper>
        <GuestModalCount id={`count${type}`}>
          { count }
        </GuestModalCount>
      </CenteredWrapper>
      <CenteredWrapper>
        { getAppropriateIncrement('+') }
      </CenteredWrapper>
    </GuestModalRow>
  );
};

GuestModalLine.defaultProps = {
  type: '',
  descr: '',
  count: 0,
  min: 0,
  max: 0,
  handleIncrement: () => {},
  handleDecrement: () => {},
};

GuestModalLine.propTypes = {
  type: PropTypes.string,
  descr: PropTypes.string,
  count: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  handleIncrement: PropTypes.func,
  handleDecrement: PropTypes.func,
};

export default GuestModalLine;
