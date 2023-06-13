import React, { useState, useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import { View, Text, Icon } from '@Components';
import Theme from '@Theme';
import { useTranslation } from 'react-i18next';
import { notificationBusiness } from '@Business';
import { TOPIC_MESSAGES_USER } from '@Config/Support/PathSupport';
import { SOCKET_URL } from '@Config/Service/Host';
import SockJsClient from 'react-stomp';
import notifee from '@notifee/react-native';

const NotificationIcon = ({ is_current_route, email }) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [notificationCount, setNotificationCount] = useState(0);
  const [hasChange, setHasChange] = useState(false);
  const topicNotification = `${TOPIC_MESSAGES_USER}/notification/${email}`;
  const currentSocket = useRef();

  useEffect(() => {
    const fetchData = async () => {
      console.log('------- notification count');
      let result = await notificationBusiness.countNotification();
      if (result.data.httpCode === 200) {
        if (result.data.objectData * 1 > 9) setNotificationCount('9+');
        else setNotificationCount(result.data.objectData);

        // Push notification
        let res = await notificationBusiness.getLastsNotificationOfUser();
        if (res.data.httpCode === 200) {
          let _notification = res.data?.objectData ?? [];
          if (!_notification?.[0]?.viewed) {
            onDisplayNotification(
              _notification[0].notificationTitle,
              _notification[0].notificationContent
            );
          }
        }
      }
    };
    fetchData();
  }, [hasChange, email]);

  const onDisplayNotification = async (
    notificationTitle,
    notificationContent
  ) => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'jobhere-notification',
      name: 'Job Here Notification',
      sound: 'jobheresound'
    });

    // Display a notification
    await notifee.displayNotification({
      title: notificationTitle,
      body: notificationContent,
      android: {
        channelId,
        pressAction: {
          id: 'jobhere-notification'
        },
        sound: 'jobheresound'
      }
    });
  };

  let onMessageReceived = (msg) => {
    setHasChange((prev) => !prev);
  };

  return (
    <View.Col style={{ justifyContent: 'center', alignItems: 'center' }}>
      {!!email && (
        <SockJsClient
          url={SOCKET_URL}
          topics={[topicNotification]}
          onMessage={(msg) => onMessageReceived(msg)}
          debug={false}
          ref={currentSocket}
        />
      )}
      {!!notificationCount && (
        <View.Col
          style={{
            position: 'absolute',
            top: -3,
            right: width / 14,
            zIndex: 1,
            width: 20,
            height: 18,
            borderRadius: 8,
            backgroundColor: Theme.colors.danger,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text.SubBodyBold fontSize={15} style={{ marginTop: -5 }}>
            {notificationCount}
          </Text.SubBodyBold>
        </View.Col>
      )}
      <Icon.VectorIcon
        name={is_current_route ? 'notifications-outline' : 'notifications'}
        size={28}
        color={
          is_current_route
            ? Theme.text_colors.primary_text_color
            : Theme.text_colors.secondary_text_color
        }
      />
      <Text.SubBodyBold
        style={{
          color: is_current_route
            ? Theme.text_colors.primary_text_color
            : Theme.text_colors.secondary_text_color,
          fontSize: 12
        }}
      >
        {t('jh.notification')}
      </Text.SubBodyBold>
    </View.Col>
  );
};

export default NotificationIcon;
