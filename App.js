import React, { useEffect } from 'react';
import { AppNavigation } from '@Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import GlobalContextProvider from '@Global';
import { Provider } from 'react-redux';
import { store } from '@Config/Redux/store';
import { MagicModalPortal } from 'react-native-magic-modal';
import NetInfo from '@Config/NetInfo';
import '@Config/Translate/i18n';
import RNSplashScreen from 'react-native-splash-screen';

import theme from '@Theme';

const App = () => {
  useEffect(() => {
    RNSplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <NetInfo />
            <MagicModalPortal />
            <GlobalContextProvider>
              <AppNavigation />
            </GlobalContextProvider>
          </ThemeProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
