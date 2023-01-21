import React from 'react';
import FastImage from 'react-native-fast-image';
import View from './View';
import theme from '@Theme';
import default_img from '@Assets/Images/avatar_jobhere.png';

const Image = ({ source, size = 60, style = {} }) => {
  return (
    <View.Row
      style={{
        width: size,
        backgroundColor: theme.background_colors.item_background_color,
        overflow: 'hidden',
        ...style
      }}
    >
      <FastImage
        source={source}
        defaultSource={default_img}
        style={{ flex: 1 }}
      />
    </View.Row>
  );
};

const ImageCircle = ({ source, size = 24, style = {} }) => {
  return (
    <View.Row
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: theme.background_colors.item_background_color,
        overflow: 'hidden',
        ...style
      }}
    >
      <FastImage
        source={source}
        defaultSource={default_img}
        style={{ flex: 1 }}
      />
    </View.Row>
  );
};

const ImageSquare = ({ source, size = 24, style = {} }) => {
  return (
    <View.Row
      style={{
        width: size,
        height: size,
        borderRadius: size / 6,
        backgroundColor: theme.background_colors.item_background_color,
        overflow: 'hidden',
        ...style
      }}
    >
      <FastImage
        source={source}
        defaultSource={default_img}
        style={{ flex: 1 }}
      />
    </View.Row>
  );
};

export default { Image, ImageCircle, ImageSquare };
