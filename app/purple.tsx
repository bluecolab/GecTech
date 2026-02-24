import AQIIndiv from '@/components/dataDashboards/AQI/AQIIndiv';
import { useGetAirData } from '@/hooks/useGetAirData';
import { Stack } from 'expo-router';
import { Dimensions, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const windowDimensions = Dimensions.get('window');

export default function Purple() {
    const { data: airData, isLoading: airLoading, error: airError } = useGetAirData();

    return (
        <View
            className="flex bg-white dark:bg-neutral-900"
            style={{ height: windowDimensions.height }}>
            <Stack.Screen options={{ headerShown: false }} />
            {airLoading && <Text>Loading...</Text>}
            {airError && <Text>Error loading air data</Text>}
            {airData && (
                <ScrollView
                    className="mr-2"
                    contentContainerStyle={{
                        flexDirection: windowDimensions.width < 540 ? 'column' : 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                    }}>
                    <AQIIndiv
                        airData={airData[1]}
                        width={
                            windowDimensions.width < 540
                                ? windowDimensions.width - 40
                                : windowDimensions.width / 2 - 80
                        }
                        aqiOnly
                    />

                    <AQIIndiv
                        airData={airData[0]}
                        width={
                            windowDimensions.width < 540
                                ? windowDimensions.width - 40
                                : windowDimensions.width / 2 - 80
                        }
                        aqiOnly
                    />
                </ScrollView>
            )}
        </View>
    );
}
