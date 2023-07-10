import React from 'react';
import { View, Text } from '@Components';

const CVExperience = ({ cvData }) => {
  // console.log('----cvData', cvData);
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
    <View.Col>
      <Text.Body secondary>CVExperience</Text.Body>
    </View.Col>
  );
};

export default CVExperience;
