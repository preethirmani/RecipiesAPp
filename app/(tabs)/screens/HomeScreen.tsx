import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RecipeCard from '../components/RecipeCard';
import { RootStackParamList } from '../navigation/StackNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function HomeScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
   const colorScheme = useColorScheme();


  useEffect(() => {
    const fetchRecipes = async () => {
      const recipePromises = Array.from({ length: 10 }, () =>
        fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(response => response.json())
      );

      // Wait for all promises to resolve
      const results = await Promise.all(recipePromises);

      // Map the results and merge them into a single array
      const fetchedRecipes = results.map(result => result.meals[0]);
      setRecipes(fetchedRecipes);
    };

    fetchRecipes();
  }, []);


  return (
    <View style={colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('RecipeDetails', { recipeId: item.idMeal })}
          >
            <RecipeCard recipe={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff', // Light background
  },
  darkContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000', // Dark background
  },
   image: {
    width: '100%',  // Takes up full width of the screen
    height: undefined,
  },

});

