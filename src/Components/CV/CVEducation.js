import React from 'react';
import { View, Text, Icon } from '@Components';
import { useTranslation } from 'react-i18next';

const CVEducation = ({ cvData, elementStyle }) => {
  const { t } = useTranslation();
  const titleStyle = elementStyle?.title ?? {};
  const textStyle = elementStyle?.text ?? {};
  const iconStyle = elementStyle?.icon ?? {};

  return (
    <View.Col style={{ marginBottom: 5 }}>
      <Text.BodyBold fontSize={12} secondary style={[textStyle, titleStyle]}>
        {t('jh.education')}
      </Text.BodyBold>
      {cvData.map((education, index) => (
        <EducationItem
          key={index}
          education={education}
          textStyle={textStyle}
          iconStyle={iconStyle}
        />
      ))}
    </View.Col>
  );
};

const EducationItem = ({ education, textStyle, iconStyle }) => (
  <View.Col>
    <View.Row>
      <Icon.VectorIcon
        name="school"
        size={7}
        style={[{ marginRight: 3, marginTop: 4 }, iconStyle]}
      />
      <View.Row style={{ flexWrap: 'wrap' }}>
        <Text.BodyBold fontSize={10} secondary style={textStyle}>
          {education.schoolName}
        </Text.BodyBold>
        {!!education.year && (
          <Text.Body
            fontSize={9}
            secondary
            style={[
              { fontStyle: 'italic', marginTop: 2, marginLeft: 3 },
              textStyle
            ]}
          >
            ({education.year})
          </Text.Body>
        )}
      </View.Row>
    </View.Row>
    {!!education.major && (
      <Text.Body
        fontSize={9}
        secondary
        style={[{ fontStyle: 'italic', marginLeft: 10 }, textStyle]}
      >
        {education.major}
      </Text.Body>
    )}
  </View.Col>
);

export default CVEducation;
