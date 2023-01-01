import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { AppNavigation } from '@Navigation';
import SplashScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <AppNavigation />;
};

export default App;
