import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RecipesScreen from './RecipesScreen';
import RecipeCard from '../components/RecipeCard';

interface Recipe {
  idMeal : string;
  strMeal : string;
  strMealThumb : string;
}

type RootStackParamList = {
  HomeScreen: undefined;  // No parameters for HomeScreen
  RecipeDetails: { recipe: any };  // RecipeDetails expects a 'recipe' parameter
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen ({ navigation }: HomeScreenProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);


  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(response => response.json())
      .then(data => setRecipes(data.meals));
  }, []);



  return(
       <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('RecipeDetails', { recipe: item.idMeal })}
          >
            <RecipeCard recipe={item} />
          </TouchableOpacity>
        )}
      />
    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
