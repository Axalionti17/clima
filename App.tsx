import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import WeatherCard from './app/componentes/WeatherCard';
import useWeather from './app/hooks/useWeather';

export default function App() {
  const { forecast, loading, error } = useWeather();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando pronóstico del clima...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pronóstico a 5 días</Text>
      </View>
      <FlatList
        data={forecast}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => <WeatherCard forecast={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
  },
  header: {
    padding: 16,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    width: '100%',
    paddingTop: 50, // Para dar espacio para la barra de estado
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  listContainer: {
    padding: 12,
  },
});