import { AirData } from '@/types/AirData';

const API_URL = 'https://colabprod01.pace.edu/api/';

const lat_long_map = {
    Njord: {
        latitude: 41.1308,
        longitude: -73.810165,
    },
    Skadi: {
        latitude: 41.124355,
        longitude: -73.80812,
    },
};

function aqiFromPM(pm: number): number | '-' {
    if (isNaN(pm)) return '-';
    if (pm === undefined) return '-';
    if (pm < 0) return pm;
    if (pm > 1000) return '-';
    /*                                  AQI         RAW PM2.5
    Good                               0 - 50   |   0.0 – 12.0
    Moderate                          51 - 100  |  12.1 – 35.4
    Unhealthy for Sensitive Groups   101 – 150  |  35.5 – 55.4
    Unhealthy                        151 – 200  |  55.5 – 150.4
    Very Unhealthy                   201 – 300  |  150.5 – 250.4
    Hazardous                        301 – 400  |  250.5 – 350.4
    Hazardous                        401 – 500  |  350.5 – 500.4
    */
    if (pm > 350.5) {
        return calcAQI(pm, 500, 401, 500.4, 350.5); //Hazardous
    } else if (pm > 250.5) {
        return calcAQI(pm, 400, 301, 350.4, 250.5); //Hazardous
    } else if (pm > 150.5) {
        return calcAQI(pm, 300, 201, 250.4, 150.5); //Very Unhealthy
    } else if (pm > 55.5) {
        return calcAQI(pm, 200, 151, 150.4, 55.5); //Unhealthy
    } else if (pm > 35.5) {
        return calcAQI(pm, 150, 101, 55.4, 35.5); //Unhealthy for Sensitive Groups
    } else if (pm > 12.1) {
        return calcAQI(pm, 100, 51, 35.4, 12.1); //Moderate
    } else if (pm >= 0) {
        return calcAQI(pm, 50, 0, 12, 0); //Good
    } else {
        return '-';
    }
}

function calcAQI(Cp: number, Ih: number, Il: number, BPh: number, BPl: number) {
    let a = Ih - Il;
    let b = BPh - BPl;
    let c = Cp - BPl;
    return Math.round((a / b) * c + Il);
}

async function getSensorDatas() {
    try {
        const response = await fetch(`${API_URL}/aeolus/sensordata/`);
        const data = (await response.json()) as AirData[];

        // Required because:
        //   A) Our internal API doesn't return lat/long for each sensor.
        //      B) PurpleAir API doesn't return AQI, only PM2.5.
        for (const sensor of data) {
            if (sensor.station) {
                const lat_long = lat_long_map[sensor.station as keyof typeof lat_long_map];
                if (lat_long) {
                    sensor.location = lat_long;
                }
            }
            const pm2_5 = sensor.sensors['pm2.5_atm'];
            sensor.sensors.us_aqi = aqiFromPM(pm2_5);
        }
        return data;
    } catch (error) {
        console.log('Error fetching PurpleAir data:', error);
        return error;
    }
}

export async function GET() {
    const sensorData = await getSensorDatas();
    return Response.json(sensorData);
}
