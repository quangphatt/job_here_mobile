import { Animated } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${(props) =>
    props.background || props.theme.background_colors.layout_background_color};
`;

const Row = styled(Animated.View)`
  margin-top: ${(props) => props.marginTop || '0px'};
  margin-bottom: ${(props) => props.marginBottom || '0px'};
  margin-left: ${(props) => props.marginLeft || '0px'};
  margin-right: ${(props) => props.marginRight || '0px'};
  flex-direction: row;
`;

const Col = styled(Animated.View)`
  flex-direction: column;
`;

export default {
  Container,
  Row,
  Col
};
