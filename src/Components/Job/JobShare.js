import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { View, Text, Icon, Button, Image } from '@Components';
import Theme from '@Theme';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';
import facebook_img from '@Assets/Images/facebook.png';
import linkedin_img from '@Assets/Images/linkedin.png';
import twitter_img from '@Assets/Images/twitter.png';

const SOCIAL_SIZE = 44;

const JobShare = ({ path = '', company = false }) => {
  const { t } = useTranslation();
  const host = 'jobhere.tech';
  let url = host + path;

  const onPressCopyClipboard = () => {
    Clipboard.setString(url);
  };

  const onPressShareFacebook = () => {
    Linking.openURL(
      `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    );
  };

  const onPressShareLinkedin = () => {
    Linking.openURL(
      `https://www.linkedin.com/cws/share?url=${encodeURIComponent(url)}`
    );
  };

  const onPressShareTwitter = () => {
    Linking.openURL(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`
    );
  };

  return (
    <View.Col style={{ padding: 10 }}>
      <Text.BodyBold secondary>{t('jh.copyLink')}</Text.BodyBold>
      <View.Row style={{ alignItems: 'center', width: '80%' }}>
        <Text.Body
          style={{
            flex: 1,
            padding: 5,
            paddingLeft: 10,
            marginVertical: 5,
            marginRight: 10,
            backgroundColor: Theme.background_colors.item_background_color,
            borderRadius: 4
          }}
          secondary
        >
          {url}
        </Text.Body>
        <Button.ButtonPreventDouble
          onPress={onPressCopyClipboard}
          style={{
            padding: 5,
            backgroundColor: Theme.background_colors.item_background_color,
            borderRadius: 4
          }}
        >
          <Icon.VectorIcon
            name={'clipboard-outline'}
            color={Theme.colors.primary_color}
            size={20}
          />
        </Button.ButtonPreventDouble>
      </View.Row>
      <Text.BodyBold secondary>{t('jh.shareSocial')}</Text.BodyBold>
      <View.Row style={{ marginTop: 5 }}>
        <Button.ButtonPreventDouble
          onPress={onPressShareFacebook}
          style={styles.socialButton}
        >
          <Image.ImageSquare source={facebook_img} size={SOCIAL_SIZE} />
        </Button.ButtonPreventDouble>
        <Button.ButtonPreventDouble
          onPress={onPressShareTwitter}
          style={styles.socialButton}
        >
          <Image.ImageSquare source={twitter_img} size={SOCIAL_SIZE} />
        </Button.ButtonPreventDouble>
        <Button.ButtonPreventDouble
          onPress={onPressShareLinkedin}
          style={styles.socialButton}
        >
          <Image.ImageSquare source={linkedin_img} size={SOCIAL_SIZE} />
        </Button.ButtonPreventDouble>
      </View.Row>
    </View.Col>
  );
};

const styles = StyleSheet.create({
  socialButton: { marginRight: 20 }
});

export default JobShare;
