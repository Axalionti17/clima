export interface ForecastDay {
  date: string;
  formattedDate: string;
  dayOfWeek: string;
  maxTemp: number;
  minTemp: number;
  rainChance: number;
  condition: string;
  conditionIcon: string;
}

export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  condition: string;
  conditionIcon: string;
  location: string;
}