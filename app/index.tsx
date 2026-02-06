import { Stack } from 'expo-router';

import { View, Text, ScrollView } from 'react-native';

import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';

import { useGetAirData } from '@/hooks/useGetAirData';
import { useGetHudsonData } from '@/hooks/useGetHudsonData';
import { useGetWaterData } from '@/hooks/useGetWaterData';
import { useGetWeatherData } from '@/hooks/useGetWeatherData';


export default function Home() {
  const { data: airData, isLoading: airLoading, error: airError } = useGetAirData();
  const { data: hudsonData, isLoading: hudsonLoading, error: hudsonError } = useGetHudsonData();
  const { data: waterData, isLoading: waterLoading, error: waterError } = useGetWaterData();
  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useGetWeatherData();

  const isAnyLoading = airLoading || hudsonLoading || waterLoading || weatherLoading;
  const isAnyError = airError || hudsonError || waterError || weatherError;

  return (
    <View className={styles.container}>
      <Stack.Screen options={{ title: 'Pace Environmental Observatory', headerShown: true, headerTitleAlign: 'center' }} />
      <Container>
        <ScreenContent path="app/index.tsx" title="Home" />
        {isAnyLoading ? (
          <View><Text>Loading data...</Text></View>
        ) : isAnyError ? (
          <View><Text>Failed to load some data.</Text></View>
        ) : (
          <ScrollView>
            <Text>Air Data:</Text>
            <Text selectable>{JSON.stringify(airData, null, 2)}</Text>
            <Text>Hudson Data:</Text>
            <Text selectable>{JSON.stringify(hudsonData, null, 2)}</Text>
            <Text>Water Data:</Text>
            <Text selectable>{JSON.stringify(waterData, null, 2)}</Text>
            <Text>Weather Data:</Text>
            <Text selectable>{JSON.stringify(weatherData, null, 2)}</Text>
          </ScrollView>
        )}
      </Container>
    </View>
  );
}

const styles = {
  container: 'flex flex-1 bg-white',
};
