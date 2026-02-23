import { View, Text } from 'react-native';

import { useGetWaterData } from '@/hooks/useGetWaterData';
import WQIIndiv from './WQIndiv';

export default function WQI({ width }: { width: number }) {
    const { data: waterData, isLoading: waterLoading, error: waterError } = useGetWaterData();

    return (
        <View className="items-center">
            {waterLoading && <Text>Loading...</Text>}
            {waterError && <Text>Error loading water data</Text>}
            {waterData && <WQIIndiv waterData={waterData} width={width} />}

            <View
                className="rounded-3xl bg-card p-4 dark:bg-neutral-700"
                style={{ width: width - 40 }}>
                <Text className="text-lg dark:text-neutral-100">
                    <Text className="font-bold">What are you seeing?</Text> Choate Pond Water
                    Quality Index, a score of how healthy the pond health is. Data collected by our
                    Alan sonde.
                </Text>
            </View>
        </View>
    );
}
