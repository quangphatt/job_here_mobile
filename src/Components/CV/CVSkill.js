import React from 'react';
import { View, Text } from '@Components';
import { useTranslation } from 'react-i18next';
import Theme from '@Theme';

const CVSkill = ({ cvData }) => {
  const { t } = useTranslation();

  return (
    <View.Col style={{ marginBottom: 5 }}>
      <Text.BodyBold fontSize={12} secondary>
        {t('jh.skill')}
      </Text.BodyBold>
      {cvData.map((skill, index) => (
        <View.Row key={index} style={{ alignItems: 'center' }}>
          <View.Col
            style={{
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: Theme.text_colors.secondary_text_color,
              marginRight: 3
            }}
          />
          <Text.Body fontSize={9} secondary>
            {skill}
          </Text.Body>
        </View.Row>
      ))}
    </View.Col>
  );
};

export default CVSkill;
