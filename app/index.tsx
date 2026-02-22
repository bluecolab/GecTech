import { Stack } from 'expo-router';
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { View, Text, Image, Dimensions, Pressable } from 'react-native';

import AQI from '@/components/dataDashboards/AQI/AQI';
import { useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { CurrentTime } from '@/components/CurrentTime';

const darkLogo = require('@/assets/icons/Pace_Black_Centered.png');
const logo = require('@/assets/icons/Pace_White_KO_Centered.png');

const windowDimensions = Dimensions.get('window');

export default function Home() {
  const isDark = false;

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
    { id: 'aqi', title: 'Air Quality Index', component: <AQI width={windowDimensions.width}/> },
    // { id: 'water', title: 'Water Quality Data', component: <Text>Water Quality Data</Text> },
    // { id: 'weather', title: 'Weather Data', component: <Text>Weather Data</Text> },
  ];

  return (
    <View className="flex flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
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
        renderItem={({ item, index }) => (
          item.component
        )} 
      />

      <Pagination.Basic
        progress={progress}
        data={dashboards}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />

      <View className="flex-row justify-center items-center mt-4">
        {dashboards.map((d, i) => (
          <View key={d.id} className="flex-row items-center">
            <Text
              className={`text-center text-sm mx-1 ${i === currentIndex ? 'text-black font-bold' : 'text-gray-400'}`}>
              {d.title}
            </Text>
            <Text className={`${i < dashboards.length - 1 ? '' : 'invisible'}`}>
              |
            </Text>
          </View>
        ))}
      </View>

      <CurrentTime />

      <View className="items-center mt-0">
        <Pressable
          onPress={() => setIsAutoplay(v => !v)}
          className="p-1 rounded bg-gray-200"
          accessibilityLabel={isAutoplay ? 'Disable autoplay' : 'Allow autoplay'}
        >
          <Text className="text-sm text-center">
            {isAutoplay ? 'Disable Autoplay' : 'Allow Autoplay'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
