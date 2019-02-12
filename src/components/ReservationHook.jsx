import React from 'react';
import {
  Wrapper,
  TopWrapper,
  Title4,
  Title4Light,
  StyledLine,
  StyledHookLeft,
  StyledHookRight,
} from '../styles/common';

const ReservationHook = (props) => {
  return (
    <Wrapper>
      <StyledLine />
      <TopWrapper>
        <StyledHookLeft>
          <Title4>This home is on people's minds.</Title4>
          <Title4Light>It's been viewed 500+ times in the past week.</Title4Light>
        </StyledHookLeft>
        <StyledHookRight>
          <img src="assets/lightbulb.svg" alt="lightbulb" height="85px" width="85px" />
        </StyledHookRight>
      </TopWrapper>
    </Wrapper>
  );
};

export default ReservationHook;
