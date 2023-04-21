import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Icon, Common, Button } from '@Components';
import Theme from '@Theme';
import { goBack } from '@NavigationAction';
import { useTranslation } from 'react-i18next';
import Alert from '@Alert';
import { ValidatePassword } from '@Config/Validate';
import { userBusiness } from '@Business';

const ChangePasswordScreen = () => {
  const { t } = useTranslation();
  const [account, setAccount] = useState({
    oldPassword: '',
    password: '',
    rePassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    password: false,
    rePassword: false
  });

  const onChangePassword = (type) => (password) => {
    setAccount((prev) => ({ ...prev, [type]: password }));
  };

  const onToggleShowPassword = (type) => () => {
    setShowPassword((prev) => ({
      ...prev,
      [type]: !showPassword[type]
    }));
  };

  const changePassword = async () => {
    const { oldPassword, password } = account;
    let _changePassword = await userBusiness.changePassword(
      oldPassword,
      password
    );
    if (_changePassword.data.httpCode === 200) {
      Alert.show({
        title: t('jh.changePassword') + ' ' + t('jh.successfully'),
        type: Alert.AlertType.SUCCESS
      });
      setAccount({
        oldPassword: '',
        password: '',
        rePassword: ''
      });
    } else {
      Alert.show({
        title: t('jh.changePassword') + ' ' + t('jh.failed'),
        body: _changePassword.data?.message ?? '',
        type: Alert.AlertType.DANGER
      });
    }
  };

  const onPressChangePassword = () => {
    if (!ValidatePassword(account.password)) {
      Alert.show({
        title: t('jh.changePassword'),
        body: t('jh.invalidNewPassword')
      });
    } else if (account.password.trim() !== account.rePassword.trim()) {
      Alert.show({
        title: t('jh.changePassword'),
        body: t('jh.invalidRePassword')
      });
    } else {
      Alert.show({
        title: t('jh.changePassword'),
        body: t('jh.wantToChangePassword'),
        button_primary: t('jh.change'),
        button_secondary: t('jh.cancel'),
        action: async (type) => {
          Alert.hide();
          if (type === Alert.ActionType.PRIMARY) {
            await changePassword();
          }
        }
      });
    }
  };

  return (
    <View.Col style={{ flex: 1 }}>
      <Common.Header title={t('jh.changePassword')} actionLeft={goBack} />
      <View.Col
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: Theme.colors.white_color,
          borderRadius: 10
        }}
      >
        <View.Col style={styles.item_group}>
          <Text.BodyBold
            fontSize={16}
            color={Theme.text_colors.gray_text_color}
          >
            {t('jh.oldPassword')}
          </Text.BodyBold>
          <View.Row style={styles.text_input_wrapper}>
            <Icon.VectorIcon name={'ios-lock-closed'} style={{ padding: 10 }} />
            <Text.TextInput
              value={account.oldPassword}
              onChangeText={onChangePassword('oldPassword')}
              placeholder={t('jh.oldPasswordPlaceholder')}
              placeholderTextColor={Theme.colors.dark_gray_color}
              secureTextEntry={!showPassword.oldPassword}
              style={[styles.text_input, { paddingRight: 36 }]}
            />
            <Button.ButtonPreventDouble
              onPress={onToggleShowPassword('oldPassword')}
              style={{ position: 'absolute', right: 10 }}
            >
              <Icon.VectorIcon
                name={showPassword.oldPassword ? 'eye-off' : 'eye'}
              />
            </Button.ButtonPreventDouble>
          </View.Row>
        </View.Col>
        <View.Col style={styles.item_group}>
          <Text.BodyBold
            fontSize={16}
            color={Theme.text_colors.gray_text_color}
          >
            {t('jh.newPassword')}
          </Text.BodyBold>
          <View.Row style={styles.text_input_wrapper}>
            <Icon.VectorIcon name={'ios-lock-closed'} style={{ padding: 10 }} />
            <Text.TextInput
              value={account.password}
              onChangeText={onChangePassword('password')}
              placeholder={t('jh.newPasswordPlaceholder')}
              placeholderTextColor={Theme.colors.dark_gray_color}
              secureTextEntry={!showPassword.password}
              style={[styles.text_input, { paddingRight: 36 }]}
            />
            <Button.ButtonPreventDouble
              onPress={onToggleShowPassword('password')}
              style={{ position: 'absolute', right: 10 }}
            >
              <Icon.VectorIcon
                name={showPassword.password ? 'eye-off' : 'eye'}
              />
            </Button.ButtonPreventDouble>
          </View.Row>
        </View.Col>
        <View.Col style={styles.item_group}>
          <Text.BodyBold
            fontSize={16}
            color={Theme.text_colors.gray_text_color}
          >
            {t('jh.rePassword')}
          </Text.BodyBold>
          <View.Row style={styles.text_input_wrapper}>
            <Icon.VectorIcon name={'ios-lock-closed'} style={{ padding: 10 }} />
            <Text.TextInput
              value={account.rePassword}
              onChangeText={onChangePassword('rePassword')}
              placeholder={t('jh.rePasswordPlaceholder')}
              placeholderTextColor={Theme.colors.dark_gray_color}
              secureTextEntry={!showPassword.rePassword}
              style={[styles.text_input, { paddingRight: 36 }]}
            />
            <Button.ButtonPreventDouble
              onPress={onToggleShowPassword('rePassword')}
              style={{ position: 'absolute', right: 10 }}
            >
              <Icon.VectorIcon
                name={showPassword.rePassword ? 'eye-off' : 'eye'}
              />
            </Button.ButtonPreventDouble>
          </View.Row>
        </View.Col>
        <Button.Button
          onPress={onPressChangePassword}
          disabled={
            !account.oldPassword || !account.password || !account.rePassword
          }
          style={{ marginTop: 15 }}
        >
          <Text.BodyBold>{t('jh.changePassword')}</Text.BodyBold>
        </Button.Button>
      </View.Col>
    </View.Col>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  item_group: { marginTop: 5 },
  text_input_wrapper: {
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Theme.colors.dark_gray_color,
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: Theme.background_colors.box_background_color
  },
  text_input: {
    flex: 1,
    height: '100%',
    borderLeftWidth: 0.5,
    borderColor: Theme.colors.dark_gray_color,
    paddingLeft: 10
  }
});
