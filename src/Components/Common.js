import React from 'react';
import { TouchableOpacity } from 'react-native';
import { preventDoubleClick } from '@Config/Common';
import View from './View';
import Text from './Text';
import Icon from './Icon';
import Image from './Image';
import styled from 'styled-components/native';
import RenderHTML from 'react-native-render-html';

const TouchPreventDouble = preventDoubleClick(TouchableOpacity);

const RenderHTMLJobHere = styled(RenderHTML).attrs(props => ({
  baseStyle: {
    fontFamily: 'BeVietnam-Light',
    color: props.theme.colors.item_text,
    fontSize: props.theme.font_size.medium,
    ...props.baseStyle
  },
  systemFonts: ['BeVietnam-Bold', 'BeVietnam-Light']
}))``;

const BasicItem = ({
  testID,
  title,
  value,
  icon,
  iconColor,
  iconRight,
  iconRightColor,
  imageSource,
  onPress,
  textColor,
  iconMarginRight = 10,
  onPressIconRight,
  style
}) => {
  return (
    <TouchPreventDouble
      activeOpacity={0.6}
      onPress={onPress}
      style={{ flexDirection: 'row', ...style }}
    >
      <View.Row style={{ flex: 1, alignItems: 'center' }}>
        {icon && (
          <View.Col
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: iconMarginRight
            }}
          >
            <Icon.VectorIcon name={icon} size={20} color={iconColor} />
          </View.Col>
        )}
        {imageSource && (
          <View.Col
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10
            }}
          >
            <Image.ImageCircle source={imageSource} />
          </View.Col>
        )}
        <Text.Body
          secondary
          color={textColor}
          numberOfLines={1}
          style={{ maxWidth: '90%' }}
        >
          {title}
        </Text.Body>
      </View.Row>
      <View.Row
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        {value && (
          <Text.SubBody
            secondary
            numberOfLines={1}
            style={{ textAlignVertical: 'center' }}
          >
            {value}
          </Text.SubBody>
        )}
        {iconRight && (
          <View.Col
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: iconMarginRight
            }}
          >
            <Icon.VectorIcon
              name={iconRight}
              size={20}
              color={iconRightColor || iconColor}
            />
          </View.Col>
        )}
      </View.Row>
    </TouchPreventDouble>
  );
};

export default { RenderHTMLJobHere, BasicItem };
