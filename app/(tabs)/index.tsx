import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import RecipesScreen from "./screens/RecipesScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import CategoriesScreen from "./screens/CategoriesScreen";



export type RootStackParamList = {
  HomeScreen : undefined;
  RecipeDetails : {recipeId : string};
  Favorites: undefined;
  Categories: undefined;


}

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="RecipeDetails" component={RecipesScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
