import { Animated } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${props =>
    props.background || props.theme.colors.white_color};
`;

const Row = styled(Animated.View)`
  margin-top: ${props => props.marginTop || '0px'};
  margin-bottom: ${props => props.marginBottom || '0px'};
  margin-left: ${props => props.marginLeft || '0px'};
  margin-right: ${props => props.marginRight || '0px'};
  flex-direction: row;
`;

const Col = styled(Animated.View)`
  flex-direction: column;
`;

const Seperator = styled.View`
  border: ${props => props.borderHeight || 1}px solid
    ${props =>
      props.borderColor || props.theme.border_colors.primary_border_color};
  flex: none;
  flex-grow: 0;
`;

export default {
  Container,
  Row,
  Col,
  Seperator,
};
