import React from 'react';
import {Provider as StateProvider} from 'react-redux';

import ErrorBoundary from 'react-native-error-boundary';
import store from './src/store';
import RootNavigation from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemeProvider from 'providers/ThemeProvider/ThemeProvider';
import ToastMessage from 'components/ToastMessage';

const App = () => {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StateProvider store={store}>
          <ThemeProvider>
            <ToastMessage />
            <RootNavigation />
          </ThemeProvider>
        </StateProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};

export default App;
