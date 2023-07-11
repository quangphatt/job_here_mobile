import React from 'react';
import { View, Text } from '@Components';
import { useTranslation } from 'react-i18next';

const CVHobby = ({ cvData, elementStyle }) => {
  const { t } = useTranslation();
  const titleStyle = elementStyle?.title ?? {};
  const textStyle = elementStyle?.text ?? {};

  return (
    <View.Col style={{ marginBottom: 5 }}>
      <Text.BodyBold fontSize={12} secondary style={[textStyle, titleStyle]}>
        {t('jh.hobby')}
      </Text.BodyBold>
      <Text.Body
        fontSize={9}
        secondary
        style={[{ textAlign: 'justify' }, textStyle]}
      >
        {cvData}
      </Text.Body>
    </View.Col>
  );
};

export default CVHobby;
