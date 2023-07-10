import React from 'react';
import { View, Image } from '@Components';
import avatar_img from '@Assets/Images/user.png';

const CVImage = ({ cvData }) => {
  const avatar = cvData ? { uri: cvData } : avatar_img;

  return (
    <View.Col style={{ marginBottom: 5 }}>
      <Image.ImageCircle source={avatar} size={100} style={{ marginTop: 6 }} />
    </View.Col>
  );
};

export default CVImage;
