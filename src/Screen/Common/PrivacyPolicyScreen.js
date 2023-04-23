import React from 'react';
import { useWindowDimensions, ScrollView } from 'react-native';
import { View, Common } from '@Components';
import { goBack } from '@NavigationAction';
import { useTranslation } from 'react-i18next';
import privacy_policy_en from '@Assets/Html/PrivacyPolicy/privacy_policy_en'
import privacy_policy_vi from '@Assets/Html/PrivacyPolicy/privacy_policy_vi'

const PrivacyPolicyScreen = () => {
  const { t, i18n } = useTranslation();
  const { width } = useWindowDimensions();

  return (
    <View.Col>
      <Common.Header title={t('jh.termOfService')} actionLeft={goBack} />
      <ScrollView style={{ paddingHorizontal: 10, marginBottom: 40 }}>
        <Common.RenderHTMLJobHere
          contentWidth={width}
          source={{
            html:
              i18n.language === 'en' ? privacy_policy_en : privacy_policy_vi
          }}
          tagsStyles={{
            ul: {
              listStyleType: 'none',
              padding: 0,
              margin: 0
            }
          }}
        />
      </ScrollView>
    </View.Col>
  );
};

export default PrivacyPolicyScreen;
