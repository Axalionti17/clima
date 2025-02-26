import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ForecastDay } from '../types/WeatherTypes';

interface WeatherCardProps {
  forecast: ForecastDay;
}

const getBackgroundColor = (maxTemp: number): string => {
  if (maxTemp > 30) {
    return '#FFA500'; // Naranja
  } else if (maxTemp >= 21 && maxTemp <= 30) {
    return '#FFFF00'; // Amarillo
  } else {
    return '#87CEFA'; // Azul para temperaturas < 20°C
  }
};

const WeatherCard: React.FC<WeatherCardProps> = ({ forecast }) => {
  const backgroundColor = getBackgroundColor(forecast.maxTemp);

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.dateContainer}>
        <Text style={styles.dayText}>{forecast.dayOfWeek}</Text>
        <Text style={styles.dateText}>{forecast.formattedDate}</Text>
      </View>
      
      <View style={styles.weatherContainer}>
        <View style={styles.temperatureContainer}>
          <Text style={styles.maxTemp}>{Math.round(forecast.maxTemp)}°C</Text>
          <Text style={styles.minTemp}>{Math.round(forecast.minTemp)}°C</Text>
        </View>
        
        <View style={styles.conditionContainer}>
          <Image
            source={{ uri: forecast.conditionIcon }}
            style={styles.conditionIcon}
          />
          <Text style={styles.conditionText}>{forecast.condition}</Text>
        </View>
      </View>
      
      <View style={styles.rainContainer}>
        <Text style={styles.rainText}>Prob. lluvia: {forecast.rainChance}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dateContainer: {
    marginBottom: 10,
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  temperatureContainer: {
    flexDirection: 'column',
  },
  maxTemp: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f44336',
  },
  minTemp: {
    fontSize: 18,
    color: '#2196F3',
  },
  conditionContainer: {
    alignItems: 'center',
  },
  conditionIcon: {
    width: 50,
    height: 50,
  },
  conditionText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginTop: 4,
  },
  rainContainer: {
    marginTop: 4,
  },
  rainText: {
    fontSize: 14,
    color: '#2196F3',
  },
});

export default WeatherCard;