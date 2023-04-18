import React from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import View from './View';
import Text from './Text';
import Icon from './Icon';
import Image from './Image';
import Theme from '@Theme';
import styled from 'styled-components/native';
import RenderHTML from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';
import { preventDoubleClick } from '@Config/Common';

const ButtonPreventDouble = preventDoubleClick(TouchableOpacity);

const HeaderContainer = styled(View.Row)`
  height: ${(props) => props.theme.size.header_height}px;
  background-color: ${(props) =>
    props.background || props.theme.colors.primary_color};
  padding: 0px 12px 0px 12px;
`;

const HeaderLeft = styled(ButtonPreventDouble)`
  align-items: flex-start;
  justify-content: center;
  width: 40px;
`;

const HeaderRight = styled(ButtonPreventDouble)`
  align-items: flex-end;
  justify-content: center;
  width: 40px;
`;

const HeaderCenter = styled(View.Row)`
  align-items: center;
  justify-content: center;
  flex: 1;
  padding-bottom: 4px;
`;

const Header = ({
  iconLeft = 'arrow-back',
  actionLeft,
  title = '',
  iconRight = false,
  actionRight
}) => {
  return (
    <SafeAreaView edges={['top']}>
      <HeaderContainer>
        <HeaderLeft
          onPress={typeof actionLeft === 'function' ? actionLeft : () => {}}
        >
          <Icon.VectorIcon
            name={iconLeft}
            size={24}
            color={Theme.colors.white_color}
          />
        </HeaderLeft>
        <HeaderCenter>
          <Text.BodyBold fontSize={18} numberOfLines={1}>
            {title}
          </Text.BodyBold>
        </HeaderCenter>
        <HeaderRight
          onPress={typeof actionRight === 'function' ? actionRight : () => {}}
          disabled={!iconRight}
        >
          <Icon.VectorIcon
            name={iconRight || 'arrow-back'}
            size={24}
            color={
              iconRight ? Theme.colors.white_color : Theme.colors.primary_color
            }
          />
        </HeaderRight>
      </HeaderContainer>
    </SafeAreaView>
  );
};

const RenderHTMLJobHere = styled(RenderHTML).attrs((props) => ({
  baseStyle: {
    fontFamily: 'BeVietnam-Light',
    color: props.theme.text_colors.secondary_text_color,
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
    <ButtonPreventDouble
      activeOpacity={0.6}
      onPress={onPress}
      style={{
        backgroundColor: Theme.colors.white_color,
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 0.5,
        borderColor: Theme.colors.dark_gray_color,
        ...style
      }}
    >
      <View.Row style={{ flex: 1, alignItems: 'center' }}>
        {!!icon && (
          <View.Col
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: iconMarginRight
            }}
          >
            <Icon.VectorIcon name={icon} size={32} color={iconColor} />
          </View.Col>
        )}
        {!!imageSource && (
          <View.Col
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: iconMarginRight
            }}
          >
            <Image.ImageCircle source={imageSource} size={32} />
          </View.Col>
        )}
        <Text.Body
          secondary
          color={textColor}
          fontSize={20}
          style={{ flex: 1 }}
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
        {!!value && (
          <Text.SubBody
            secondary
            numberOfLines={1}
            style={{ textAlignVertical: 'center' }}
          >
            {value}
          </Text.SubBody>
        )}
        {!!iconRight && (
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
    </ButtonPreventDouble>
  );
};

export default {
  Header,
  RenderHTMLJobHere,
  BasicItem
};
