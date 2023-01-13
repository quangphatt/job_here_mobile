import { TouchableOpacity } from 'react-native';
import { preventDoubleClick } from '@Config/Common';
import styled from 'styled-components/native';

const TouchPreventDouble = preventDoubleClick(TouchableOpacity);

const Button = styled(TouchPreventDouble)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 20px;
  background: ${props =>
    props.secondary
      ? props.theme.colors.white_color
      : props.theme.colors.primary_color};
  border-radius: 5px;
  border: 1px solid ${props => props.theme.colors.primary_color};
`;

export default { Button };
