import React from 'react';
import { View, Text } from '@Components';

const CVContact = ({ cvData }) => {
  // console.log('----cvData', cvData);
  // {"dateOfBirth": "2022-12-12", "email": "email@gmail.com", "phone": "0909123123"}
  return (
    <View.Col>
      <Text.Body secondary>CVContact</Text.Body>
    </View.Col>
  );
};

export default CVContact;
