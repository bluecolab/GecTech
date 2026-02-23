import { Stack } from 'expo-router';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { View, Text, Image, Dimensions, useColorScheme } from 'react-native';

import AQI from '@/components/dataDashboards/AQI/AQI';
import { useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { CurrentTime } from '@/components/CurrentTime';

const darkLogo = require('@/assets/icons/Pace_Black_Centered.png');
const logo = require('@/assets/icons/Pace_White_Centered.png');

const colabLogo = require('@/assets/icons/logo192.png');
const gecLogo = require('@/assets/GECTPE-logo-400x65-copy-1.png');

const windowDimensions = Dimensions.get('window');

export default function Home() {
    const isDark = useColorScheme() === 'dark';
    const ref = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const dashboards = [
        {
            id: 'aqi',
            title: 'Air Quality Index',
            component: <AQI width={windowDimensions.width} />,
        },
        {
            id: 'water',
            title: 'Water Quality Data',
            component: (
                <iframe
                    className="mt-2"
                    src="https://colabprod01.pace.edu/grafana/public-dashboards/841327a5d5fa493b8f14d638ffe2041e?orgId=1&from=now-2d&to=now&refresh=15m"
                    style={{ width: '100%', height: '100%' }}></iframe>
            ),
        },
        {
            id: 'weather',
            title: 'Weather Data',
            component: (
                <iframe
                    className="mt-2"
                    src="https://colabprod01.pace.edu/grafana/public-dashboards/139d29dc18204fa28d1b39ef672c45f5?orgId=1&from=now-2d&to=now&refresh=15m"
                    style={{ width: '100%', height: '100%' }}></iframe>
            ),
        },
    ];

    console.log(windowDimensions.height);

    return (
        <View
            className="flex bg-white dark:bg-neutral-900"
            style={{ height: windowDimensions.height }}>
            <Stack.Screen options={{ headerShown: false }} />

            <View className="absolute left-4 top-4 z-10 flex-row items-center">
                <Image source={gecLogo} className="w-full" resizeMode="contain" />
            </View>

            <View className="absolute right-0 top-4 z-10 w-full items-end pr-4">
                <Image
                    source={colabLogo}
                    className="ml-2"
                    style={{ height: 65, width: 65 }}
                    resizeMode="contain"
                />
            </View>

            <View className="absolute bottom-4 right-0 z-10 w-full items-end pr-4">
                <CurrentTime />
            </View>

            <View className="items-center">
                <Image
                    source={isDark ? logo : darkLogo}
                    className="mt-4 w-full"
                    style={{ height: 80 }}
                    resizeMode="contain"
                />
                <Text className="dark:text-darkText m-2 text-center text-2xl font-bold dark:text-neutral-100">
                    Environmental Observatory
                </Text>
            </View>

            <View className="flex-row items-center justify-center">
                {dashboards.map((d, i) => (
                    <View key={d.id} className="flex-row items-center dark:text-neutral-100">
                        <Text
                            className={`mx-1 text-center text-xl ${i === currentIndex ? 'font-bold text-black dark:text-neutral-100' : 'text-gray-400 dark:text-neutral-500'}`}>
                            {d.title}
                        </Text>
                        <Text
                            className={`${i < dashboards.length - 1 ? 'dark:text-neutral-100' : 'invisible'}`}>
                            |
                        </Text>
                    </View>
                ))}
            </View>

            <View className="flex-1" style={{ width: windowDimensions.width }}>
                <Carousel
                    ref={ref}
                    onProgressChange={progress}
                    onSnapToItem={setCurrentIndex}
                    loop={true}
                    snapEnabled={true}
                    pagingEnabled={true}
                    autoPlayInterval={10000}
                    autoPlay={true}
                    data={dashboards}
                    style={{ width: windowDimensions.width, height: windowDimensions.height }}
                    width={windowDimensions.width}
                    renderItem={({ item }) => (
                        <View pointerEvents="none" style={{ width: '100%', height: '100%' }}>
                            {item.component}
                        </View>
                    )}
                />
            </View>
        </View>
    );
}
