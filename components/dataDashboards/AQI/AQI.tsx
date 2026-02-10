import { View, Text } from "react-native";

import { useGetAirData } from "@/hooks/useGetAirData";
import AQIIndiv from "./AQIIndiv";

export default function AQI() {

    const { data: airData, isLoading: airLoading, error: airError } = useGetAirData();

    return (
        <View>
            {airLoading && <Text>Loading...</Text>}
            {airError && <Text>Error loading air data</Text>}
            {airData && (
                <>
                    <AQIIndiv airData={airData[1]} />
                    <AQIIndiv airData={airData[0]} />
                </>
            )}
        </View>
    )

}