import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface RecipeCardProps {
  recipe: {
    strMeal: string;
    strMealThumb: string;
  };
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{recipe.strMeal}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
});
