import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LineWordGesture from '../components/LineWordGesture/LineWordGesture';
import CircleButtonsGesture from '../components/LineWordGesture/CircleButtonsGesture';
import MainScreen from '../components/MainScreen';
import LevelPassed from '../components/LineWordGesture/LevelPassed';
import LineHeader from './LineHeader';

const CrosswordStack = createNativeStackNavigator();

export default function CrosswordNavigate() {
  return (
    <CrosswordStack.Navigator
      initialRouteName="Player"
      screenOptions={{
        headerShown: false,
        // header: mainHeader,
      }}>
      <CrosswordStack.Screen
        name="MainScreen"
        component={MainScreen}
        // options={({navigation}) => ({
        //   headerTitleAlign: 'left',
        //   headerTitle: 'Play',
        //   header: () => <LineHeader navigation={navigation} goTo="" />,
        // })}
      />

      <CrosswordStack.Screen
        name="LevelPassed"
        component={LevelPassed}
        //   options={({navigation}) => ({
        //     headerTitleAlign: 'left',
        //     headerTitle: 'Play',
        //     header: () => <LineHeader navigation={navigation} goTo="" />,
        //   })}
      />

      {/* <CrosswordStack.Screen
        name="StartGame"
        component={StartGame}
        options={{
          headerTitleAlign: 'left',
          headerTitle: 'Play',
                 }}
      /> */}

      <CrosswordStack.Screen
        name="LineWordGesture"
        component={LineWordGesture}
        // options={({navigation}) => ({
        //   headerTitleAlign: 'left',
        //   headerTitle: 'Линия слов',
        //   header: () => (
        //     <LineHeader navigation={navigation} goTo="MainScreen" />
        //   ),
        // })}
      />
      <CrosswordStack.Screen
        name="CircleButtonsGesture"
        component={CircleButtonsGesture}
        options={{
          headerTitleAlign: 'left',
          headerTitle: 'Линия слов',
        }}
      />

      <CrosswordStack.Screen name="LineHeader" component={LineHeader} />
    </CrosswordStack.Navigator>
  );
}
