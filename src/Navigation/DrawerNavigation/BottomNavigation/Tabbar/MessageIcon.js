import React, { useState, useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import { View, Text, Icon } from '@Components';
import Theme from '@Theme';
import { useTranslation } from 'react-i18next';
import { messageBusiness } from '@Business';
import { TOPIC_MESSAGES_USER } from '@Config/Support/PathSupport';
import { SOCKET_URL } from '@Config/Service/Host';
import SockJsClient from 'react-stomp';
import notifee from '@notifee/react-native';

const MessageIcon = ({ is_current_route, email }) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [messageCount, setMessageCount] = useState(0);
  const [messages, setMessages] = useState({});
  const [hasChange, setHasChange] = useState(false);
  const topicMessages = `${TOPIC_MESSAGES_USER}/${email}`;
  const currentSocket = useRef();
  let prevMess = useRef({ companyId: '', content: '' });

  useEffect(() => {
    const fetchData = async () => {
      let result = await messageBusiness.countUnreadMessage();
      if (result.data.httpCode === 200) {
        if (result.data.objectData * 1 > 9) setMessageCount('9+');
        else setMessageCount(result.data.objectData);
        let _result = await messageBusiness.getListMessage();
        if (_result?.data?.httpCode === 200) {
          prevMess.current = {
            companyId: messages?.[0]?.companyId ?? '',
            content: messages?.[0]?.content ?? ''
          };
          let _message = _result?.data?.objectData || [];
          setMessages(_message?.[0] ?? {});
          if (
            !_message?.[0]?.fromUser &&
            (_message?.[0]?.content !== prevMess.current.content ||
              _message?.[0]?.companyId !== prevMess.current.companyId)
          ) {
            onDisplayNotification(
              _message[0].companyName,
              _message[0].content,
              _message[0].companyImageUrl
            );
          }
        }
      }
    };
    fetchData();
  }, [hasChange, email]);

  const onDisplayNotification = async (
    companyName,
    content,
    companyImageUrl = ''
  ) => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'jobhere',
      name: 'Job Here Channel',
      sound: 'jobheresound'
    });

    // Display a notification
    await notifee.displayNotification({
      title: companyName,
      body: content,
      android: {
        channelId,
        pressAction: {
          id: 'jobhere'
        },
        sound: 'jobheresound',
        largeIcon: companyImageUrl
          ? companyImageUrl
          : require('@Assets/Images/logo.png')
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
          topics={[topicMessages]}
          onMessage={(msg) => onMessageReceived(msg)}
          debug={false}
          ref={currentSocket}
        />
      )}
      {!!messageCount && (
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
            {messageCount}
          </Text.SubBodyBold>
        </View.Col>
      )}
      <Icon.VectorIcon
        name={
          is_current_route
            ? 'chatbubble-ellipses-outline'
            : 'chatbubble-ellipses'
        }
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
        {t('jh.message')}
      </Text.SubBodyBold>
    </View.Col>
  );
};

export default MessageIcon;
