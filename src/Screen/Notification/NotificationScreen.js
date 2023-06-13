import React, { useState, useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Common, Button, Loading } from '@Components';
import Theme from '@Theme';
import { openDrawer } from '@NavigationAction';
import { useTranslation } from 'react-i18next';
import { notificationBusiness } from '@Business';
import { convertToTimeString } from '@Config/Support/TimeSupport';
import { TOPIC_MESSAGES_USER } from '@Config/Support/PathSupport';
import { SOCKET_URL } from '@Config/Service/Host';
import SockJsClient from 'react-stomp';
import { useSelector } from 'react-redux';

const NotificationScreen = () => {
  const { t } = useTranslation();
  const email = useSelector((state) => state.Authentication.sessionInfo?.email);
  const [notifications, setNotifications] = useState([]);
  const [hasChange, setHasChange] = useState(false);
  const [loading, setLoading] = useState(true);
  const topicMessages = `${TOPIC_MESSAGES_USER}/${email}`;
  const currentSocket = useRef();

  useEffect(() => {
    console.log('------- notification');
    getData();
  }, [hasChange]);

  const getData = async () => {
    let res = await notificationBusiness.getLastsNotificationOfUser();
    if (res.data.httpCode === 200) {
      setNotifications(res.data?.objectData ?? []);
    }
    if (loading) setLoading(false);
  };

  let onMessageReceived = (msg) => {
    console.log('------- notification11');
    setHasChange((prev) => !prev);
  };

  const viewNotification = (notiId, viewed) => async () => {
    if (!viewed) {
      let list = notifications.map((x) => {
        if (x.notificationId === notiId) x.viewed = true;
        return x;
      });
      setNotifications(list);
      await notificationBusiness.viewNotification(notiId);
    }
  };

  const viewAllNotification = async () => {
    let list = notifications.map((x) => {
      if (!x.viewed) x.viewed = true;
      return x;
    });
    setNotifications(list);
    await notificationBusiness.viewNotificationOfUser();
  };

  return (
    <View.Col style={{ flex: 1 }}>
      {!!email && (
        <SockJsClient
          url={SOCKET_URL}
          topics={[topicMessages]}
          onMessage={(msg) => onMessageReceived(msg)}
          debug={false}
          ref={currentSocket}
        />
      )}
      <Common.Header
        title={t('jh.notification')}
        iconLeft={'menu'}
        actionLeft={openDrawer}
      />
      {loading ? (
        <Loading placeholder />
      ) : notifications.length === 0 ? (
        <View.Col style={{ alignItems: 'center' }}>
          <Text.Body secondary fontSize={16}>
            {t('jh.noNotification')}!
          </Text.Body>
        </View.Col>
      ) : (
        <ScrollView>
          <Button.ButtonPreventDouble
            onPress={viewAllNotification}
            style={{
              height: 30,
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: 10,
              borderBottomWidth: 0.5,
              borderColor: Theme.colors.dark_gray_color
            }}
          >
            <Text.Body primary fontSize={15}>
              {t('jh.viewAll')}
            </Text.Body>
          </Button.ButtonPreventDouble>
          {_.map(notifications, (item, index) => {
            return (
              <View.Col key={index}>
                <Button.ButtonPreventDouble
                  onPress={viewNotification(item.notificationId, item.viewed)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderBottomWidth: 0.5,
                    borderColor: Theme.colors.dark_gray_color,
                    backgroundColor: item.viewed
                      ? null
                      : Theme.background_colors.page_background_color
                  }}
                >
                  <View.Col style={{ flex: 1 }}>
                    <Text.BodyBold secondary fontSize={17}>
                      {item.notificationTitle}
                    </Text.BodyBold>
                    <Text.Body secondary fontSize={17}>
                      {item.notificationContent}
                    </Text.Body>
                    <Text.BodyBold secondary style={{ fontStyle: 'italic' }}>
                      {convertToTimeString(item.createdDate, t)}
                    </Text.BodyBold>
                  </View.Col>
                  {!item.viewed && (
                    <View.Col
                      style={{
                        height: 16,
                        width: 16,
                        borderRadius: 8,
                        backgroundColor: Theme.colors.primary_color,
                        marginLeft: 5
                      }}
                    />
                  )}
                </Button.ButtonPreventDouble>
              </View.Col>
            );
          })}
        </ScrollView>
      )}
    </View.Col>
  );
};

export default NotificationScreen;
