import React from 'react';
import {
  Wrapper,
  Title3Dark,
  StyledGuests,
  Paragraph,
  StyledGuest,
  StyledGuestRight,
} from '../styles/common';

const GuestPicker = (props) => {
  return (
    <Wrapper>
      <Paragraph>
        Guests
      </Paragraph>
      <StyledGuests>
        <StyledGuest>
          <Title3Dark>1 guest</Title3Dark>
        </StyledGuest>
        <StyledGuestRight>
          <img src="assets/down-arrow.svg" alt="expand more" height="18px" width="18px" />
        </StyledGuestRight>
      </StyledGuests>
    </Wrapper>
  );
};

export default GuestPicker;
