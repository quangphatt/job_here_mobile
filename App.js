import React from 'react';
import { AppNavigation } from '@Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import GlobalContextProvider from '@Global';
import { MagicModalPortal } from 'react-native-magic-modal';
import NetInfo from '@Config/NetInfo';
import '@Config/Translate/i18n';

import theme from '@Theme';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <NetInfo />
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
