import { useEffect, useState } from "react";
import { Text } from "react-native";

export function CurrentTime() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 500);
        return () => clearInterval(timer);
    }, []);
    
    return (
        <Text className="text-center text-sm dark:text-darkText">
            Current Time: {currentTime.toLocaleTimeString()}
        </Text>
    );
} 