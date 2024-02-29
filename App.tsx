//App.js
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';

import {ThemeProvider} from '@rneui/themed';
import CrosswordNavigate from './src/navigation/CrosswordNavigate';

function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <CrosswordNavigate />
        </SafeAreaProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
