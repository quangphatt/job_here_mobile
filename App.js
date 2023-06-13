import './ignoreWarnings';
import React, { useEffect } from 'react';
import { AppNavigation } from '@Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import GlobalContextProvider from '@Global';
import { AuthProvider } from '@Config/Provider/AuthProvider';
import { Provider } from 'react-redux';
import { store, persistor } from '@Config/Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
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
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <NetInfo />
              <MagicModalPortal />
              <GlobalContextProvider>
                <AuthProvider>
                  <AppNavigation />
                </AuthProvider>
              </GlobalContextProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
