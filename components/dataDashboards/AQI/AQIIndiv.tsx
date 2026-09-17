import { View, Text, useColorScheme } from 'react-native';

import { useGetAQIColor } from '@/hooks/useGetAQIColor';
import { AirData } from '@/types/AirData';
import Gauge from '@/components/graphs/Guage';
import Map from '@/components/graphs/Map';

export default function AQIIndiv({
    airData,
    width,
    aqiOnly,
}: {
    airData: AirData;
    width: number;
    aqiOnly?: boolean;
}) {
    const { getAQIColor, getAQIMessage } = useGetAQIColor();
    const isDark = useColorScheme() === 'dark';

    const usAQI =
        airData.sensors.us_aqi && typeof airData.sensors.us_aqi === 'number'
            ? airData.sensors.us_aqi
            : null;

    const aqiColor = usAQI ? getAQIColor(usAQI) : '#E5E7EB';
    const aqiMessage = usAQI ? getAQIMessage(usAQI) : { message: 'No data available', rate: 'N/A' };

    return (
        <View className="m-4 rounded-3xl bg-card dark:bg-neutral-700" style={{ width: width }}>
            <View className="mt-2 items-center">
                <Text className="text-lg font-bold dark:text-neutral-100">
                    Sensor: {airData.station}
                </Text>
                <Text className="text-center text-lg text-gray-500 dark:text-gray-300">
                    Latest Data Point: {new Date(airData.time).toLocaleString()} -{' '}
                    {Math.floor((Date.now() - new Date(airData.time).getTime()) / 1000 / 60)}{' '}
                    minute(s) ago
                </Text>
            </View>
            <View className="w-full flex-row items-center justify-center space-x-4 p-2">
                <Gauge
                    value={usAQI ? usAQI : -1}
                    max={400}
                    colors={[aqiColor, '#a6a6a6']}
                    innerRadius={aqiOnly ? 79 : 90}
                    padAngle={1}
                    size={300}
                    label={'Air Quality Index'}
                    rate={aqiMessage.rate}
                    padding={aqiOnly ? 30 : 0}
                />
                {!aqiOnly && (
                    <Map
                        center={[airData.location.longitude, airData.location.latitude]}
                        zoom={14}
                        height={300}
                        markers={[
                            {
                                id: 'a',
                                coordinates: [
                                    airData.location.longitude,
                                    airData.location.latitude,
                                ],
                                popup: aqiMessage.message,
                            },
                        ]}
                        isDark={isDark}
                    />
                )}
            </View>
            <View className="px-4 pb-4">
                <Text className="text-center text-lg font-bold dark:text-neutral-100">
                    What does this mean?
                </Text>
                <Text className="mb-3 text-center text-lg dark:text-neutral-100">
                    {aqiMessage.message}
                </Text>

                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }}
                />

                {aqiOnly ? null : (
                    <View className="mt-3 flex-col md:flex-row">
                        <View className="flex-1 items-center">
                            <Text className="text-6xl font-bold dark:text-neutral-100">
                                {airData.sensors.temperature}
                            </Text>
                            <Text className="text-center text-lg text-gray-500 dark:text-gray-300">
                                Temperature (°F)
                            </Text>
                        </View>
                        <View className="flex-1 items-center">
                            <Text className="text-6xl font-bold dark:text-neutral-100">
                                {airData.sensors.humidity}
                            </Text>
                            <Text className="text-center text-lg text-gray-500 dark:text-gray-300">
                                Humidity (%)
                            </Text>
                        </View>
                        <View className="flex-1 items-center">
                            <Text className="text-6xl font-bold dark:text-neutral-100">
                                {airData.sensors.pressure}
                            </Text>
                            <Text className="text-center text-lg text-gray-500 dark:text-gray-300">
                                Pressure (hPa)
                            </Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}
