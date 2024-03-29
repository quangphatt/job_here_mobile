import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { View, Text, Icon, Image, Button } from '@Components';
import Theme from '@Theme';
import { useTranslation } from 'react-i18next';
import { navigate } from '@NavigationAction';
import company_default_img from '@Assets/Images/company_default_img.jpg';
import company_default_bg from '@Assets/Images/company_default_background.jpg';
import { messageBusiness } from '@Business';
import { useSelector } from 'react-redux';

const AVATAR_SIZE = 76;

const CompanyHeader = ({ companyData }) => {
  const { t } = useTranslation();
  const sessionInfo = useSelector((state) => state.Authentication.sessionInfo);

  const onPressUrl = () => {
    Linking.openURL(companyData.valid_urlCompany);
  };

  const onPressEmail = () => {
    Linking.openURL(`mailto:${companyData.email}`);
  };

  const onPressSendMessage = async () => {
    let messageData = false;
    let result = await messageBusiness.getListMessage();
    if (result?.data?.httpCode === 200) {
      let listMessage = result?.data?.objectData || [];
      messageData = _.find(
        listMessage,
        (item) => item.companyId === companyData.companyId
      );
    }
    if (!messageData) {
      messageData = {
        companyId: companyData.companyId,
        companyImageUrl: companyData.avatarUrl,
        companyName: companyData.companyName,
        messageId: false
      };
    }
    navigate('MessageNavigation', {
      screen: 'MessageScreen',
      params: {
        messageData
      }
    });
  };

  return (
    <View.Col style={{ backgroundColor: Theme.colors.white_color }}>
      <View.Col>
        <Image.Image
          source={
            companyData?.backgroundUrl
              ? { uri: companyData.backgroundUrl }
              : company_default_bg
          }
          style={{ flex: 1, height: 80 }}
        />
      </View.Col>
      <View.Row style={{ minHeight: 80 }}>
        <View.Col
          style={{
            padding: 3,
            backgroundColor: Theme.colors.white_color,
            borderColor: Theme.border_colors.secondary_border_color,
            borderWidth: 1,
            borderRadius: (AVATAR_SIZE + 3 * 2) / 6,
            position: 'absolute',
            top: -(AVATAR_SIZE / 2),
            left: AVATAR_SIZE / 4
          }}
        >
          <Image.ImageSquare
            source={
              companyData?.avatarUrl
                ? { uri: companyData.avatarUrl }
                : company_default_img
            }
            size={AVATAR_SIZE}
            style={{
              borderColor: Theme.border_colors.primary_border_color,
              borderWidth: 1,
              backgroundColor: Theme.colors.white_color
            }}
          />
        </View.Col>
        <View.Col
          style={{
            marginLeft: (AVATAR_SIZE * 5) / 4 + 3 * 2 + 10,
            paddingRight: 10,
            paddingBottom: 5,
            flex: 1
          }}
        >
          <Text.BodyBold secondary fontSize={19}>
            {companyData.companyName}
          </Text.BodyBold>
          {!!companyData?.valid_urlCompany && (
            <View.Row style={styles.info}>
              <Icon.VectorIcon
                name={'md-home-sharp'}
                style={styles.info_icon}
              />
              <Button.ButtonPreventDouble onPress={onPressUrl}>
                <Text.Body secondary style={styles.info_value}>
                  {companyData.valid_urlCompany}
                </Text.Body>
              </Button.ButtonPreventDouble>
            </View.Row>
          )}
          {!!companyData?.email && (
            <View.Row style={styles.info}>
              <Icon.VectorIcon name={'mail'} style={styles.info_icon} />
              <Button.ButtonPreventDouble onPress={onPressEmail}>
                <Text.Body secondary style={styles.info_value}>
                  {companyData.email}
                </Text.Body>
              </Button.ButtonPreventDouble>
            </View.Row>
          )}
          {!!companyData?.size && (
            <View.Row style={styles.info}>
              <Icon.VectorIcon name={'people'} style={styles.info_icon} />
              <Text.Body secondary style={styles.info_value}>
                {companyData.size} {t('jh.people')}
              </Text.Body>
            </View.Row>
          )}
          {!!companyData?.address && (
            <View.Row style={styles.info}>
              <Icon.VectorIcon name={'location'} style={styles.info_icon} />
              <Text.Body secondary style={styles.info_value}>
                {companyData.address}
              </Text.Body>
            </View.Row>
          )}
          {!!sessionInfo?.email && (
            <Button.Button
              onPress={onPressSendMessage}
              secondary
              style={{ marginTop: 5, width: 220 }}
            >
              <Icon.VectorIcon
                name={'chatbubble-ellipses'}
                style={[
                  styles.info_icon,
                  { color: Theme.colors.primary_color, marginRight: 5 }
                ]}
              />
              <Text.Body primary>
                {t('jh.send')} {t('jh.message')}
              </Text.Body>
            </Button.Button>
          )}
        </View.Col>
      </View.Row>
    </View.Col>
  );
};

const styles = StyleSheet.create({
  info: {
    alignItems: 'flex-start'
  },
  info_icon: {
    marginTop: 3
  },
  info_value: {
    marginLeft: 5
  }
});

export default CompanyHeader;
