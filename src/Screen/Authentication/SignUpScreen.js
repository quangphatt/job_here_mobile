import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View, Text, Button, Icon } from '@Components';
import AutoHeightImage from 'react-native-auto-height-image';
import DateTimePicker from '@react-native-community/datetimepicker';
import theme from '@Theme';
import { useTranslation } from 'react-i18next';
import Global from '@Global';
import { navigate } from '@NavigationAction';
import logo_group from '@Assets/Images/logo_group.png';

moment.suppressDeprecationWarnings = true;

const SignUpScreen = () => {
  const { t } = useTranslation();
  const [account, setAccount] = useState({
    email: '',
    displayName: '',
    password: '',
    rePassword: '',
    dateOfBirth: '',
    phoneNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const onChangeEmail = (email) => {
    setAccount((prev) => ({ ...prev, email }));
  };

  const onChangeDisplayName = (displayName) => {
    setAccount((prev) => ({ ...prev, displayName }));
  };

  const onChangePassword = (password) => {
    setAccount((prev) => ({ ...prev, password }));
  };

  const onChangeRePassword = (rePassword) => {
    setAccount((prev) => ({ ...prev, rePassword }));
  };

  const onChangeDateOfBirth = (event, selectedDate) => {
    Global._hideModal();
    setAccount((prev) => ({
      ...prev,
      dateOfBirth: moment(selectedDate, 'MM-DD-YYYY').format('YYYY/MM/DD')
    }));
  };

  const onChangePhoneNumber = (phoneNumber) => {
    setAccount((prev) => ({ ...prev, phoneNumber }));
  };

  const onToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onToggleShowRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  const onPressDateOfBirth = () => {
    Global._showModal({
      isShowHeader: false,
      closeOnOverlayTap: true,
      component: (
        <DateTimePicker
          value={
            account.dateOfBirth ? new Date(account.dateOfBirth) : new Date()
          }
          mode={'date'}
          onChange={onChangeDateOfBirth}
        />
      )
    });
  };

  const onPressSignUp = async () => {
    navigate('AuthenticationCodeScreen');
  };

  const onPressSignIn = () => {
    navigate('SignInScreen');
  };

  const onPressTermOfService = () => {
    navigate('CommonAppNavigation', { screen: 'TermOfServiceScreen' });
  };

  return (
    <View.Container>
      <ScrollView>
        <View.Col style={{ alignItems: 'center', marginTop: '8%' }}>
          <View.Row style={{ alignItems: 'center' }}>
            <AutoHeightImage source={logo_group} width={200} />
          </View.Row>
          <View.Col style={{ alignItems: 'center', marginTop: 5 }}>
            <Text.H2_Bold secondary>{t('jh.signUp')}</Text.H2_Bold>
            <Text.Body fontSize={16} secondary>
              {t('jh.signUpSub')}
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
              {t('jh.email')}
            </Text.BodyBold>
            <View.Row style={styles.text_input_wrapper}>
              <Icon.VectorIcon name={'mail'} style={{ padding: 10 }} />
              <Text.TextInput
                value={account.email}
                onChangeText={onChangeEmail}
                placeholder={t('jh.emailPlaceholder')}
                style={styles.text_input}
                keyboardType={'email-address'}
              />
            </View.Row>
          </View.Col>
          <View.Col style={{ marginTop: '4%' }}>
            <Text.BodyBold
              fontSize={16}
              color={theme.text_colors.gray_text_color}
            >
              {t('jh.displayName')}
            </Text.BodyBold>
            <View.Row style={styles.text_input_wrapper}>
              <Icon.VectorIcon name={'person'} style={{ padding: 10 }} />
              <Text.TextInput
                value={account.displayName}
                onChangeText={onChangeDisplayName}
                placeholder={t('jh.displayNamePlaceholder')}
                style={styles.text_input}
              />
            </View.Row>
          </View.Col>
          <View.Col style={{ marginTop: '4%' }}>
            <Text.BodyBold
              fontSize={16}
              color={theme.text_colors.gray_text_color}
            >
              {t('jh.password')}
            </Text.BodyBold>
            <View.Row style={styles.text_input_wrapper}>
              <Icon.VectorIcon
                name={'ios-lock-closed'}
                style={{ padding: 10 }}
              />
              <Text.TextInput
                value={account.password}
                onChangeText={onChangePassword}
                placeholder={t('jh.passwordPlaceholder')}
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
          <View.Col style={{ marginTop: '4%' }}>
            <Text.BodyBold
              fontSize={16}
              color={theme.text_colors.gray_text_color}
            >
              {t('jh.rePassword')}
            </Text.BodyBold>
            <View.Row style={styles.text_input_wrapper}>
              <Icon.VectorIcon
                name={'ios-lock-closed'}
                style={{ padding: 10 }}
              />
              <Text.TextInput
                value={account.rePassword}
                onChangeText={onChangeRePassword}
                placeholder={t('jh.rePasswordPlaceholder')}
                secureTextEntry={!showRePassword}
                style={[styles.text_input, { paddingRight: 36 }]}
              />
              <Button.ButtonPreventDouble
                onPress={onToggleShowRePassword}
                style={{ position: 'absolute', right: 10 }}
              >
                <Icon.VectorIcon name={showRePassword ? 'eye-off' : 'eye'} />
              </Button.ButtonPreventDouble>
            </View.Row>
          </View.Col>
          <View.Col style={{ marginTop: '4%' }}>
            <Text.BodyBold
              fontSize={16}
              color={theme.text_colors.gray_text_color}
            >
              {t('jh.dateOfBirth')}
            </Text.BodyBold>
            <View.Row style={styles.text_input_wrapper}>
              <Icon.VectorIcon name={'calendar'} style={{ padding: 10 }} />
              <Button.ButtonPreventDouble
                onPress={onPressDateOfBirth}
                style={[styles.text_input]}
              >
                <View.Col
                  style={{
                    flex: 1,
                    justifyContent: 'center'
                  }}
                >
                  <Text.Body secondary>
                    {account.dateOfBirth
                      ? moment(account.dateOfBirth).format('DD-MM-YYYY')
                      : moment().format('DD-MM-YYYY')}
                  </Text.Body>
                </View.Col>
              </Button.ButtonPreventDouble>
            </View.Row>
          </View.Col>
          <View.Col style={{ marginTop: '4%' }}>
            <Text.BodyBold
              fontSize={16}
              color={theme.text_colors.gray_text_color}
            >
              {t('jh.phoneNumber')}
            </Text.BodyBold>
            <View.Row style={styles.text_input_wrapper}>
              <Icon.VectorIcon name={'call'} style={{ padding: 10 }} />
              <Text.TextInput
                value={account.phoneNumber}
                onChangeText={onChangePhoneNumber}
                placeholder={t('jh.phoneNumberPlaceholder')}
                style={styles.text_input}
                keyboardType={'number-pad'}
              />
            </View.Row>
          </View.Col>
          <View.Col style={{ marginTop: '5%' }}>
            <Button.Button
              onPress={onPressSignUp}
              disabled={
                !account.email ||
                !account.displayName ||
                !account.password ||
                !account.rePassword ||
                !account.phoneNumber
              }
            >
              <Text.BodyBold style={{ textTransform: 'uppercase' }}>
                {t('jh.signUp')}
              </Text.BodyBold>
            </Button.Button>
          </View.Col>
          <View.Row
            style={{
              marginTop: '4%',
              justifyContent: 'center',
              paddingLeft: 10,
              paddingRight: 10,
              flexWrap: 'wrap'
            }}
          >
            <Text.Body secondary>{t('jh.agreeTermOfService')}</Text.Body>
            <Button.ButtonPreventDouble onPress={onPressTermOfService}>
              <Text.BodyBold primary>{t('jh.termOfService')}</Text.BodyBold>
            </Button.ButtonPreventDouble>
          </View.Row>
        </View.Col>

        <View.Row
          style={{
            justifyContent: 'center',
            marginTop: '4%',
            marginBottom: '4%'
          }}
        >
          <Text.Body secondary>{t('jh.haveAccount')}</Text.Body>
          <Button.ButtonPreventDouble onPress={onPressSignIn}>
            <Text.BodyBold primary>{t('jh.signInNow')}</Text.BodyBold>
          </Button.ButtonPreventDouble>
        </View.Row>
      </ScrollView>
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

export default SignUpScreen;
