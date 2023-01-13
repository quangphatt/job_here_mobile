import React, { useEffect } from 'react';
import { AppNavigation } from '@Navigation';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import GlobalContextProvider from '@Global';
import { MagicModalPortal } from 'react-native-magic-modal';

import theme from '@Theme';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <MagicModalPortal />
          <GlobalContextProvider>
            <AppNavigation />
          </GlobalContextProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
