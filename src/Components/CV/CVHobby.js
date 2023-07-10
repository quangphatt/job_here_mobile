import React from 'react';
import { View, Text } from '@Components';
import { useTranslation } from 'react-i18next';

const CVHobby = ({ cvData }) => {
  const { t } = useTranslation();

  return (
    <View.Col style={{ marginBottom: 5 }}>
      <Text.BodyBold fontSize={12} secondary>
        {t('jh.hobby')}
      </Text.BodyBold>
      <Text.Body fontSize={9} secondary style={{ textAlign: 'justify' }}>
        {cvData}
      </Text.Body>
    </View.Col>
  );
};

export default CVHobby;
