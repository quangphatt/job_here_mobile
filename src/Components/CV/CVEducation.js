import React from 'react';
import { View, Text } from '@Components';
import { useTranslation } from 'react-i18next';

const CVEducation = ({ cvData }) => {
  const { t } = useTranslation();
  // [
  //   {
  //     major: 'Business Administration',
  //     schoolName: 'Jobhere University',
  //     year: '2016 - 2022'
  //   }
  // ];
  return (
    <View.Col style={{ marginBottom: 5 }}>
      <Text.BodyBold fontSize={12} secondary>
        {t('jh.education')}
      </Text.BodyBold>
      {cvData.map((education, index) => (
        <EducationItem key={index} education={education} />
      ))}
    </View.Col>
  );
};

const EducationItem = ({ education }) => (
  <View.Col>
    <View.Row style={{ alignItems: 'center' }}>
      <Icon.VectorIcon name="school" size={7} style={{ marginRight: 3 }} />
      <Text.Body secondary>{education.schoolName}</Text.Body>
      {!!education.year && (
        <Text.Body secondary style={{ fontStyle: 'italic' }}>
          {' '}
          ({education.year})
        </Text.Body>
      )}
    </View.Row>
    {!!education.major && <Text.Body secondary>{education.major}</Text.Body>}
  </View.Col>
);

export default CVEducation;
