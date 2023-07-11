import React from 'react';
import { View, Text, Icon } from '@Components';
import { useTranslation } from 'react-i18next';

const CVSkill = ({ cvData, elementStyle }) => {
  const { t } = useTranslation();
  const titleStyle = elementStyle?.title ?? {};
  const textStyle = elementStyle?.text ?? {};
  const iconStyle = elementStyle?.icon ?? {};

  return (
    <View.Col style={{ marginBottom: 5 }}>
      <Text.BodyBold fontSize={12} secondary style={[textStyle, titleStyle]}>
        {t('jh.skill')}
      </Text.BodyBold>
      {cvData.map((skill, index) => (
        <View.Row key={index}>
          <Icon.VectorIcon
            name="ellipse"
            size={7}
            style={[{ marginRight: 3, marginTop: 4 }, iconStyle]}
          />
          <Text.Body fontSize={9} secondary style={textStyle}>
            {skill}
          </Text.Body>
        </View.Row>
      ))}
    </View.Col>
  );
};

export default CVSkill;
