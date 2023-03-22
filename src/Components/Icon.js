import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '@Theme';

// https://oblador.github.io/react-native-vector-icons/ --> Ionicons

const VectorIcon = ({
  name,
  size,
  color,
  style = {},
  type = 'Ionicons',
  primary
}) => {
  const iconProps = {
    name,
    size: size || 16,
    color: primary
      ? theme.text_colors.primary_text_color
      : color || theme.text_colors.secondary_text_color,
    style
  };

  if (type === 'MaterialCommunityIcons')
    return <MaterialCommunityIcons {...iconProps} />;
  else return <Ionicons {...iconProps} />;
};

export default { VectorIcon };
