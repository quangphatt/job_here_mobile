import React from 'react';
import { useWindowDimensions, ScrollView } from 'react-native';
import { View, Common } from '@Components';
import { goBack } from '@NavigationAction';
import { useTranslation } from 'react-i18next';
import about_us_en from '@Assets/Html/AboutUs/about_us_en';
import about_us_vi from '@Assets/Html/AboutUs/about_us_vi';

const AboutUsScreen = () => {
  const { t, i18n } = useTranslation();
  const { width } = useWindowDimensions();

  return (
    <View.Col>
      <Common.Header title={t('jh.aboutUs')} actionLeft={goBack} />
      <ScrollView style={{ paddingHorizontal: 10, marginBottom: 40 }}>
        <Common.RenderHTMLJobHere
          contentWidth={width}
          source={{
            html: i18n.language === 'en' ? about_us_en : about_us_vi
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

export default AboutUsScreen;
