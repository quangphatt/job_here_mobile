import React from 'react';
import { TouchableOpacity } from 'react-native';
import View from './View';
import Text from './Text';
import Common from './Common';
import theme from '@Theme';
import Global from '@Global';
import { preventDoubleClick } from '@Config/Common';
import styled from 'styled-components/native';
import { withTranslation } from 'react-i18next';
import vi_icon from '@Assets/Images/vi_icon.png';
import en_icon from '@Assets/Images/en_icon.png';

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

const ButtonPreventDouble = TouchPreventDouble;

const _ButtonChangeLanguage = ({ i18n }) => {
  const onChangeLanguage = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('vn');
    } else {
      i18n.changeLanguage('en');
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

export default { Button, ButtonPreventDouble, ButtonChangeLanguage };
