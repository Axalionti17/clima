import { ForecastDay } from '../types/WeatherTypes';
import { formatDate, getDayOfWeek } from '../utils/dateUtils';

// API key for OpenWeather (should use environment variables for security)
const API_KEY = '758796674f678df3e1852b5ec53e104e';
const LOCATION = 'Mexico City'; // Can be made dynamic if needed

export const fetchWeatherForecast = async (): Promise<ForecastDay[]> => {
  try {
    // Get 5-day forecast data (3-hour intervals)
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${LOCATION}&appid=${API_KEY}&units=metric&lang=es`
    );

    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }

    const data = await response.json();
    console.log("📡 Respuesta de la API de pronóstico:", JSON.stringify(data, null, 2));

    // Group forecast data by day
    const forecastMap = new Map<string, ForecastDay>();
    
    // Process each 3-hour forecast and group by day
    data.list.forEach((item: any) => {
      const date = item.dt_txt.split(' ')[0]; // Extract date part from "YYYY-MM-DD HH:MM:SS"
      
      if (!forecastMap.has(date)) {
        // Initialize with first data point of the day
        forecastMap.set(date, {
          date,
          formattedDate: formatDate(date),
          dayOfWeek: getDayOfWeek(date),
          maxTemp: item.main.temp_max,
          minTemp: item.main.temp_min,
          rainChance: item.pop ? Math.round(item.pop * 100) : 0, // Probability of precipitation (0 to 1)
          condition: item.weather[0].description,
          conditionIcon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        });
      } else {
        // Update with more extreme values
        const existingForecast = forecastMap.get(date)!;
        existingForecast.maxTemp = Math.max(existingForecast.maxTemp, item.main.temp_max);
        existingForecast.minTemp = Math.min(existingForecast.minTemp, item.main.temp_min);
        existingForecast.rainChance = Math.max(existingForecast.rainChance, item.pop ? Math.round(item.pop * 100) : 0);
      }
    });

    // Convert map to array and sort by date
    const forecastDays = Array.from(forecastMap.values());
    forecastDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Limit to next 5 days
    return forecastDays.slice(0, 5);
  } catch (error: any) {
    console.error('❌ Error al obtener el pronóstico del clima:', error.message || error);
    
    // Return mock data instead of empty array to maintain UI functionality
    const today = new Date();
    return Array(5).fill(null).map((_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index);
      const dateStr = date.toISOString().split('T')[0];
      
      return {
        date: dateStr,
        formattedDate: formatDate(dateStr),
        dayOfWeek: getDayOfWeek(dateStr),
        maxTemp: 25,
        minTemp: 18,
        rainChance: 20,
        condition: 'Datos no disponibles',
        conditionIcon: 'https://openweathermap.org/img/wn/03d@2x.png',
      };
    });
  }
};

// Add function to get current weather
export const fetchCurrentWeather = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&appid=${API_KEY}&units=metric&lang=es`
    );

    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }

    return await response.json();
  } catch (error: any) {
    console.error('❌ Error al obtener el clima actual:', error.message || error);
    throw error;
  }
};