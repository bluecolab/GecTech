import { useEffect, useState } from 'react';
import { Text } from 'react-native';

export function CurrentTime() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Text className="dark:text-darkText text-center text-xl font-bold dark:text-neutral-100">
            Current Time: {currentTime.toLocaleTimeString()}
        </Text>
    );
}
