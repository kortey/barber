import React from 'react';
import { View, Text,Platform, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

const dark = Colors.dark;

// Mock data
const categories = ['All', 'Fades', 'Waves', 'Dreadlocks', 'Kids', 'Designs'];
const hairstyles = [
  { 
    id: '1', 
    name: 'Low Fade with Beard', 
    category: 'Fades',
    tags: ['Fade', 'Trending'],
    image: require('@/assets/images/react-logo.png') 
  },
  { 
    id: '2', 
    name: 'High Top Waves', 
    category: 'Waves',
    tags: ['Waves', 'Popular'],
    image: require('@/assets/images/react-logo.png') 
  },
  { 
    id: '3', 
    name: 'Dreadlock Maintenance', 
    category: 'Dreadlocks',
    tags: ['Dreads'],
    image: require('@/assets/images/react-logo.png') 
  },
  { 
    id: '4', 
    name: 'Kids Buzz Cut', 
    category: 'Kids',
    tags: ['Kids'],
    image: require('@/assets/images/react-logo.png') 
  },
  { 
    id: '5', 
    name: 'Design Fade', 
    category: 'Designs',
    tags: ['Design', 'Fade'],
    image: require('@/assets/images/react-logo.png') 
  },
  { 
    id: '6', 
    name: 'Taper Fade', 
    category: 'Fades',
    tags: ['Fade'],
    image: require('@/assets/images/react-logo.png') 
  },
];

export default function GalleryScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredHairstyles = hairstyles.filter(style => {
    const matchesCategory = selectedCategory === 'All' || style.category === selectedCategory;
    const matchesSearch = style.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Hairstyle Gallery</Text>
          <Text style={styles.subtitle}>Browse styles and get inspired</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search hairstyles..."
            placeholderTextColor={dark.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>✂️</Text>
          </TouchableOpacity>
        </View>

        {/* Category Tabs */}
        <View style={styles.categoriesWrapper}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryTab,
                  selectedCategory === category && styles.selectedCategoryTab
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
       
        {/* Hairstyle Grid */}
        <FlatList
          style={styles.hairstyleList}
          data={filteredHairstyles}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.hairstyleCard}
              onPress={() => router.push(`/hairstyle/${item.id}`)}
            >
              <Image source={item.image} style={styles.hairstyleImage} />
              <View style={styles.hairstyleInfo}>
                <Text style={styles.hairstyleName}>{item.name}</Text>
                <View style={styles.tagsContainer}>
                  {item.tags.map(tag => (
                    <Text key={tag} style={styles.tag}>{tag}</Text>
                  ))}
                </View>
              </View>
              <TouchableOpacity style={styles.favoriteButton}>
                <Text style={styles.favoriteIcon}>❤️</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.gridContainer}
          ListHeaderComponent={<View style={{ height: 20 }} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: dark.background,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    paddingBottom: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: dark.background,
  },
  header: {
    marginBottom: 20,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: dark.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: dark.textSecondary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: dark.cardSurface,
    borderRadius: 20,
    padding: 15,
    color: dark.text,
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: dark.primary,
    borderRadius: 20,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    fontSize: 18,
  },
  categoriesContainer: {
    paddingBottom: 15,
    marginBottom: 15,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: dark.cardSurface,
  },
  selectedCategoryTab: {
    backgroundColor: dark.primary,
  },
  categoryText: {
    color: dark.text,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: dark.text,
    fontWeight: 'bold',
  },
  gridContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  hairstyleCard: {
    width: '48%',
    backgroundColor: dark.cardSurface,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
  },
  hairstyleImage: {
    width: '100%',
    height: 150,
  },
  hairstyleInfo: {
    padding: 12,
  },
  hairstyleName: {
    fontSize: 14,
    fontWeight: '600',
    color: dark.text,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    fontSize: 12,
    color: dark.accentNeon,
    backgroundColor: 'rgba(76, 201, 240, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 6,
  },
  favoriteIcon: {
    fontSize: 16,
  },
});
