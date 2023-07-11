import React from 'react';
import { View, Text, Icon } from '@Components';
import { useTranslation } from 'react-i18next';

const CVExperience = ({ cvData, elementStyle }) => {
  const { t } = useTranslation();
  const titleStyle = elementStyle?.title ?? {};
  const textStyle = elementStyle?.text ?? {};
  const iconStyle = elementStyle?.icon ?? {};
  // [
  //   {
  //     companyName: 'ABC Company',
  //     description:
  //       'Support a group of 20 large customers bringing in revenue of 5-10 billion per year for the company. Assess customer needs based on company goals, market supply and demand.',
  //     timeWork: '08/2021 - 08/2022',
  //     title: 'Dev Quèn'
  //   },
  //   {
  //     companyName: 'BCD Company',
  //     description:
  //       "Take care of 500 old customers, develop 200 new customers. Consulting 1000+ customers about the company's products and services",
  //     timeWork: '08/2022 - 08/2023',
  //     title: 'Dev Pro'
  //   }
  // ];
  return (
    <View.Col style={{ marginBottom: 3 }}>
      <Text.BodyBold fontSize={12} secondary style={[textStyle, titleStyle]}>
        {t('jh.experience')}
      </Text.BodyBold>
      {cvData.map((experience, index) => (
        <ExperienceItem
          key={index}
          experience={experience}
          textStyle={textStyle}
          iconStyle={iconStyle}
        />
      ))}
    </View.Col>
  );
};

const ExperienceItem = ({ experience, textStyle, iconStyle }) => (
  <View.Col style={{ marginBottom: 2 }}>
    <View.Row>
      <Icon.VectorIcon
        name="briefcase"
        size={7}
        style={[{ marginRight: 3, marginTop: 4 }, iconStyle]}
      />
      <View.Row style={{ flexWrap: 'wrap' }}>
        <Text.BodyBold fontSize={9} secondary style={textStyle}>
          {experience.companyName}
        </Text.BodyBold>
        <Text.Body
          fontSize={9}
          secondary
          style={[
            { fontStyle: 'italic', marginLeft: 3, marginTop: 2 },
            textStyle
          ]}
        >
          ({experience.timeWork})
        </Text.Body>
      </View.Row>
    </View.Row>
    <Text.BodyBold
      fontSize={8}
      secondary
      style={[{ fontStyle: 'italic' }, textStyle]}
    >
      {experience.title}
    </Text.BodyBold>
    <Text.Body
      fontSize={9}
      secondary
      style={[{ textAlign: 'justify' }, textStyle]}
    >
      {experience.description}
    </Text.Body>
  </View.Col>
);

export default CVExperience;
