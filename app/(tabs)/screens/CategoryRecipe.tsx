import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import RecipeCard from '../components/RecipeCard';  
import { RootStackParamList } from '../navigation/StackNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type CategoryRecipeRouteProp = RouteProp<RootStackParamList, 'CategoryRecipes'>;

export default function CategoryRecipe() {
  const [recipes, setRecipes] = useState<any[]>([]);
   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<CategoryRecipeRouteProp>();
  const { category } = route.params;

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(response => response.json())
      .then(data => setRecipes(data.meals));
  }, [category]);

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity 
          onPress={() => navigation.navigate('RecipeDetails', { recipeId: item.idMeal })}>
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
