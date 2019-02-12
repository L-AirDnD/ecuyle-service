import styled from 'styled-components';
import path from 'path';

export const colors = {
  rausch: '#FF5A5F',
  babu: '#00A699',
  hof: '#484848',
  foggy: '#767676',
  border: '#CED1CC',
  white: '#FFFFFF',
};

export const Text = styled.p`
  color: ${colors.hof};
  font-family: 'Circular-Book';
  font-weight: 400;
  margin: 0px;
  letter-spacing: 0.15px;
`;

export const Title2 = styled(Text)`
  font-size: 20px;
  font-weight: 700;
  display: inline;
  margin-left: 4px;
  font-family: 'Roboto-Bold', sans-serif;
`;

export const Title3 = styled(Text)`
  font-weight: 700;
  font-size: 16px;
  font-family: 'Gotham-Light';
`;

export const Title3Light = styled(Title3)`
  color: ${colors.foggy};
`;

export const Title3Dark = styled(Title3)`
  color: ${colors.hoc};
`;

export const Title4 = styled(Text)`
  font-size: 14px;
  font-family: 'Circular-Book';
  font-weight: bold;
  margin-bottom: 7px;
`;

export const Title4Light = styled(Text)`
  font-size: 14px;
  font-family: 'Circular-Book';
`;

export const StyledConfirmation = styled.button`
  color: ${colors.white};
  font-family: 'Circular-Medium';
  font-size: 16px;
  background-color: ${colors.rausch};
  border-radius: 5px;
  width: 100%;
  height: 50px;
  border: none;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const Paragraph = styled(Text)`
  font-size: 12px;
  display: inline;
`;

export const StyledLine = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  height: 1px;
  background-color: ${colors.border};
`;

export const Wrapper = styled.div`
  width: 100%;
`;

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const StyledTripDetails = styled.div`
  border: 1px solid ${colors.border};
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  padding: 10px 15px 10px 15px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const StyledDates = styled(StyledTripDetails)`
  justify-content: flex-start;
`;

export const StyledDate = styled.div`
  width: 40%;
  text-align: left;
`;

export const StyledArrow = styled(StyledDate)`
  width: 20%;
  text-align: center;
`;

export const StyledGuests = styled(StyledTripDetails)`
  justify-content: flex-start;
`;

export const StyledGuest = styled.div`
  width: 50%;
`;

export const StyledGuestRight = styled(StyledGuest)`
  text-align: right;
`;

export const StyledHookLeft = styled.div`
  width: 75%;
`;

export const StyledHookRight = styled.div`
  width: 25%;
`;

export const Stars = styled(Text)`
  color: ${colors.babu};
  margin-left: 5px;
  margin-right: 5px;
  font-size: 10px;
`;
