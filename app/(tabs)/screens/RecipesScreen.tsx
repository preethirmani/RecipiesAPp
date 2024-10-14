import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

type RecipeDetailsScreenRouteProp = RouteProp<RootStackParamList, 'RecipeDetails'>;

interface Props {
  route: RecipeDetailsScreenRouteProp;
}

export default function RecipesScreen({ route }: Props) {
  const [recipe, setRecipe] = useState<any>(null);
  const { recipeId } = route.params;
  console.log('recipeId',recipeId);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
      .then(response => response.json())
      .then(data => setRecipe(data.meals[0]));
  }, [recipeId]);

  if (!recipe) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{recipe.strMeal}</Text>
      <Text style={styles.subtitle}>Ingredients</Text>
      <View>
        {Object.keys(recipe)
          .filter(key => key.startsWith('strIngredient') && recipe[key])
          .map((key, index) => (
            <Text key={index}>{recipe[key]}</Text>
          ))}
      </View>
      <Text style={styles.subtitle}>Instructions</Text>
      <Text>{recipe.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
