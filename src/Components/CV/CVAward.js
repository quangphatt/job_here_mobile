import React from 'react';
import { View, Text, Icon } from '@Components';
import { useTranslation } from 'react-i18next';

const CVAward = ({ cvData, elementStyle }) => {
  const { t } = useTranslation();
  const titleStyle = elementStyle?.title ?? {};
  const textStyle = elementStyle?.text ?? {};
  const iconStyle = elementStyle?.icon ?? {};

  return (
    <View.Col style={{ marginBottom: 5 }}>
      <Text.BodyBold fontSize={12} secondary style={[textStyle, titleStyle]}>
        {t('jh.award')}
      </Text.BodyBold>
      {cvData.map((award, index) => (
        <View.Row key={index} style={[textStyle]}>
          <Icon.VectorIcon
            name="ribbon"
            size={7}
            style={[{ marginRight: 3, marginTop: 5 }, iconStyle]}
          />
          <Text.Body fontSize={9} secondary style={textStyle}>
            {award}
          </Text.Body>
        </View.Row>
      ))}
    </View.Col>
  );
};

export default CVAward;
