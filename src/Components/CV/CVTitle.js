import React from 'react';
import { View, Text } from '@Components';

const CVTitle = ({ cvData, elementStyle }) => {
  const textStyle = elementStyle?.text ?? {};

  return (
    <View.Col style={{ marginBottom: 5 }}>
      <Text.BodyBold fontSize={18} secondary style={textStyle}>
        {cvData.name}
      </Text.BodyBold>
      <Text.BodyBold
        fontSize={8}
        secondary
        style={[{ fontStyle: 'italic' }, textStyle]}
      >
        {cvData.title}
      </Text.BodyBold>
    </View.Col>
  );
};

export default CVTitle;
