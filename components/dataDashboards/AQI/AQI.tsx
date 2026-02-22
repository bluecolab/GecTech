import { View, Text } from 'react-native';

import { useGetAirData } from '@/hooks/useGetAirData';
import AQIIndiv from './AQIIndiv';

export default function AQI({ width }: { width: number }) {
  const { data: airData, isLoading: airLoading, error: airError } = useGetAirData();

  return (
    <View className="items-center">
      {airLoading && <Text>Loading...</Text>}
      {airError && <Text>Error loading air data</Text>}
      {airData && (
        <View className="flex-row justify-between">
          <AQIIndiv airData={airData[1]} width={width / 2 - 40} />
          <AQIIndiv airData={airData[0]} width={width / 2 - 40} />
        </View>
      )}
      <View className="rounded-3xl bg-card p-4" style={{ width: width - 40 }}>
        <Text className="text-lg">
          <Text className="font-bold">What are you seeing?</Text> Our local Air Quality Index, part
          of the federal AirNow program that also issues alerts when air quality threatens human
          health.{' '}
        </Text>
      </View>
    </View>
  );
}
