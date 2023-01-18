import React from 'react';
import { Text, View, Icon, Image, Button } from '@Components';
import { SafeAreaView } from 'react-native-safe-area-context';
import alert from '@Alert';
import Global from '@Global';
import SignInScreen from './Authentication/SignInScreen';
import { useTranslation } from 'react-i18next';

const MainScreen = () => {
  const { t } = useTranslation();

  return (
    <View.Container>
      <Text.Body secondary style={{ padding: 15 }}>
        {t('English')}
      </Text.Body>
      <Button.ButtonChangeLanguage />
    </View.Container>
  );
};

export default MainScreen;
