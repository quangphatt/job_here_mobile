import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { View, Text, Button, Icon } from '@Components';
import AutoHeightImage from 'react-native-auto-height-image';
import theme from '@Theme';
import { AuthContext } from '@Config/Provider/AuthProvider';
import { useTranslation } from 'react-i18next';
import { navigate } from '@NavigationAction';
import { authBusiness } from '@Business';
import { changeSession, logOut } from '@ReduxSlice/AuthenticationSlice';
import { changeHeaderToken } from '@ReduxSlice/HeaderRequestSlice';
import { useDispatch } from 'react-redux';
import * as Keychain from 'react-native-keychain';
import Alert from '@Alert';
import Loading from '@Loading';
import logo_group from '@Assets/Images/logo_group.png';

const SignInScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const [account, setAccount] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPasswrod] = useState(false);

  const onChangeEmail = (email) => {
    setAccount((prev) => ({ ...prev, email }));
  };

  const onChangePassword = (password) => {
    setAccount((prev) => ({ ...prev, password }));
  };

  const onToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onToggleRememberPassword = (value) => {
    setRememberPasswrod(value);
  };

  const onPressSignUp = () => {
    navigate('SignUpScreen');
  };

  const onPressSignIn = async () => {
    Loading.show();
    let signIn = await authBusiness.signIn(account.email, account.password);
    Loading.hide();
    if (signIn.data.httpCode === 200) {
      try {
        dispatch(changeHeaderToken(signIn.data.objectData.token));

        let session = await authBusiness.getSessionInfo();
        if (
          session.data &&
          session.data.httpCode !== 401 &&
          session.data.objectData &&
          session.data.objectData.email
        ) {
          dispatch(changeSession(session.data.objectData));

          const { token, refreshToken } = signIn.data.objectData;
          const { email, password } = account;
          authContext.setAuthState({
            token,
            refreshToken,
            authenticated: true,
            email,
            password
          });

          await Keychain.setGenericPassword(
            'token',
            JSON.stringify({
              token,
              refreshToken,
              email,
              password
            })
          );
        } else {
          dispatch(logOut());
          authContext.logOut();
        }
      } catch (error) {
        console.log('Error while save token to headerRequest', error);
      }
    } else {
      Alert.show({
        title: t('jh.signIn'),
        body: signIn?.data?.message ?? ''
      });
      setAccount({ ...account, password: '' });
    }
  };

  const onPressNoSignIn = () => {
    navigate('CommonAppNavigation', { screen: 'HomeScreen' });
  };

  return (
    <View.Container>
      <View.Col style={{ alignItems: 'center', marginTop: '8%' }}>
        <View.Row style={{ alignItems: 'center' }}>
          <AutoHeightImage source={logo_group} width={200} />
        </View.Row>
        <View.Col style={{ alignItems: 'center', marginTop: 5 }}>
          <Text.H2_Bold secondary>{t('jh.signIn')}</Text.H2_Bold>
          <Text.Body fontSize={16} secondary>
            {t('jh.signInSub')}
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
              placeholderTextColor={theme.colors.dark_gray_color}
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
            {t('jh.password')}
          </Text.BodyBold>
          <View.Row style={styles.text_input_wrapper}>
            <Icon.VectorIcon name={'ios-lock-closed'} style={{ padding: 10 }} />
            <Text.TextInput
              value={account.password}
              onChangeText={onChangePassword}
              placeholder={t('jh.passwordPlaceholder')}
              placeholderTextColor={theme.colors.dark_gray_color}
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
            tintColors={{
              true: theme.colors.primary_color,
              false: theme.colors.primary_color
            }}
          />
          <Text.BodyBold secondary>{t('jh.remembherPassword')}</Text.BodyBold>
        </View.Row>
        <View.Col style={{ marginTop: '5%' }}>
          <Button.Button
            onPress={onPressSignIn}
            disabled={!account.email || !account.password}
          >
            <Text.BodyBold style={{ textTransform: 'uppercase' }}>
              {t('jh.signIn')}
            </Text.BodyBold>
          </Button.Button>
          <Button.Button
            secondary
            onPress={onPressNoSignIn}
            style={{ marginTop: 10 }}
          >
            <Text.BodyBold primary style={{ textTransform: 'uppercase' }}>
              {t('jh.noSignIn')}
            </Text.BodyBold>
          </Button.Button>
        </View.Col>
      </View.Col>

      <View.Row style={{ justifyContent: 'center', marginTop: '4%' }}>
        <Text.Body secondary>{t('jh.noAccount')}</Text.Body>
        <Button.ButtonPreventDouble onPress={onPressSignUp}>
          <Text.BodyBold primary>{t('jh.signUpNow')}</Text.BodyBold>
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
