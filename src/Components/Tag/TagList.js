import React from 'react';
import { View, Text } from '@Components';
import Theme from '@Theme';

const TagList = ({ tagData = [] }) => {
  return (
    <View.Row style={{ flexWrap: 'wrap' }}>
      {_.map(tagData, (item, index) => {
        if (!item.label) return null;
        return (
          <View.Col
            key={index}
            style={{
              backgroundColor: Theme.background_colors.item_background_color,
              borderRadius: 3,
              paddingHorizontal: 5,
              paddingBottom: 2,
              marginTop: 5,
              marginRight: 5
            }}
          >
            <Text.SubBody secondary>{item.label}</Text.SubBody>
          </View.Col>
        );
      })}
    </View.Row>
  );
};

export default TagList;
