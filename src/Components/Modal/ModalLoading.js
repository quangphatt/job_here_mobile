import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { magicModal } from 'react-native-magic-modal';
import AutoHeightImage from 'react-native-auto-height-image';
import { BlurView } from '@react-native-community/blur';
import logo_img from '@Assets/Images/launch_screen_no_bg.png';

const show = () => {
  magicModal.show(<ModalLoading />, {
    animationIn: 'fadeIn',
    animationOut: 'fadeOut',
    backdropColor: '#FFFFFF00'
  });
};

const hide = () => {
  magicModal.hide();
};

const ModalLoading = () => {
  let { width } = Dimensions.get('window');
  const [hideable, setHideable] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setHideable(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onBackPress = () => {
    if (hideable) {
      magicModal.hide();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onBackPress}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <BlurView blurType="dark" style={{ flex: 1 }} />
        <View style={{ position: 'absolute', left: 0, right: 0 }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16
            }}
          >
            <AutoHeightImage width={width / 1.5} source={logo_img} />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <LottieView
              source={require('@Assets/Lottie/loading.json')}
              autoPlay={true}
              loop
              style={{ width: 100, height: 100 }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default { show, hide };
