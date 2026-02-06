
import { useQuery } from '@tanstack/react-query';
import { AirData } from '@/types/AirData';

const fetchAirData = async (): Promise<AirData[]> => {
    const response = await fetch('/api-proxy-service/bluecolab-air');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const useGetAirData = () => {
    return useQuery({
        queryKey: ['airData'],
        queryFn: fetchAirData,
    });
};