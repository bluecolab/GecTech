import { WaterData } from '@/types/WaterData';
import { WeatherData } from '@/types/WeatherData';

export function extractAllDataPoints(data: WaterData[] | WeatherData[], key: string) {
    if (data.length === 0) {
        return null;
    }

    console.log('Extracting all data points for key:', key);

    return data.map((entry) => {
        const timestamp = entry.timestamp;
        const sensors = 'sensors' in entry ? entry.sensors : null;
        // console.log('Extracting data point:', { timestamp, sensors, key });
        const value = sensors && key in sensors ? sensors[key as keyof typeof sensors] : null;
        return { timestamp, value };
    });
}
