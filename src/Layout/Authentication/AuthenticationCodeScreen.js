import React, { useState } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { View, Text, Button, Icon } from '@Components';
import DateTimePicker from '@react-native-community/datetimepicker';
import theme from '@Theme';
import { useTranslation } from 'react-i18next';
import logo from '@Assets/Images/logo_no_text.png';
import logo_title from '@Assets/Images/title_light.png';
import Global from '@Global';

const AuthenticationCodeScreen = () => {
  const { t } = useTranslation();
  const [authCode, setAuthCode] = useState('');

  const onChangeAuthCode = authCode => {
    setAuthCode(authCode);
  };

  const onSubmit = () => {};

  const onPressResend = () => {};

  return (
    <View.Container>
      <View.Col style={{ alignItems: 'center', marginTop: '8%' }}>
        <View.Row style={{ alignItems: 'center' }}>
          <Image
            source={logo}
            style={{ width: 42, height: 42, marginRight: 5 }}
          />
          <Image source={logo_title} style={{ width: 160, height: 27.2 }} />
        </View.Row>
        <View.Col style={{ alignItems: 'center', marginTop: 5 }}>
          <Text.H2_Bold secondary>{t('jh.authCode')}</Text.H2_Bold>
          <Text.Body fontSize={12} secondary style={{ alignItems: 'center' }}>
            {t('jh.authCodeSub')}
          </Text.Body>
        </View.Col>
      </View.Col>

      <View.Col
        style={{
          marginHorizontal: '3%',
          marginTop: '8%',
          padding: 20,
          backgroundColor: theme.colors.white_color,
          borderRadius: 10
        }}
      >
        <View.Col>
          <Text.BodyBold
            fontSize={16}
            color={theme.text_colors.gray_text_color}
          >
            {t('jh.authCode')}
          </Text.BodyBold>
          <View.Row style={styles.text_input_wrapper}>
            <Icon.VectorIcon name={'code'} style={{ padding: 10 }} />
            <Text.TextInput
              value={authCode}
              onChangeText={onChangeAuthCode}
              placeholder={t('jh.authCodePlaceholder')}
              style={styles.text_input}
              keyboardType={'number-pad'}
            />
          </View.Row>
        </View.Col>
        <View.Col style={{ marginTop: '5%' }}>
          <Button.Button onPress={onSubmit}>
            <Text.Body style={{ textTransform: 'uppercase' }}>
              {t('jh.submit')}
            </Text.Body>
          </Button.Button>
        </View.Col>
      </View.Col>

      <View.Row
        style={{
          justifyContent: 'center',
          marginTop: '4%',
          marginBottom: '4%'
        }}
      >
        <Text.Body secondary>{t('jh.noSent')}</Text.Body>
        <Button.ButtonPreventDouble onPress={onPressResend}>
          <Text.BodyBold primary>{t('jh.resend')}</Text.BodyBold>
        </Button.ButtonPreventDouble>
      </View.Row>
    </View.Container>
  );
};

const styles = StyleSheet.create({
  text_input_wrapper: {
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: theme.colors.dark_gray_color,
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: theme.background_colors.box_background_color
  },
  text_input: {
    flex: 1,
    height: '100%',
    borderLeftWidth: 0.5,
    borderColor: theme.colors.dark_gray_color,
    paddingLeft: 10
  }
});

export default AuthenticationCodeScreen;
