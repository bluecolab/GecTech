'use client';
import { Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

const windowDimensions = Dimensions.get('window');

export default function Hudson() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const progress = useSharedValue<number>(0);
    const ref = useRef<ICarouselInstance>(null);

    const locations = [
        {
            name: 'NYC Pier 25',
            src: 'https://colabprod01.pace.edu/grafana/public-dashboards/42fc4d25035b449c81f3d8ecb3f08e83?orgId=1&from=now-2d&to=now&refresh=15m',
            zoom: 1,
        },
        {
            name: 'Piermont',
            src: 'https://colabprod01.pace.edu/grafana/public-dashboards/61951a2f584f49f690969a23c349f43e?orgId=1&from=now-2d&to=now&refresh=15m',
            zoom: 0.7,
        },
        {
            name: 'Poughkeepsie',
            src: 'https://colabprod01.pace.edu/grafana/public-dashboards/fa0d20863be848119bc21d7807f20b56?orgId=1&from=now-2d&to=now&refresh=15m',
            zoom: 1,
        },
    ];

    return (
        <View
            className="flex bg-white dark:bg-neutral-900"
            style={{ height: windowDimensions.height }}>
            <Stack.Screen options={{ headerShown: false }} />

            <View className="flex-row items-center justify-center">
                {locations.map((d, i) => (
                    <View key={d.name} className="flex-row items-center dark:text-neutral-100">
                        <Text
                            className={`mx-1 text-center text-xl ${i === currentIndex ? 'font-bold text-black dark:text-neutral-100' : 'text-gray-400 dark:text-neutral-500'}`}>
                            {d.name}
                        </Text>
                        <Text
                            className={`${i < locations.length - 1 ? 'dark:text-neutral-100' : 'invisible'}`}>
                            |
                        </Text>
                    </View>
                ))}
            </View>

            <Carousel
                ref={ref}
                onProgressChange={progress}
                onSnapToItem={setCurrentIndex}
                loop={true}
                snapEnabled={true}
                pagingEnabled={true}
                autoPlayInterval={10000}
                autoPlay={true}
                data={locations}
                style={{ width: windowDimensions.width, height: windowDimensions.height }}
                width={windowDimensions.width}
                renderItem={({ item }) => (
                    <iframe
                        src={item.src}
                        style={{
                            width: '100%',
                            height: '100%',
                            zoom: item.zoom,
                            pointerEvents: 'none',
                        }}
                    />
                )}
            />
        </View>
    );
}
