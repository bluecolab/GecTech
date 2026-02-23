export interface AirData {
    sensor_index: number;
    last_seen: number;
    name: string;
    latitude: number;
    longitude: number;
    humidity: number;
    temperature: number;
    pressure: number;
    'pm2.5_atm': number;
    stats: {
        'pm2.5': number;
        'pm2.5_10minute': number;
        time_stamp: number;
    };
    usAQI: number; // as estimated by last data point
    purpleAirMapEstimate: number; // as seen on purpleair map
}
