'use client';
import AQIIndiv from '@/components/dataDashboards/AQI/AQIIndiv';
import { useGetAirData } from '@/hooks/useGetAirData';

import { Stack } from 'expo-router';
import { useWindowDimensions, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Purple() {
    const { data: airData, isLoading: airLoading, error: airError } = useGetAirData();
    const windowDimensions = useWindowDimensions();

    const effectiveWidth =
        windowDimensions.width || window.innerWidth != 0 ? window.innerWidth : 1024;
    const effectiveHeight =
        windowDimensions.height || window.innerHeight != 0 ? window.innerHeight : 800;

    return (
        <View
            className="flex min-h-screen bg-white dark:bg-neutral-900"
            style={{ minHeight: effectiveHeight }}>
            <Stack.Screen options={{ headerShown: false }} />
            {airLoading && <Text>Loading...</Text>}
            {airError && <Text>Error loading air data</Text>}
            {airData && (
                <ScrollView
                    className="mr-2"
                    contentContainerStyle={{
                        flexDirection: effectiveWidth < 540 ? 'column' : 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                    }}>
                    <AQIIndiv
                        airData={airData[1]}
                        width={effectiveWidth < 540 ? effectiveWidth - 40 : effectiveWidth / 2 - 80}
                        aqiOnly
                    />

                    <AQIIndiv
                        airData={airData[0]}
                        width={effectiveWidth < 540 ? effectiveWidth - 40 : effectiveWidth / 2 - 80}
                        aqiOnly
                    />
                </ScrollView>
            )}
        </View>
    );
}
