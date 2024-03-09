import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LineWordGesture from '../components/LineWordGesture/LineWordGesture';
import MainScreen from '../components/MainScreen';
import LevelPassed from '../components/LineWordGesture/LevelPassed';
import LineHeader from './LineHeader';
import GoogleInterstitial from '../components/reklama/GoogleInterstitial';
import GetBonus from '../components/supporting/GetBonus';

const CrosswordStack = createNativeStackNavigator();

export default function CrosswordNavigate() {
  return (
    <CrosswordStack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{
        headerShown: false,
        // header: mainHeader,
      }}>
      {/* <CrosswordStack.Screen name="StartScreen" component={StartScreen} /> */}
      <CrosswordStack.Screen name="MainScreen" component={MainScreen} />

      <CrosswordStack.Screen name="LevelPassed" component={LevelPassed} />
      <CrosswordStack.Screen
        name="GoogleInterstitial"
        component={GoogleInterstitial}
      />

      <CrosswordStack.Screen
        name="LineWordGesture"
        component={LineWordGesture}
      />

      <CrosswordStack.Screen name="LineHeader" component={LineHeader} />

      <CrosswordStack.Screen name="GetBonus" component={GetBonus} />
    </CrosswordStack.Navigator>
  );
}
