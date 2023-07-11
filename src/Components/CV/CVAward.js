import React from 'react';
import { View, Text, Icon } from '@Components';
import { useTranslation } from 'react-i18next';

const CVAward = ({ cvData }) => {
  const { t } = useTranslation();

  return (
    <View.Col style={{ marginBottom: 5 }}>
      <Text.BodyBold fontSize={12} secondary>
        {t('jh.award')}
      </Text.BodyBold>
      {cvData.map((award, index) => (
        <View.Row key={index} style={{ alignItems: 'center' }}>
          <Icon.VectorIcon name="ribbon" size={7} style={{ marginRight: 3 }} />
          <Text.Body fontSize={9} secondary>
            {award}
          </Text.Body>
        </View.Row>
      ))}
    </View.Col>
  );
};

export default CVAward;
