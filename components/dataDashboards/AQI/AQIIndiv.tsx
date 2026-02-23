import { View, Text } from 'react-native';

import { useGetAQIColor } from '@/hooks/useGetAQIColor';
import { AirData } from '@/types/AirData';
import Gauge from '@/components/graphs/Guage';
import Map from '@/components/graphs/Map';

export default function AQIIndiv({ airData, width }: { airData: AirData; width: number }) {
    const { getAQIColor, getAQIMessage } = useGetAQIColor();

    const aqiColor = airData ? getAQIColor(airData.purpleAirMapEstimate) : '#E5E7EB';
    const aqiMessage = airData
        ? getAQIMessage(airData.purpleAirMapEstimate)
        : { message: 'No data available', rate: 'N/A' };

    return (
        <View className="m-4 rounded-3xl bg-card dark:bg-neutral-700" style={{ width: width }}>
            <View className="mt-2 items-center">
                <Text className="text-lg font-bold dark:text-neutral-100">
                    Sensor: {airData.name}
                </Text>
                <Text className="text-center text-lg text-gray-500 dark:text-gray-300">
                    Last Updated: {new Date(airData.last_seen * 1000).toLocaleTimeString()}
                </Text>
            </View>
            <View className="w-full flex-row items-center justify-center space-x-4 p-2">
                <Gauge
                    value={airData.purpleAirMapEstimate}
                    max={400}
                    colors={[aqiColor, '#a6a6a6']}
                    innerRadius={90}
                    padAngle={1}
                    size={300}
                    label={'Air Quality Index'}
                    rate={aqiMessage.rate}
                />
                <Map
                    center={[airData.longitude, airData.latitude]}
                    zoom={14}
                    height={300}
                    markers={[
                        {
                            id: 'a',
                            coordinates: [airData.longitude, airData.latitude],
                            popup: aqiMessage.message,
                        },
                    ]}
                    isDark={false}
                />
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

                <View className="mt-3 flex-row">
                    <View className="flex-1 items-center">
                        <Text className="text-6xl font-bold dark:text-neutral-100">
                            {airData.temperature}
                        </Text>
                        <Text className="text-lg text-gray-500 dark:text-gray-300">
                            Temperature (°F)
                        </Text>
                    </View>
                    <View className="flex-1 items-center">
                        <Text className="text-6xl font-bold dark:text-neutral-100">
                            {airData.humidity}
                        </Text>
                        <Text className="text-lg text-gray-500 dark:text-gray-300">
                            Humidity (%)
                        </Text>
                    </View>
                    <View className="flex-1 items-center">
                        <Text className="text-6xl font-bold dark:text-neutral-100">
                            {airData.pressure}
                        </Text>
                        <Text className="text-lg text-gray-500 dark:text-gray-300">
                            Pressure (hPa)
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
