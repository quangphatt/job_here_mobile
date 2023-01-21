import styled from 'styled-components/native';

const _Text = styled.Text`
  font-style: normal;
  color: ${props =>
    props.color ||
    (props.primary
      ? props.theme.text_colors.primary_text_color
      : props.secondary
      ? props.theme.text_colors.secondary_text_color
      : props.theme.colors.white_color)};
  text-align: ${props => props.align || 'left'};
`;

const H1 = styled(_Text)`
  font-size: ${props => props.theme.font_size.xxx_large};
  font-family: 'BeVietnam-SemiBold';
`;

const H1_Bold = styled(_Text)`
  font-size: ${props => props.theme.font_size.xxx_large};
  font-family: 'BeVietnam-Bold';
`;

const H2 = styled(_Text)`
  font-size: ${props => props.theme.font_size.xx_large};
  font-family: 'BeVietnam-SemiBold';
`;

const H2_Bold = styled(_Text)`
  font-size: ${props => props.theme.font_size.xx_large};
  font-family: 'BeVietnam-Bold';
`;

const H3 = styled(_Text)`
  font-size: ${props =>
    props.fontSize ? props.fontSize + 'px' : props.theme.font_size.x_large};
  font-family: 'BeVietnam-SemiBold';
`;

const H3_Bold = styled(_Text)`
  font-size: ${props =>
    props.fontSize ? props.fontSize + 'px' : props.theme.font_size.x_large};
  font-family: 'BeVietnam-Bold';
`;

const H4 = styled(_Text)`
  font-size: ${props =>
    props.fontSize ? props.fontSize + 'px' : props.theme.font_size.large};
  font-family: 'BeVietnam-Medium';
`;

const H4_Bold = styled(_Text)`
  font-size: ${props =>
    props.fontSize ? props.fontSize + 'px' : props.theme.font_size.large};
  font-family: 'BeVietnam-SemiBold';
`;

const Body = styled(_Text)`
  font-size: ${props =>
    props.fontSize ? props.fontSize + 'px' : props.theme.font_size.medium};
  font-family: 'BeVietnam-Light';
`;

const BodyBold = styled(_Text)`
  font-size: ${props =>
    props.fontSize ? props.fontSize + 'px' : props.theme.font_size.medium};
  font-family: 'BeVietnam-SemiBold';
`;

const SubBody = styled(_Text)`
  font-size: ${props =>
    props.fontSize ? props.fontSize + 'px' : props.theme.font_size.x_small};
  font-family: 'BeVietnam-Light';
`;

const SubBodyBold = styled(_Text)`
  font-size: ${props =>
    props.fontSize ? props.fontSize + 'px' : props.theme.font_size.x_small};
  font-family: 'BeVietnam-Medium';
`;

const TextInput = styled.TextInput`
  color: ${props => props.color || props.theme.text_colors.secondary_text_color};
  font-size: ${props => size(props.type, props.theme)};
  font-family: ${props => fontFamily(props.type, props.bold)};
  padding: 0px;
`;

const size = (type, theme) => {
  switch (type) {
    case 'SubBody':
      return theme.font_size.x_small;
    case 'H4':
      return theme.font_size.large;
    case 'H3':
      return theme.font_size.x_large;
    case 'H2':
      return theme.font_size.xx_large;
    case 'H1':
      return theme.font_size.xxx_large;
    default:
      return theme.font_size.medium;
  }
};

const fontFamily = (type, bold) => {
  if (bold) {
    switch (type) {
      case 'SubBody':
        return 'BeVietnam-Medium';
      case 'H4':
        return 'BeVietnam-SemiBold';
      case 'H3':
        return 'BeVietnam-SemiBold';
      case 'H2':
        return 'BeVietnam-Bold';
      case 'H1':
        return 'BeVietnam-Bold';
      default:
        return 'BeVietnam-SemiBold';
    }
  } else {
    switch (type) {
      case 'SubBody':
        return 'BeVietnam-Light';
      case 'H4':
        return 'BeVietnam-Medium';
      case 'H3':
        return 'BeVietnam-SemiBold';
      case 'H2':
        return 'BeVietnam-SemiBold';
      case 'H1':
        return 'BeVietnam-SemiBold';
      default:
        return 'BeVietnam-Light';
    }
  }
};

export default {
  H1,
  H1_Bold,
  H2,
  H2_Bold,
  H3,
  H3_Bold,
  H4,
  H4_Bold,
  Body,
  BodyBold,
  SubBody,
  SubBodyBold,
  TextInput
};
