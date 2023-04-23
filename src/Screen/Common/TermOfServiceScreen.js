import React from 'react';
import { useWindowDimensions, ScrollView } from 'react-native';
import { View, Common } from '@Components';
import { goBack } from '@NavigationAction';
import { useTranslation } from 'react-i18next';
import term_of_service_en from '@Assets/Html/TermOfService/term_of_service_en';
import term_of_service_vi from '@Assets/Html/TermOfService/term_of_service_vi';

const TermOfServiceScreen = () => {
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
              i18n.language === 'en' ? term_of_service_en : term_of_service_vi
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

export default TermOfServiceScreen;
