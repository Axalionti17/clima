import { useState, useEffect } from 'react';
import { ForecastDay, CurrentWeather } from '../types/WeatherTypes';
import { fetchWeatherForecast, fetchCurrentWeather } from '../services/WeatherService';

const useWeather = () => {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        
        // Fetch forecast data
        const forecastData = await fetchWeatherForecast();
        setForecast(forecastData);
        
        // Fetch current weather
        const currentData = await fetchCurrentWeather();
        setCurrent({
          temp: currentData.main.temp,
          feelsLike: currentData.main.feels_like,
          humidity: currentData.main.humidity,
          windSpeed: currentData.wind.speed,
          pressure: currentData.main.pressure,
          condition: currentData.weather[0].description,
          conditionIcon: `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`,
          location: `${currentData.name}, ${currentData.sys.country}`
        });
        
        setError(null);
      } catch (err) {
        setError('No se pudo cargar el pronóstico del clima. Por favor, inténtelo nuevamente.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, []);

  // Function to refresh weather data manually
  const refreshWeather = async () => {
    loadWeatherData();
  };

  const loadWeatherData = async () => {
    try {
      setLoading(true);
      const forecastData = await fetchWeatherForecast();
      setForecast(forecastData);
      
      const currentData = await fetchCurrentWeather();
      setCurrent({
        temp: currentData.main.temp,
        feelsLike: currentData.main.feels_like,
        humidity: currentData.main.humidity,
        windSpeed: currentData.wind.speed,
        pressure: currentData.main.pressure,
        condition: currentData.weather[0].description,
        conditionIcon: `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`,
        location: `${currentData.name}, ${currentData.sys.country}`
      });
      
      setError(null);
    } catch (err) {
      setError('No se pudo cargar el pronóstico del clima. Por favor, inténtelo nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { forecast, current, loading, error, refreshWeather };
};

export default useWeather;