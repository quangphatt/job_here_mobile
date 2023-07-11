import React from 'react';
import { View, Text, Icon } from '@Components';
import { useTranslation } from 'react-i18next';

const CVExperience = ({ cvData }) => {
  const { t } = useTranslation();
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
      <Text.BodyBold fontSize={12} secondary>
        {t('jh.experience')}
      </Text.BodyBold>
      {cvData.map((experience, index) => (
        <ExperienceItem key={index} experience={experience} />
      ))}
    </View.Col>
  );
};

const ExperienceItem = ({ experience }) => (
  <View.Col style={{ marginBottom: 2 }}>
    <View.Row>
      <Icon.VectorIcon name="briefcase" size={7} style={{ marginRight: 3 }} />
      <Text.Body secondary>{experience.companyName}</Text.Body>
      <Text.Body secondary style={{ fontStyle: 'italic', marginLeft: 3 }}>
        {experience.timeWork}
      </Text.Body>
    </View.Row>
    <Text.Body secondary style={{ fontStyle: 'italic' }}>
      {experience.title}
    </Text.Body>
    <Text.Body secondary style={{ textAlign: 'justify' }}>
      {experience.description}
    </Text.Body>
  </View.Col>
);

export default CVExperience;
