import React, { useEffect, useState } from 'react';
import { Text, View } from '@Components';
import { useNetInfo } from '@react-native-community/netinfo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated';
import alert from '@Alert';
import { useTranslation } from 'react-i18next';

const AView = Animated.createAnimatedComponent(View.Row);

const NetInfoHandler = () => {
  const [isShowNotification, toggleNotification] = useState(false);
  const insets = useSafeAreaInsets();
  const netInfo = useNetInfo();
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof netInfo.isConnected === 'boolean') {
      if (netInfo.isConnected) {
        alert.hide();
        toggleNotification(false);
      } else {
        toggleNotification(true);
        setTimeout(() => {
          alert.show({
            title: t('jh.noConnection'),
            body: `${t('jh.connectionInterrupted')}\n${t('jh.checkAgain')}`
          });
        }, 1000);
      }
    }
  }, [netInfo.isConnected]);

  return isShowNotification ? (
    <AView
      style={{
        zIndex: 10000,
        position: 'absolute',
        backgroundColor: netInfo.isConnected ? 'green' : 'red',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
        paddingTop: 8 + insets.top
      }}
      entering={SlideInUp.duration(1000)}
      exiting={SlideOutUp.duration(1000).delay(1500)}
    >
      <Text.BodyBold>
        {netInfo.isConnected ? 'Connected' : 'No Connection'}
      </Text.BodyBold>
    </AView>
  ) : null;
};

export default NetInfoHandler;
