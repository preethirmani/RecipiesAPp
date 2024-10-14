import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RecipesScreen from '../screens/RecipesScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryRecipe from '../screens/CategoryRecipe';

// Define the types for each screen in the stack
export type RootStackParamList = {
  Home: undefined;
  RecipeDetails: { recipeId: string };
  Favorites: undefined;
  Categories: undefined;
  CategoryRecipes: { category: string }; 
};

// Create stack and tab navigators
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Stack navigator for recipe details
function RecipeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} options={{headerShown : false}} />
      <Stack.Screen name='RecipeDetails' component={RecipesScreen} />
      <Stack.Screen name='Categories' component={CategoriesScreen}/>
      <Stack.Screen name='CategoryRecipes' component={CategoryRecipe}/>
    </Stack.Navigator>
  );
}

// Bottom tab navigator for switching between main screens
export default function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={RecipeStackNavigator} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
    </Tab.Navigator>
  );
}
