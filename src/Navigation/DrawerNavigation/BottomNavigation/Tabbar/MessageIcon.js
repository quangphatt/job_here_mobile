import React, { useState, useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import { View, Text, Icon } from '@Components';
import Theme from '@Theme';
import { useTranslation } from 'react-i18next';
import { messageBusiness } from '@Business';
import { TOPIC_MESSAGES_USER } from '@Config/Support/PathSupport';
import { SOCKET_URL } from '@Config/Service/Host';
import SockJsClient from 'react-stomp';

const MessageIcon = ({ is_current_route, email }) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [messageCount, setMessageCount] = useState(0);
  const [hasChange, setHasChange] = useState(false);
  const topicMessages = `${TOPIC_MESSAGES_USER}/${email}`;
  const currentSocket = useRef();

  useEffect(() => {
    const fetchData = async () => {
      let result = await messageBusiness.countUnreadMessage();
      if (result.data.httpCode === 200) {
        if (result.data.objectData * 1 > 9) setMessageCount('9+');
        else setMessageCount(result.data.objectData);
      }
    };
    fetchData();
  }, [hasChange, email]);

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