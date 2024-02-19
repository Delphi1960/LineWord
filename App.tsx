//App.js
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';

import {ThemeProvider} from '@rneui/themed';
import CrossNavigate from './src/navigation/CrossNavigate';

function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <CrossNavigate />
        </SafeAreaProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
