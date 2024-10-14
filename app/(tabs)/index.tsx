import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/StackNavigator'; // Adjust the import path if necessary

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <TabNavigator />
    </NavigationContainer>
  );
}
