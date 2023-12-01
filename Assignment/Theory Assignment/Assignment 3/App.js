import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from './RegistrationScreen';
import LoginScreen from './LoginScreen';
import CVFormScreen from './CVFormScreen';
import CVDisplayScreen from './CVDisplayScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CVForm" component={CVFormScreen} />
        <Stack.Screen name="CVDisplay" component={CVDisplayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;





