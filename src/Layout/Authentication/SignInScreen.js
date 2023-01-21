import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { View, Text, Button, Icon } from '@Components';
import theme from '@Theme';
import { useTranslation } from 'react-i18next';
import logo from '@Assets/Images/logo_no_text.png';
import logo_title from '@Assets/Images/title_light.png';

const SignInScreen = () => {
  const { t } = useTranslation();
  const [account, setAccount] = useState({ email: '', password: '' });
  const [showPassword, setShowpPassword] = useState(false);
  const [rememberPassword, setRememberPasswrod] = useState(false);

  const onChangeEmail = email => {
    setAccount(prev => ({ ...prev, email }));
  };

  const onChangePassword = password => {
    setAccount(prev => ({ ...prev, password }));
  };

  const onToggleShowPassword = () => {
    setShowpPassword(!showPassword);
  };

  const onToggleRememberPassword = value => {
    setRememberPasswrod(value);
  };

  const onPressSignUp = () => {};

  const onPressSignIn = async () => {};

  return (
    <View.Container>
      <View.Col style={{ alignItems: 'center', marginTop: '8%' }}>
        <View.Row style={{ alignItems: 'center' }}>
          <Image
            source={logo}
            style={{ width: 42, height: 42, marginRight: 5 }}
          />
          <Image source={logo_title} style={{ width: 160, height: 27 }} />
        </View.Row>
        <View.Col style={{ alignItems: 'center', marginTop: 5 }}>
          <Text.H2_Bold secondary>{t('Sign In')}</Text.H2_Bold>
          <Text.Body fontSize={18} secondary>
            {t('Sign in to continue.')}
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
            {t('Email')}
          </Text.BodyBold>
          <View.Row style={styles.text_input_wrapper}>
            <Icon.VectorIcon name={'person'} style={{ padding: 10 }} />
            <Text.TextInput
              value={account.email}
              onChangeText={onChangeEmail}
              placeholder={t('Enter Email')}
              style={styles.text_input}
            />
          </View.Row>
        </View.Col>
        <View.Col style={{ marginTop: '4%' }}>
          <Text.BodyBold
            fontSize={16}
            color={theme.text_colors.gray_text_color}
          >
            {t('Password')}
          </Text.BodyBold>
          <View.Row style={styles.text_input_wrapper}>
            <Icon.VectorIcon name={'ios-lock-closed'} style={{ padding: 10 }} />
            <Text.TextInput
              value={account.password}
              onChangeText={onChangePassword}
              placeholder={t('Enter Password')}
              secureTextEntry={!showPassword}
              style={[styles.text_input, { paddingRight: 36 }]}
            />
            <Button.ButtonPreventDouble
              onPress={onToggleShowPassword}
              style={{ position: 'absolute', right: 10 }}
            >
              <Icon.VectorIcon name={showPassword ? 'eye-off' : 'eye'} />
            </Button.ButtonPreventDouble>
          </View.Row>
        </View.Col>
        <View.Row style={{ alignItems: 'center' }}>
          <CheckBox
            fontSize={14}
            value={rememberPassword}
            onValueChange={onToggleRememberPassword}
          />
          <Text.BodyBold secondary>{t('Remember Password')}</Text.BodyBold>
        </View.Row>
        <View.Col style={{ marginTop: '5%' }}>
          <Button.Button onPress={onPressSignIn}>
            <Text.Body>{t('Sign In')}</Text.Body>
          </Button.Button>
        </View.Col>
      </View.Col>

      <View.Row style={{ justifyContent: 'center', marginTop: '4%' }}>
        <Text.Body secondary>{t("Don't have an account? ")}</Text.Body>
        <Button.ButtonPreventDouble onPress={onPressSignUp}>
          <Text.BodyBold primary>{t('Sign Up Now')}</Text.BodyBold>
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

export default SignInScreen;
