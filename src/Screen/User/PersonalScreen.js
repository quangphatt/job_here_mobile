import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Image, Common, Button } from '@Components';
import Theme from '@Theme';
import { AuthContext } from '@Config/Provider/AuthProvider';
import { useTranslation } from 'react-i18next';
import { logOut } from '@ReduxSlice/AuthenticationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer, navigate } from '@NavigationAction';
import Alert from '@Alert';
import avatar_img from '@Assets/Images/user.png';

const PersonalScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const sessionInfo = useSelector((state) => state.Authentication.sessionInfo);
  const avatar = sessionInfo?.imageUrl
    ? { uri: sessionInfo.imageUrl }
    : avatar_img;

  const onSignOut = () => {
    Alert.show({
      title: t('jh.logOut'),
      body: t('jh.wantToLogOut'),
      button_primary: t('jh.logOut'),
      button_secondary: t('jh.cancel'),
      action: (type) => {
        Alert.hide();
        if (type === Alert.ActionType.PRIMARY) {
          dispatch(logOut());
          authContext.logOut();
        }
      },
      type: Alert.AlertType.WARNING
    });
  };

  const onPressItem = (RouteName) => () => {
    navigate(RouteName);
  };

  return (
    <View.Col>
      <Common.Header iconLeft={'menu'} actionLeft={openDrawer} />
      <View.Row
        style={{
          backgroundColor: Theme.colors.primary_color,

          padding: 10,
          paddingTop: 0
        }}
      >
        <Image.ImageCircle
          source={avatar}
          size={80}
          style={{ marginTop: 6 }}
        />
        <View.Col style={{ marginLeft: 10, flex: 1 }}>
          <Text.H2_Bold>{sessionInfo?.fullname ?? ''}</Text.H2_Bold>
          <Text.H4_Bold fontSize={18} style={{ marginTop: 3 }}>
            {sessionInfo?.email ?? ''}
          </Text.H4_Bold>
        </View.Col>
      </View.Row>
      <View.Col style={styles.section}>
        <Common.BasicItem
          title={t('jh.updateUserInfo')}
          icon={'create-outline'}
          onPress={onPressItem('UpdateUserInfoScreen')}
        />
        <Common.BasicItem
          title={t('jh.changePassword')}
          icon={'lock-closed'}
          onPress={onPressItem('ChangePasswordScreen')}
        />
        <Button.ButtonChangeLanguage />
      </View.Col>
      <View.Col style={styles.section}>
        <Common.BasicItem
          title={t('jh.termOfService')}
          icon={'list'}
          onPress={onPressItem('TermOfServiceScreen')}
        />
        <Common.BasicItem
          title={t('jh.privacyPolicy')}
          icon={'globe-sharp'}
          onPress={onPressItem('PrivacyPolicyScreen')}
        />
        <Common.BasicItem
          title={t('jh.aboutJobHere')}
          icon={'information-circle-outline'}
          onPress={onPressItem('AboutUsScreen')}
        />
      </View.Col>
      <View.Col style={styles.section}>
        <Common.BasicItem
          title={t('jh.signOut')}
          icon={'power'}
          iconColor={'#FF0000'}
          onPress={onSignOut}
        />
      </View.Col>
    </View.Col>
  );
};

export default PersonalScreen;

const styles = StyleSheet.create({
  section: {
    marginBottom: 40,
    borderTopWidth: 0.5,
    borderColor: Theme.colors.dark_gray_color
  }
});
