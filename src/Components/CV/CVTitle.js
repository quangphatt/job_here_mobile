import React from 'react';
import { View, Text } from '@Components';

const CVTitle = ({ cvData }) => {
  return (
    <View.Col style={{ marginBottom: 5 }}>
      <Text.BodyBold fontSize={18} secondary>
        {cvData.name}
      </Text.BodyBold>
      <Text.BodyBold fontSize={11} secondary style={{ fontStyle: 'italic' }}>
        {cvData.title}
      </Text.BodyBold>
    </View.Col>
  );
};

export default CVTitle;
