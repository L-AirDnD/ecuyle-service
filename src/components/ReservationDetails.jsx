import React from 'react';
import {
  StyledLine,
  Wrapper,
  TopWrapper,
  Title2,
  Paragraph,
  Star,
} from '../styles/common';

const ReservationDetails = (props) => {
  return (
    <div>
      <Wrapper>
        <Title2>$123</Title2>
        <Paragraph> per night</Paragraph>
      </Wrapper>
      <TopWrapper>
        <Star>&#9733;&#9733;&#9733;&#9733;&#9733;</Star>
        <Paragraph>292</Paragraph>
      </TopWrapper>
      <StyledLine />
    </div>
  );
};

export default ReservationDetails;
