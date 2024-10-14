import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

interface Category {
  idCategory: string;
  strCategory: string;
}

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(response => response.json())
      .then(data => setCategories(data.categories));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text style={styles.categoryText}>{item.strCategory}</Text>
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
  categoryText: {
    fontSize: 18,
    padding: 15,
    backgroundColor: '#eee',
    marginVertical: 5,
    borderRadius: 5,
  },
});

