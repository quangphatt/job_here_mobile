import React from 'react';
import { View, Text } from '@Components';
import LottieView from 'lottie-react-native';

const Loading = ({ placeholder = false }) => {
  if (placeholder)
    return (
      <View.Col
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10
        }}
      >
        <LottieView
          source={require('@Assets/Lottie/item_placeholder.json')}
          autoPlay={true}
          loop
          style={{ width: 100, height: 100 }}
        />
      </View.Col>
    );

  return (
    <View.Col style={{ alignItems: 'center', justifyContent: 'center' }}>
      <LottieView
        source={require('@Assets/Lottie/loading.json')}
        autoPlay={true}
        loop
        style={{ width: 100, height: 100 }}
      />
    </View.Col>
  );
};

export default Loading;
