import { View, Text } from "react-native";

import { useGetAirData } from "@/hooks/useGetAirData";
import AQIIndiv from "./AQIIndiv";

export default function AQI({width}: {width: number}) {

    const { data: airData, isLoading: airLoading, error: airError } = useGetAirData();

    return (
        <View className="items-center">
            {airLoading && <Text>Loading...</Text>}
            {airError && <Text>Error loading air data</Text>}
            {airData && (
                <View className="flex-row justify-between">
                    <AQIIndiv airData={airData[1]} width={width/2 - 40} />
                    <AQIIndiv airData={airData[0]} width={width/2 - 40} />
                </View>
            )}
            <View className="bg-card   rounded-3xl p-4">
                <Text className="text-lg font-bold">Data Source:</Text>
            </View>
        </View>
    )

}