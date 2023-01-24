import React from 'react';
import { Text, View, Icon, Image, Button } from '@Components';
import { SafeAreaView } from 'react-native-safe-area-context';
import alert from '@Alert';
import Global from '@Global';
import SignInScreen from './Authentication/SignInScreen';
import SignUpScreen from './Authentication/SignUpScreen';
import { useTranslation } from 'react-i18next';

const MainScreen = () => {
  return <SignUpScreen />;
};

export default MainScreen;
