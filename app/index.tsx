import { Stack } from 'expo-router';

import { View, Text, ScrollView, Image } from 'react-native';

import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';

import { useGetAirData } from '@/hooks/useGetAirData';
import { useGetHudsonData } from '@/hooks/useGetHudsonData';
import { useGetWaterData } from '@/hooks/useGetWaterData';
import { useGetWeatherData } from '@/hooks/useGetWeatherData';

const darkLogo = require('@/assets/icons/Pace_Black_Centered.png');
const logo = require('@/assets/icons/Pace_White_KO_Centered.png');


export default function Home() {
  const isDark = false;
  const { data: airData, isLoading: airLoading, error: airError } = useGetAirData();
  const { data: hudsonData, isLoading: hudsonLoading, error: hudsonError } = useGetHudsonData();
  const { data: waterData, isLoading: waterLoading, error: waterError } = useGetWaterData();
  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useGetWeatherData();

  return (
    <View className="flex flex-1 bg-white">
      <Stack.Screen options={{headerShown: false }} />
      <View className="items-center">
        <Image
          source={isDark ? logo : darkLogo}
          className="w-full mt-4"
          style={{ height: 56 }}
          resizeMode="contain"
        />
        <Text className="mt-2 text-center text-xl font-bold dark:text-darkText">
          Environmental Observatory
        </Text>
      </View>

      <View className='item-center'>
        <Text className="mt-2 text-center text-xl  font-bold dark:text-darkText">Welcome!</Text>
      </View>

            <Text>Test</Text>

    </View>
  );
}
