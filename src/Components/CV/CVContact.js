import React from 'react';
import { View, Text, Icon } from '@Components';

const CVContact = ({ cvData }) => {
  // {"dateOfBirth": "2022-12-12", "email": "email@gmail.com", "phone": "0909123123"}
  return (
    <View.Col>
      <ContactItem icon="mail" data={cvData.email} />
      <ContactItem icon="call" data={cvData.phone} />
      <ContactItem icon="calendar" data={cvData.dateOfBirth} />
    </View.Col>
  );
};

const ContactItem = ({ icon, data }) => (
  <View.Row style={{ marginBottom: 5 }}>
    <Icon.VectorIcon name={icon} size={7} style={{ marginRight: 3 }} />
    <Text.Body secondary>{data}</Text.Body>
  </View.Row>
);

export default CVContact;
