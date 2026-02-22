import { View, Text } from "react-native";

import { useGetAQIColor } from "@/hooks/useGetAQIColor";
import { AirData } from "@/types/AirData"
import Gauge from '@/components/graphs/Guage';
import Map from '@/components/graphs/Map';

export default function AQIIndiv({ airData, width }: { airData: AirData, width: number }) {
    const { getAQIColor, getAQIMessage } = useGetAQIColor();

    const aqiColor = airData ? getAQIColor(airData.purpleAirMapEstimate) : "#E5E7EB";
    const aqiMessage = airData ? getAQIMessage(airData.purpleAirMapEstimate) : { message: "No data available", rate: 'N/A' };

    return (
        <View className="bg-card m-4 rounded-3xl " style={{ width: width }}>
            <View className="mt-2 items-center">
                <Text className="text-lg font-bold">Sensor: {airData.name}</Text>
                <Text className="text-lg text-gray-500 text-center">Last Updated: {new Date(airData.last_seen * 1000).toLocaleTimeString()}</Text>
            </View>
            <View className="flex-row items-center justify-center w-full p-2 space-x-4">
                <Gauge value={airData.purpleAirMapEstimate} max={400} colors={[aqiColor, "#a6a6a6"]} innerRadius={90} padAngle={1} size={300} label={"Air Quality Index"} rate={aqiMessage.rate} />
                <Map
                    center={[airData.longitude, airData.latitude]}
                    zoom={14}
                    height={300}
                    markers={[{ id: 'a', coordinates: [airData.longitude, airData.latitude], popup: aqiMessage.message }]}
                />
            </View>
            <View className="px-4 pb-4">
                <Text className="text-lg font-bold text-center">What does this mean?</Text>
                <Text className="text-lg text-center mb-3">{aqiMessage.message}</Text>

                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }}
                />

                <View className="flex-row mt-3">
                    <View className="flex-1 items-center">
                        <Text className="text-6xl font-bold">{airData.temperature}</Text>
                        <Text className="text-lg text-gray-500">Temperature (°F)</Text>
                    </View>
                    <View className="flex-1 items-center">
                        <Text className="text-6xl font-bold">{airData.humidity}</Text>
                        <Text className="text-lg text-gray-500">Humidity (%)</Text>
                    </View>
                    <View className="flex-1 items-center">
                        <Text className="text-6xl font-bold">{airData.pressure}</Text>
                        <Text className="text-lg text-gray-500">Pressure (hPa)</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}