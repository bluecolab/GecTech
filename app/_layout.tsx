import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme as useColorSchemeRN } from 'react-native';
import { useEffect, useRef } from 'react';
import { useColorScheme } from 'nativewind';
import { useGlobalSearchParams, Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../global.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60, // 1 minute by default; screen-level queries can override
        },
    },
});

export default function Layout() {
    const { setColorScheme } = useColorScheme();

    // Take dark mode preference from URL param (darkMode=true/false) or system setting, with URL param taking precedence
    const params = useGlobalSearchParams<{ darkMode?: string }>();
    const paramScheme =
        params.darkMode === 'true' ? 'dark' : params.darkMode === 'false' ? 'light' : undefined;
    const systemScheme = useColorSchemeRN() === 'dark' ? 'dark' : 'light';
    const coloScheme = paramScheme ?? systemScheme;

    const lastApplied = useRef<string | null>(null);
    useEffect(() => {
        if (lastApplied.current !== coloScheme) {
            setColorScheme(coloScheme);
            lastApplied.current = coloScheme;
        }
    }, [coloScheme, setColorScheme]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <Stack />
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
