import React from 'react';
import { View, Text } from 'react-native';

const MainScreen = () => {
  return (
    <View>
      <Text style={{ color: 'red' }}>MainScreen</Text>
      {_.map([1, 2, 3, 4], (item, index) => (
        <Text key={index} style={{ color: '#000' }}>
          {item}
        </Text>
      ))}
    </View>
  );
};

export default MainScreen;
