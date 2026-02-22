import { useQuery } from '@tanstack/react-query';

import { WaterData } from '@/types/WaterData';

const fetchWaterData = async (): Promise<WaterData[]> => {
  const response = await fetch('/api-proxy-service/bluecolab-water');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useGetWaterData = () => {
  return useQuery({
    queryKey: ['waterData'],
    queryFn: fetchWaterData,
    refetchInterval: 15 * 60 * 1000,
  });
};
