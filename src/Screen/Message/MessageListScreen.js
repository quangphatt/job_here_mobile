import React, { useState, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { View, Text, Icon, Image, Common, Loading, Button } from '@Components';
import Theme from '@Theme';
import { useTranslation } from 'react-i18next';
import { openDrawer, navigatePush } from '@NavigationAction';
import { messageBusiness } from '@Business';
import { useSelector } from 'react-redux';
import { TOPIC_MESSAGES_USER } from '@Config/Support/PathSupport';
import { convertToTimeString } from '@Config/Support/TimeSupport';
import { SOCKET_URL } from '@Config/Service/Host';
import SockJsClient from 'react-stomp';

const MessageListScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const email = useSelector((state) => state.Authentication.sessionInfo?.email);
  const [messages, setMessages] = useState([]);
  const [hasChange, setHasChange] = useState(false);
  const [loading, setLoading] = useState(true);
  const topicMessages = `${TOPIC_MESSAGES_USER}/${email}`;
  const currentSocket = useRef();

  let onMessageReceived = (msg) => {
    setHasChange((prev) => !prev);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getData();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    getData();
  }, [hasChange]);

  const getData = async () => {
    let result = await messageBusiness.getListMessage();
    if (result?.data?.httpCode === 200) {
      setMessages(result?.data?.objectData || []);
    }
    if (loading) setLoading(false);
  };

  const onOpenMessage = (messageData) => () => {
    navigatePush('MessageScreen', { messageData });
  };

  const renderMessageItem = ({ item, index }) => {
    return (
      <View.Col key={index}>
        <Button.ButtonPreventDouble
          onPress={onOpenMessage(item)}
          style={{
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingTop: 8,
            paddingBottom: 8,
            borderBottomWidth: 0.5,
            borderColor: Theme.colors.dark_gray_color
          }}
        >
          <View.Row
            style={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text.BodyBold
              secondary
              fontSize={18}
              style={{ flex: 1, marginRight: 10 }}
              numberOfLines={1}
            >
              {item.companyName}
            </Text.BodyBold>
            <Text.Body secondary style={{ fontStyle: 'italic' }}>
              {convertToTimeString(item.createdDate, t)}
            </Text.Body>
          </View.Row>
          <View.Row
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5
            }}
          >
            <Text.Body
              style={{
                fontWeight: !item.hasRead ? '700' : null,
                flex: 1,
                fontSize: 16,
                marginRight: 10
              }}
              secondary
              numberOfLines={1}
            >
              {item.content}
            </Text.Body>
            {!item.hasRead && (
              <View.Col
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: Theme.colors.primary_color
                }}
              />
            )}
          </View.Row>
        </Button.ButtonPreventDouble>
      </View.Col>
    );
  };

  return (
    <View.Col>
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
        title={t('jh.allMessage')}
        iconLeft={'menu'}
        actionLeft={openDrawer}
      />
      {loading ? (
        <Loading placeholder />
      ) : messages.length === 0 ? (
        <View.Col style={{ alignItems: 'center' }}>
          <Text.Body secondary fontSize={16}>
            {t('jh.noMessage')}!
          </Text.Body>
        </View.Col>
      ) : (
        <FlatList data={messages} renderItem={renderMessageItem} />
      )}
    </View.Col>
  );
};

export default MessageListScreen;
