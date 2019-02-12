import styled from 'styled-components';
import { colors } from './common';

const StyledReservation = styled.div`
  max-height: 500px;
  width: 300px;
  min-width: 300px;
  border: 1px solid ${colors.border};
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export default StyledReservation;
