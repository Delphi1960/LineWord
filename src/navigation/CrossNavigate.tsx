import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LineWordGesture from '../components/LineWordGesture/LineWordGesture';
import StartGame from './StartGame';
import CircleButtonsGesture from '../components/LineWordGesture/CircleButtonsGesture';

const CrosswordStack = createNativeStackNavigator();

export default function CrossNavigate() {
  return (
    <CrosswordStack.Navigator
      screenOptions={{
        headerShown: false,
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
      <CrosswordStack.Screen
        name="CircleButtonsGesture"
        component={CircleButtonsGesture}
        options={{
          headerTitleAlign: 'left',
          headerTitle: 'Линия слов',
        }}
      />
    </CrosswordStack.Navigator>
  );
}
