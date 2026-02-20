import { View, Text } from "react-native";

import { useGetAQIColor } from "@/hooks/useGetAQIColor";
import { AirData } from "@/types/AirData"
import Gauge from '@/components/graphs/Guage';
import Map from '@/components/graphs/Map';

export default function AQIIndiv({ airData }: { airData: AirData }) {
    const { getAQIColor, getAQIMessage } = useGetAQIColor();

    const aqiColor = airData ? getAQIColor(airData.purpleAirMapEstimate) : "#E5E7EB";
    const aqiMessage = airData ? getAQIMessage(airData.purpleAirMapEstimate) : "No data available";

    // airData.temperature
    // airData.humidity
    // airData.pressure
    // airData.purpleAirMapEstimate

    console.log("Air Data:", airData);

    return (
        <View className="bg-card m-4 rounded-3xl">
            <View className="mt-2 items-center">
                <Text className="text-lg font-bold">Sensor: {airData.name}</Text>
                <Text className="text-md text-gray-500 text-center">Last Updated: {new Date(airData.last_seen * 1000).toLocaleTimeString()}</Text>
            </View>
            <View className="flex-row items-center justify-center w-full p-2 space-x-4">
                <Gauge value={airData.purpleAirMapEstimate} max={400} colors={[aqiColor, "#a6a6a6"]} innerRadius={80} padAngle={1} size={250} label={"Air Quality Index"} />
                <Map
                    center={[airData.longitude, airData.latitude]}
                    zoom={14}
                    height={250}
                    markers={[{ id: 'a', coordinates: [airData.longitude, airData.latitude], popup: aqiMessage }]}
                />
            </View>
            <View className="px-4 pb-4">
                <Text className="text-lg"><Text className="font-bold">What does this mean?</Text> {aqiMessage}</Text>

                
                <Text className="text-lg"><Text className="font-bold">Temperature:</Text> {airData.temperature}°F</Text>
                <Text className="text-lg"><Text className="font-bold">Humidity:</Text> {airData.humidity}%</Text>
                <Text className="text-lg"><Text className="font-bold">Pressure:</Text> {airData.pressure} hPa</Text>
            </View>
        </View>
    )
}