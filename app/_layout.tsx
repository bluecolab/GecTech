import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme as useColorSchemeRN } from 'react-native';
import { useColorScheme } from 'nativewind';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../global.css';

import { Stack } from 'expo-router';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60, // 1 minute by default; screen-level queries can override
        },
    },
});

export default function Layout() {
    // Update Nativewind Dark Scheme
    const { setColorScheme } = useColorScheme();
    const coloScheme = useColorSchemeRN() === 'dark' ? 'dark' : 'light';
    setColorScheme(coloScheme);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <Stack />
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
