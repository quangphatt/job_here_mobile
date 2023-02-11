import React from 'react';
import { View, Text, Common } from '@Components';
import { withGlobalContext } from '@Global';
import { useTranslation } from 'react-i18next';

const PersonalScreen = (props) => {
  const { t } = useTranslation();

  const onSignOut = () => {
    props.global.updateState('isSignIn', false);
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

export default withGlobalContext(PersonalScreen);
