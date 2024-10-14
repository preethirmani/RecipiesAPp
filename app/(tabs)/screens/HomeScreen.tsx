import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
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

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(response => response.json())
      .then(data => setRecipes([data.meals[0]]));
  }, []);

  return (
    <View style={styles.container}>
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
  container: {
    flex: 1,
    padding: 10,
  },
});
