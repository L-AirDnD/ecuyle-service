import styled from 'styled-components';
import { colors } from './common';

const StyledReservation = styled.div`
  width: 350px;
  min-width: 350px;
  border: 1px solid ${colors.border};
  display: flex;
  flex-direction: column;
  padding: 20px;
  z-index: 0;
  position: relative;
`;

export default StyledReservation;
