import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { View, Text } from '@Components';
import Theme from '@Theme';
import AutoHeightImage from 'react-native-auto-height-image';
import Lottie from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { navigate } from '@NavigationAction';
import splash_img from '@Assets/Images/launch_screen.png';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      navigate('CommonAppNavigation', { screen: 'HomeScreen' });
    }, 1000);
  }, []);

  return (
    <View.Container
      style={{
        flex: 1,
        backgroundColor: Theme.colors.white_color,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}
    >
      <View.Col
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <AutoHeightImage source={splash_img} width={width / 1.5} />
      </View.Col>
      <View.Col style={{ alignItems: 'center' }}>
        <Lottie
          source={require('@Assets/Lottie/loading.json')}
          loop
          autoPlay
          style={{ width: 80, height: 80 }}
        />
        <Text.BodyBold secondary>{t('jh.loading')}</Text.BodyBold>
      </View.Col>
    </View.Container>
  );
};

export default SplashScreen;
