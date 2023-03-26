import React from 'react';
import { TouchableOpacity } from 'react-native';
import View from './View';
import Text from './Text';
import Common from './Common';
import Icon from './Icon';
import theme from '@Theme';
import Global from '@Global';
import { preventDoubleClick } from '@Config/Common';
import styled from 'styled-components/native';
import { withTranslation } from 'react-i18next';
import { changeAcceptLanguage } from '@ReduxSlice/HeaderRequestSlice';
import { useDispatch } from 'react-redux';
import vi_icon from '@Assets/Images/vi_icon.png';
import en_icon from '@Assets/Images/en_icon.png';

const ButtonPreventDouble = preventDoubleClick(TouchableOpacity);

const Button = styled(ButtonPreventDouble)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 20px;
  background: ${(props) =>
    props.secondary
      ? props.theme.colors.white_color
      : props.disabled
      ? props.theme.colors.dark_gray_color
      : props.theme.colors.primary_color};
  border-radius: 5px;
  border: 1px solid
    ${(props) =>
      props.disabled
        ? props.theme.colors.dark_gray_color
        : props.theme.colors.primary_color};
`;

const _ButtonChangeLanguage = ({ i18n }) => {
  const dispatch = useDispatch();

  const onChangeLanguage = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('vn');
      dispatch(changeAcceptLanguage('vi'));
    } else {
      i18n.changeLanguage('en');
      dispatch(changeAcceptLanguage('en'));
    }
    Global._hideModal();
  };

  const onShowLanguagePanel = () => {
    Global._showModal({
      isScroll: false,
      isShowHeader: false,
      closeOnOverlayTap: true,
      component: renderLanguages()
    });
  };

  const renderLanguages = () => {
    return (
      <View.Col
        style={{
          flex: 1,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          padding: 20
        }}
      >
        <Common.BasicItem
          title={'Tiếng Việt'}
          imageSource={vi_icon}
          iconRight={i18n.language === 'vn' && 'checkmark-sharp'}
          iconRightColor={i18n.language === 'vn' && theme.colors.primary_color}
          onPress={onChangeLanguage}
        />
        <View.Seperator
          style={{ height: 16, borderColor: theme.colors.white_color }}
        />
        <Common.BasicItem
          title={'English'}
          imageSource={en_icon}
          iconRight={i18n.language === 'en' && 'checkmark-sharp'}
          iconRightColor={i18n.language === 'en' && theme.colors.primary_color}
          onPress={onChangeLanguage}
        />
      </View.Col>
    );
  };

  return (
    <Common.BasicItem
      title={i18n.language === 'en' ? 'English' : 'Tiếng Việt'}
      imageSource={i18n.language === 'en' ? en_icon : vi_icon}
      iconRight={'chevron-forward'}
      iconRightColor={'#555555'}
      onPress={onShowLanguagePanel}
      style={{ paddingLeft: 10 }}
    />
  );
};

const ButtonChangeLanguage = withTranslation('translations')(
  _ButtonChangeLanguage
);

const ButtonScrollToTop = ({ listRef, isFlatList = false }) => {
  const onScrollToTop = () => {
    if (isFlatList) {
      listRef?.current?.scrollToOffset?.({ animated: true, offset: 0 });
    } else {
      listRef?.current?.scrollTo?.({ y: 0, animated: true });
    }
  };
  const BUTTON_SIZE = 42;
  const BUTTON_MARGIN = 16;

  return (
    <View.Col
      style={{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: BUTTON_MARGIN,
        bottom: BUTTON_MARGIN,
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        backgroundColor: theme.colors.primary_color,
        zIndex: 1
      }}
    >
      <ButtonPreventDouble onPress={onScrollToTop}>
        <Icon.VectorIcon
          name={'arrow-up'}
          size={24}
          color={theme.colors.white_color}
        />
      </ButtonPreventDouble>
    </View.Col>
  );
};

export default {
  Button,
  ButtonPreventDouble,
  ButtonChangeLanguage,
  ButtonScrollToTop
};
