import React from 'react';
import { Text, View, Icon, Image, Button } from '@Components';
import { SafeAreaView } from 'react-native-safe-area-context';
import alert from '@Alert';
import Global from '@Global';
import SignUpScreen from './Authentication/SignUpScreen';
import AuthenticationCodeScreen from './Authentication/AuthenticationCodeScreen';
import JobInfoScreen from './Job/JobInfoScreen';
import { useTranslation } from 'react-i18next';

const MainScreen = () => {
  return <JobInfoScreen />;
};

export default MainScreen;
