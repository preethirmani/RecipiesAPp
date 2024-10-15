import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import TabNavigator from './navigation/StackNavigator'; 
import { useColorScheme } from 'react-native';

export default function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer independent={true}
    theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TabNavigator />
    </NavigationContainer>
  );
}
