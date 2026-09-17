export interface AirData {
    time: string;
    station: string;
    location: {
        latitude: number;
        longitude: number;
    };
    sensors: {
        humidity: number;
        'pm2.5_atm': number;
        'pm2.5_cf_1': number;
        pressure: number;
        temperature: number;
        us_aqi?: number | '-';
    };
}
