import { Stack } from 'expo-router';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { View, Text, Image, Dimensions, Pressable, useColorScheme } from 'react-native';

import AQI from '@/components/dataDashboards/AQI/AQI';
import { useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { CurrentTime } from '@/components/CurrentTime';
import WQI from '@/components/dataDashboards/WQI/WQI';

const darkLogo = require('@/assets/icons/Pace_Black_Centered.png');
const logo = require('@/assets/icons/Pace_White_Centered.png');

const windowDimensions = Dimensions.get('window');

export default function Home() {
  const isDark = useColorScheme() === 'dark';
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const dashboards = [
    { id: 'aqi', title: 'Air Quality Index', component: <AQI width={windowDimensions.width} /> },
    { id: 'water', title: 'Water Quality Data', component: <WQI width={windowDimensions.width} /> },
    // { id: 'weather', title: 'Weather Data', component: <Text>Weather Data</Text> },
  ];

  return (
    <View className="flex flex-1 bg-white dark:bg-neutral-900">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="items-center">
        <Image
          source={isDark ? logo : darkLogo}
          className="mt-4 w-full"
          style={{ height: 56 }}
          resizeMode="contain"
        />
        <Text className="dark:text-darkText mt-2 text-center text-xl font-bold dark:text-neutral-100">
          Environmental Observatory
        </Text>
      </View>

      <View className="item-center">
        <Text className="dark:text-darkText mt-2 text-center  text-xl font-bold dark:text-neutral-100">
          Welcome!
        </Text>
      </View>

      <Carousel
        ref={ref}
        onProgressChange={progress}
        onSnapToItem={setCurrentIndex}
        // loop={true}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlayInterval={10000}
        // autoPlay={isAutoplay}
        data={dashboards}
        style={{ width: windowDimensions.width, height: windowDimensions.height * 0.7 }}
        width={windowDimensions.width}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        renderItem={({ item, index }) => item.component}
      />

      <Pagination.Basic
        progress={progress}
        data={dashboards}
        dotStyle={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />

      <View className="mt-4 flex-row items-center justify-center">
        {dashboards.map((d, i) => (
          <View key={d.id} className="flex-row items-center dark:text-neutral-100">
            <Text
              className={`mx-1 text-center text-sm ${i === currentIndex ? 'font-bold text-black dark:text-neutral-100' : 'text-gray-400 dark:text-neutral-500'}`}>
              {d.title}
            </Text>
            <Text className={`${i < dashboards.length - 1 ? '' : 'invisible'}`}>|</Text>
          </View>
        ))}
      </View>

      <CurrentTime />

      <View className="mt-0 items-center">
        <Pressable
          onPress={() => setIsAutoplay((v) => !v)}
          className="rounded bg-gray-200 p-1"
          accessibilityLabel={isAutoplay ? 'Disable autoplay' : 'Allow autoplay'}>
          <Text className="text-center text-sm">
            {isAutoplay ? 'Disable Autoplay' : 'Allow Autoplay'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
