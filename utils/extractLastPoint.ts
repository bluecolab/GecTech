import { WaterData } from '@/types/WaterData';
import { WeatherData } from '@/types/WeatherData';

export function extractLastPoint(data: WaterData[] | WeatherData[]) {
    if (data.length === 0) {
        return null;
    }
    const lastEntry = data[data.length - 1];
    const timestamp = lastEntry.timestamp;
    const sensors = 'sensors' in lastEntry ? lastEntry.sensors : null;
    return { timestamp, ...sensors };
}
