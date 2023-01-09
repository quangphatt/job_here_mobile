import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '@Theme';

// https://oblador.github.io/react-native-vector-icons/ --> Ionicons

const IonIcon = ({ name, size, color }) => {
  return (
    <Ionicons
      name={name || 'football'}
      size={size || 16}
      color={color || theme.text_colors.secondary_text_color}
    />
  );
};

export default { IonIcon };
