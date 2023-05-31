import React, { useEffect, useState, useRef, createRef, memo } from 'react';
import { SectionList, FlatList } from 'react-native';
import Popover from 'react-native-popover-view';
import { View, Text, Icon, Image, Button, Loading } from '@Components';
import Theme from '@Theme';
import { useTranslation } from 'react-i18next';
import { goBack } from '@NavigationAction';
import { messageBusiness } from '@Business';
import company_default_img from '@Assets/Images/company_default_img.jpg';
import { SOCKET_URL } from '@Config/Service/Host';
import SockJsClient from 'react-stomp';
import { useSelector } from 'react-redux';
import { TOPIC_MESSAGES_USER } from '@Config/Support/PathSupport';
import Alert from '@Alert';

const MessageScreen = ({ route }) => {
  const { t } = useTranslation();
  const sessionInfo = useSelector((state) => state.Authentication.sessionInfo);
  const { email, userId } = sessionInfo;
  const messageData = route?.params?.messageData;
  const [stateData, setStateData] = useState({
    childMessages: [],
    loading: true,
    showPopover: false,
    textMessage: '',
    sendingMessage: false
  });
  const [__lastUpdate, setLastUpdate] = useState(null);
  const [hasChange, setHasChange] = useState(false);
  const topicMessages = `${TOPIC_MESSAGES_USER}/${email}`;
  const currentSocket = useRef();
  const popoverRef = useRef(null);
  let listRef = useRef(null);
  const avatar = messageData?.companyImageUrl
    ? { uri: messageData.companyImageUrl }
    : company_default_img;

  useEffect(() => {
    const getData = async () => {
      await fetchData();
      if (!messageData.hasRead) await viewMessage();
    };
    getData();
  }, [hasChange]);

  useEffect(() => {
    setTimeout(() => {
      listRef.current?._listRef?._scrollRef?.scrollTo({ y: 0, animated: true });
    }, 500);
  }, [stateData.childMessages]);

  const fetchData = async () => {
    let result = await messageBusiness.getListChildMessage(
      messageData.messageId
    );
    messageBusiness.viewAllMessage(messageData.messageId);
    if (result?.data?.httpCode === 200) {
      let _messages = result?.data?.objectData || [];
      let _childMessage = {};

      for (let i = 0; i < _messages.length; i++) {
        let _time = moment(_messages[i].createdDate).format('YYYYMMDDHHmm');
        if (!_childMessage[_time]) _childMessage[_time] = [];
        _childMessage[_time].push(_messages[i]);
      }
      let listMessage = [];
      _.each(Object.keys(_childMessage), (key) => {
        listMessage = [...listMessage, ..._childMessage[key], key];
      });
      stateData.childMessages = listMessage;
    }
    if (stateData.loading) stateData.loading = false;
    setLastUpdate(moment().format('x'));
  };

  const viewMessage = async () => {
    await messageBusiness.viewAllMessage(messageData.messageId);
  };

  let onMessageReceived = (msg) => {
    setHasChange((prev) => !prev);
  };

  const togglePopover = () => {
    stateData.showPopover = !stateData.showPopover;
    setLastUpdate(moment().format('x'));
  };

  const onChangeTextMessage = (text) => {
    stateData.textMessage = text;
    setLastUpdate(moment().format('x'));
    listRef.current?._listRef?._scrollRef?.scrollTo({ y: 0, animated: true });
  };

  const onDeleteMessage = () => {
    togglePopover();
    Alert.show({
      title: t('jh.deleteMessage'),
      body: t('jh.deleteMessageConfirm'),
      button_primary: t('jh.confirm'),
      button_secondary: t('jh.cancel'),
      action: async (type) => {
        Alert.hide();
        if (type === Alert.ActionType.PRIMARY) {
          let res = await messageBusiness.deleteMessage(messageData.messageId);
          if (res.data.httpCode === 200) {
            goBack();
          }
        }
      },
      type: Alert.AlertType.DANGER
    });
  };

  const onPressSendMessage = async () => {
    if (stateData.textMessage?.trim()) {
      stateData.sendingMessage = true;
      setLastUpdate(moment().format('x'));
      let res = await messageBusiness.sendMessage({
        userId: messageData?.userId ?? userId,
        companyId: messageData.companyId,
        fromUser: true,
        content: stateData.textMessage?.trim()
      });
      if (!messageData.messageId) messageData.messageId = res.data.objectData;
      stateData.textMessage = '';
      stateData.sendingMessage = false;
      await fetchData();
    }
  };

  return (
    <View.Col style={{ paddingBottom: 50, flex: 1 }}>
      {!!email && (
        <SockJsClient
          url={SOCKET_URL}
          topics={[topicMessages]}
          onMessage={(msg) => onMessageReceived(msg)}
          debug={false}
          ref={currentSocket}
        />
      )}
      <View.Row
        style={{
          height: 56,
          backgroundColor: Theme.colors.primary_color,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <View.Row style={{ alignItems: 'center', flex: 1 }}>
          <Button.ButtonPreventDouble onPress={goBack}>
            <Icon.VectorIcon
              name={'chevron-back-sharp'}
              color={Theme.colors.white_color}
              size={36}
            />
          </Button.ButtonPreventDouble>
          <Image.ImageCircle
            source={avatar}
            size={40}
            style={{
              borderWidth: 0.5,
              borderColor: Theme.colors.dark_gray_color,
              marginRight: 12
            }}
          />
          <Text.BodyBold fontSize={20} style={{ flex: 1 }} numberOfLines={1}>
            {messageData.companyName}
          </Text.BodyBold>
        </View.Row>
        <Button.ButtonPreventDouble
          onPress={togglePopover}
          style={{ marginLeft: 10, marginRight: 5 }}
          ref={popoverRef}
        >
          <Icon.VectorIcon
            name={'md-ellipsis-vertical'}
            color={Theme.colors.white_color}
            size={30}
          />
          <Popover
            from={popoverRef}
            isVisible={stateData.showPopover}
            onRequestClose={togglePopover}
            arrowSize={{ width: 0, height: 0 }}
          >
            <Button.ButtonPreventDouble
              onPress={onDeleteMessage}
              style={{ padding: 10 }}
            >
              <Text.Body secondary fontSize={16}>
                {t('jh.deleteMessage')}
              </Text.Body>
            </Button.ButtonPreventDouble>
          </Popover>
        </Button.ButtonPreventDouble>
      </View.Row>
      {stateData.loading ? (
        <Loading placeholder />
      ) : (
        <ListMessage
          listRef={listRef}
          childMessages={stateData.childMessages}
          messageData={messageData}
          avatar={avatar}
        />
      )}
      {stateData.sendingMessage && (
        <View.Row style={{ justifyContent: 'flex-end', paddingRight: 10 }}>
          <Text.SubBody secondary>{t('jh.sending')}...</Text.SubBody>
        </View.Row>
      )}
      <View.Row
        style={{
          height: 50,
          paddingVertical: 5,
          position: 'absolute',
          bottom: 0,
          width: '100%'
        }}
      >
        <Text.TextInput
          value={stateData.textMessage}
          onChangeText={onChangeTextMessage}
          placeholder={t('jh.enter') + ' ' + t('jh.message')}
          placeholderTextColor={Theme.colors.dark_gray_color}
          style={{
            flex: 1,
            borderRadius: 8,
            borderWidth: 0.5,
            borderColor: Theme.colors.dark_gray_color,
            marginLeft: 10,
            marginRight: 5,
            paddingLeft: 10
          }}
        />
        <Button.ButtonPreventDouble
          onPress={onPressSendMessage}
          disabled={stateData.sendingMessage}
          style={{
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Theme.colors.primary_color,
            borderRadius: 8,
            width: 72
          }}
        >
          <Icon.VectorIcon
            name={'paper-plane'}
            size={24}
            color={Theme.colors.white_color}
          />
        </Button.ButtonPreventDouble>
      </View.Row>
    </View.Col>
  );
};

const ListMessage = memo(({ childMessages, listRef, avatar }) => {
  const { t } = useTranslation();

  const renderMessageTime = (title, index) => {
    let _time = moment(title, 'YYYYMMDDHHmm');
    let _timeDate = moment(_time).format('DD/MM/YYYY');
    let _timeHour = moment(_time).format('HH:mm');
    if (moment().isSame(_time, 'day')) {
      _timeDate = '';
    } else {
      if (moment().subtract(1, 'days').isSame(_time, 'day'))
        _timeDate = t('jh.yesterday');
      _timeDate += ', ';
    }

    return (
      <View.Col key={index} style={{ alignItems: 'center' }}>
        <Text.Body secondary>
          {_timeDate}
          {_timeHour}
        </Text.Body>
      </View.Col>
    );
  };

  const renderMessageItem = (item, index) => {
    const isRight = item.fromUser;
    return (
      <View.Row
        key={index}
        style={{
          justifyContent: isRight ? 'flex-end' : null,
          marginTop: 2,
          marginBottom: 2,
          alignItems: 'center'
        }}
      >
        {!isRight && (
          <Image.ImageCircle
            source={avatar}
            size={40}
            style={{
              borderWidth: 0.5,
              borderColor: Theme.colors.dark_gray_color,
              marginRight: 5
            }}
          />
        )}
        <Text.Body
          style={{
            color: isRight
              ? Theme.colors.white_color
              : Theme.text_colors.secondary_text_color,
            backgroundColor: isRight
              ? Theme.colors.primary_color
              : Theme.colors.white_color,
            padding: 8,
            borderRadius: 16
          }}
          fontSize={16}
        >
          {item.content}
        </Text.Body>
      </View.Row>
    );
  };

  const renderItem = ({ item, index }) => {
    if (typeof item === 'string') return renderMessageTime(item, index);
    return renderMessageItem(item, index);
  };

  return (
    <FlatList
      ref={listRef}
      inverted
      data={childMessages}
      initialScrollIndex={0}
      renderItem={renderItem}
      contentContainerStyle={{ marginRight: 10, marginLeft: 10 }}
    />
  );
});

export default MessageScreen;
