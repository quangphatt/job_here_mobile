import React from 'react';
import { Dimensions } from 'react-native';
import { View, Text } from '@Components';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const Loading = ({ placeholder = false, screen = false }) => {
  if (placeholder) {
    if (screen) {
      return (
        <View.Col
          style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <LottieView
            source={require('@Assets/Lottie/screen_placeholder.json')}
            autoPlay={true}
            loop
            style={{ width, flex: 1 }}
          />
        </View.Col>
      );
    }
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
  }

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
