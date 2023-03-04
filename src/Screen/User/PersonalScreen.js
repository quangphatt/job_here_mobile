import React, { useContext } from 'react';
import { View, Text, Common } from '@Components';
import { AuthContext } from '@Config/Provider/AuthProvider';
import { useTranslation } from 'react-i18next';
import { logOut } from '@ReduxSlice/AuthenticationSlice';
import { useDispatch } from 'react-redux';

const PersonalScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);

  const onSignOut = () => {
    dispatch(logOut());
    authContext.logOut();
  };

  return (
    <View.Col>
      <Text.Body secondary>PersonalScreen</Text.Body>
      <Common.BasicItem
        title={t('jh.signOut')}
        icon={'ios-log-out-outline'}
        onPress={onSignOut}
        style={{ paddingLeft: 10 }}
      />
    </View.Col>
  );
};

export default PersonalScreen;
