import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '../scenes/dashboard';
import GamePlay from '../scenes/gamePlay';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Dashboard} />
        <Stack.Screen name="Game" component={GamePlay} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
