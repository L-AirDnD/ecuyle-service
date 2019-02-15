import styled from 'styled-components';

/*------------------------------------------*/
/*              Global Vars                 */
/*------------------------------------------*/
export const colors = {
  rausch: '#FF5A5F',
  babu: '#00A699',
  hof: '#484848',
  foggy: '#727272',
  border: '#CED1CC',
  darkBorder: '#B2B2B2',
  white: '#FFFFFF',
  highlight: '#98EDE5',
  darkBabu: '#007c73',
};

/*------------------------------------------*/
/*              Text Classes                */
/*------------------------------------------*/
export const Text = styled.p`
  color: ${colors.hof};
  font-family: '-apple-system,BlinkMacSystemFont';
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
  font-weight: 200;
  font-size: 16px;
  font-family: 'Helvetica';
`;

export const Title3Light = styled(Title3)`
  color: ${colors.foggy};
`;

export const Title3Dark = styled(Title3)`
  color: ${colors.hoc};
`;

export const Title4 = styled(Text)`
  font-size: 14px;
  font-family: '-apple-system,BlinkMacSystemFont';
  font-weight: 500;
  margin-bottom: 7px;
  line-height: 1.2857142857142858em;
`;

export const CleanTitle4 = styled(Title4)`
  margin: 0px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.375em;
`;

export const Title4Light = styled(Text)`
  font-size: 14px;
  font-family: '-apple-system,BlinkMacSystemFont';
  font-weight: 300;
`;

export const CleanTitle4Light = styled(Title4Light)`
  margin: 5px 0 0 0;
  font-size: 14px;
  font-family: '-apple-system,BlinkMacSystemFont';
  font-weight: 300;
  line-height: 1.2857142857142858em;
`;

export const Paragraph = styled(Text)`
  font-size: 12px;
  font-family: '-apple-system,BlinkMacSystemFont';
  font-weight: 500;
  line-height: 1.333em;
  display: inline;
`;

export const Stars = styled(Paragraph)`
  color: ${colors.babu};
  margin-left: 5px;
  margin-right: 5px;
`;

/*------------------------------------------*/
/*                  Buttons                 */
/*------------------------------------------*/
export const StyledConfirmation = styled.button`
  color: ${colors.white};
  font-family: '-apple-system,BlinkMacSystemFont';
  font-weight: 500;
  font-size: 16px;
  background-color: ${colors.rausch};
  border-radius: 5px;
  width: 100%;
  height: 50px;
  border: none;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const CircleButton = styled.button`
  border-radius: 50%;
  border: 1px solid ${colors.babu};
  text-align: center;
  font-size: 16px;
  font-family: '-apple-system,BlinkMacSystemFont';
  color: ${colors.babu};
  height: 30px;
  width: 30px;
  margin: 0 15px 0 15px;
  :focus {
    outline: none;
    box-shadow: 0 0 5px ${colors.babu};
  }
`;

export const LockedCircleButton = styled(CircleButton)`
  opacity: 0.5;
  disabled: true;
  :focus {
    box-shadow: none;
  }
`;

export const LinkButton = styled.button`
  border: none;
  text-align: right;
  font-size: 16px;
  font-family: 'Helvetica';
  color: ${colors.babu};
  margin: 5px 15px 15px 15px;
  :hover {
    text-decoration: underline;
  }
  :focus {
    outline: none;
  }
`;

/*------------------------------------------*/
/*               Containers                 */
/*------------------------------------------*/
export const StyledLine = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  height: 1px;
  background-color: ${colors.border};
`;

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
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

export const StyledGuestLeft = styled.div`
  display: flex;
  flex-direction: row;
  width: 75%;
`;

export const StyledGuest = styled.div`
`;

export const StyledInfant = styled.div`
`;

export const StyledGuestRight = styled.div`
  width: 25%;  
  text-align: right;
`;

export const UpsideDownImg = styled.img`
  transform: rotate(180deg);
`;

export const StyledHookLeft = styled.div`
  width: 75%;
`;

export const StyledHookRight = styled.div`
  width: 25%;
`;

export const StyledCalendarTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

/*------------------------------------------*/
/*              Modal Components            */
/*------------------------------------------*/
export const Modal = styled.div`
  z-index: 1;
  width: 100%;
  margin-top: -10px;
  background-color: white;
  box-shadow: 0 1px 1px 1px ${colors.border};
  border-top: 2px solid ${colors.babu};
  border-radius: 3px;
  position: absolute;
`;

export const GuestModalRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 15px;
`;

export const RightAlignDiv = styled.div`
  width: 100%;
  text-align: right;
`;

export const GuestModalInfo = styled(GuestModalRow)`
  width: 80%;
`;

export const GuestModalCount = styled(CleanTitle4)`
  width: 20px;
`;

/*------------------------------------------*/
/*             Calendar Components          */
/*------------------------------------------*/
export const StyledCalendar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
  margin-bottom: 0px;
`;

export const StyledCalendarRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledCalendarHeader = styled.div`
  height: 15px;
  width: 45px;
  text-align: center;
  margin-top: 15px;
`;

export const StyledDay = styled.div`
  height: 32px;
  width: 45px;
  border-right: 1px solid ${colors.border};
  border-bottom: 1px solid ${colors.border};
  text-align: center;
  padding-top: 12px;
  :hover {
    background-color: ${colors.border};
  }
`;

export const StyledHighlightedDay = styled(StyledDay)`
  :hover {
    background-color: ${colors.highlight};
    color: ${colors.babu};
  }
`;

export const StyledSelectedDay = styled(StyledDay)`
  background-color: ${colors.darkBabu};
  :hover {
    background-color: ${colors.darkBabu};
  }
`;

export const StyledLockedDay = styled(StyledDay)`
  :hover {
    background-color: ${colors.white};
  }
`;

export const StyledDayText = styled(Text)`
  font-size: 14px;
  font-weight: 700;
`;

export const StyledHighlightedText = styled(StyledDayText)`
  color: ${colors.white};
`;

export const StyledLockedDayText = styled(StyledDayText)`
  color: ${colors.border};
  text-decoration: line-through;
`;

export const StyledDayHeaderText = styled(Text)`
  font-size: 11px;
  font-weight: 500;
  color: ${colors.foggy};
`;

export const StyledFocusText = styled(Title3Light)`
  color: ${colors.babu};
  background-color: ${colors.highlight};
  border-radius: 2px;
  border: 1px solid ${colors.highlight};
`;

export const StyledSelectedDateText = styled(Title3Light)`
  color: ${colors.hof};
`;

export const StyledMonthIncrement = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  height: 25px;
  width: 35px;
  border: 1px solid ${colors.border};
  margin-right: 10px;
  :hover {
    border: 1px solid ${colors.darkBorder};
  }
`;

export const StyledLeftCalendarRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: 20px;
`;

export const StyledRightCalendarRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  min-height: 15px;
`;

export const StyledMonthDecrement = styled(StyledMonthIncrement)`
  margin-right: 0px;
  margin-left: 10px;
`;
