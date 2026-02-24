import { useQuery } from '@tanstack/react-query';
import { AirData } from '@/types/AirData';

const fetchAirData = async (): Promise<AirData[]> => {
    let localStored = localStorage.getItem('apiKey');

    if (!localStored) {
        localStored = prompt('Enter GEC API Key - NOT PurpleAir API key:') || '';
        localStorage.setItem('apiKey', localStored);
        console.log('API Key is shared internally, ask Kenji if you need it');
    }

    const response = await fetch('/api-proxy-service/bluecolab-air', {
        headers: {
            'x-api-key': localStored || '',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const useGetAirData = () => {
    return useQuery({
        queryKey: ['airData'],
        queryFn: fetchAirData,
        refetchInterval: 15 * 60 * 1000,
    });
};
