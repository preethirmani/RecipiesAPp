import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecipeCard from '../components/RecipeCard';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../index';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Favorites'>>();

  useEffect(() => {
    const loadFavorites = async () => {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    };
    loadFavorites();
  }, []);

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('RecipeDetails', { recipeId: item.idMeal })}
            >
              <RecipeCard recipe={item} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>No favorites yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
