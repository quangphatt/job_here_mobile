import React from 'react';
import { View, Text } from '@Components';

const CVEducation = ({ cvData }) => {
  // console.log('-----cvData', cvData)
  // [
  //   {
  //     major: 'Business Administration',
  //     schoolName: 'Jobhere University',
  //     year: '2016 - 2022'
  //   }
  // ];
  return (
    <View.Col>
      <Text.Body secondary>CVEducation</Text.Body>
    </View.Col>
  );
};

export default CVEducation;
