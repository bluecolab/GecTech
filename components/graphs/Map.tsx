import React, { useEffect, useRef } from 'react';
import { Platform, View, Text } from 'react-native';

type Marker = {
    id?: string;
    coordinates: [number, number];
    popup?: string;
};

type MapProps = {
    center?: [number, number];
    zoom?: number;
    height?: number | string;
    markers?: Marker[];
    isDark?: boolean;
};

const isWeb = typeof document !== 'undefined' && Platform.OS === 'web';

export default function Map({
    center = [-74.006, 40.7128],
    zoom = 10,
    height = 300,
    markers = [],
    isDark = false,
}: MapProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<any>(null);

    useEffect(() => {
        if (!isWeb) return;

        let cancelled = false;
        let maplibre: any;

        // Ensure MapLibre CSS is loaded (CDN link)
        const cssId = 'maplibre-css';
        if (!document.getElementById(cssId)) {
            const link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css';
            document.head.appendChild(link);
        }

        import('maplibre-gl')
            .then((mod) => {
                if (cancelled) return;
                maplibre = mod.default || mod;
                if (!containerRef.current) return;

                const lightTiles = [
                    'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
                ];

                const darkTiles = [
                    'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
                    'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
                    'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
                ];

                const tiles = isDark ? darkTiles : lightTiles;
                const attribution = isDark
                    ? '© OpenStreetMap contributors, © CARTO'
                    : '© OpenStreetMap contributors';

                const osmStyle = {
                    version: 8,
                    sources: {
                        'raster-tiles': {
                            type: 'raster',
                            tiles,
                            tileSize: 256,
                            attribution,
                        },
                    },
                    layers: [
                        {
                            id: 'osm-tiles',
                            type: 'raster',
                            source: 'raster-tiles',
                            minzoom: 0,
                            maxzoom: 19,
                        },
                    ],
                };

                mapRef.current = new maplibre.Map({
                    container: containerRef.current,
                    style: osmStyle,
                    center: center as [number, number],
                    zoom,
                });

                markers.forEach((m) => {
                    try {
                        const el = document.createElement('div');
                        el.style.width = '18px';
                        el.style.height = '18px';
                        el.style.background = '#ff5722';
                        el.style.borderRadius = '50%';
                        el.style.boxShadow = '0 0 2px rgba(0,0,0,.6)';

                        const marker = new maplibre.Marker(el)
                            .setLngLat(m.coordinates)
                            .addTo(mapRef.current);
                        if (m.popup && maplibre.Popup) {
                            const popup = new maplibre.Popup({ offset: 10 }).setText(m.popup);
                            marker.setPopup(popup);
                        }
                    } catch (e) {
                        console.error('Error adding marker:', e);
                    }
                });
            })
            .catch((err) => {
                // dynamic import failed
                console.error('Failed to load maplibre-gl:', err);
            });

        return () => {
            cancelled = true;
            try {
                if (mapRef.current && mapRef.current.remove) mapRef.current.remove();
            } catch (e) {
                console.error('Error cleaning up map:', e);
                /* ignore */
            }
        };
    }, [center, zoom, markers, isDark]);

    if (isWeb) {
        // render a div for maplibre to mount into on web; tailwind classes used for width
        return (
            <div
                ref={(el: HTMLDivElement | null) => {
                    containerRef.current = el;
                }}
                className="w-full rounded-3xl"
                style={{ height }}
            />
        );
    }

    // Native (iOS/Android) placeholder — uses nativewind/tailwind classes
    return (
        <View
            className="w-full items-center justify-center bg-gray-200 p-3"
            style={{ height: typeof height === 'string' ? parseInt(height) : height }}>
            <Text className="text-center text-gray-700">Map preview available on web.</Text>
        </View>
    );
}
