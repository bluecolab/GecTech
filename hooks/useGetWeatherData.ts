import { useQuery } from '@tanstack/react-query';

import { WeatherData } from '@/types/WeatherData';

const fetchWeatherData = async (): Promise<WeatherData[]> => {
  const response = await fetch('/api-proxy-service/bluecolab-weather');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useGetWeatherData = () => {
  return useQuery({
    queryKey: ['weatherData'],
    queryFn: fetchWeatherData,
    refetchInterval: 15 * 60 * 1000,
  });
};
