import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LineWordGesture from '../components/LineWordGesture/LineWordGesture';
import StartGame from './StartGame';

const CrosswordStack = createNativeStackNavigator();

export default function CrossNavigate() {
  return (
    <CrosswordStack.Navigator
      screenOptions={{
        headerShown: true,
        // header: mainHeader,
      }}>
      <CrosswordStack.Screen
        name="StartGame"
        component={StartGame}
        options={{
          headerTitleAlign: 'left',
          headerTitle: 'Play',
        }}
      />

      <CrosswordStack.Screen
        name="LineWordGesture"
        component={LineWordGesture}
        options={{
          headerTitleAlign: 'left',
          headerTitle: 'Линия слов',
        }}
      />
    </CrosswordStack.Navigator>
  );
}
