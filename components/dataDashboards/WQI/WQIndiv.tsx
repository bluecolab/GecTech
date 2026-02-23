import { Text, View } from 'react-native';
import { FlattenedWaterData, WaterData } from '@/types/WaterData';
import { extractLastPoint } from '@/utils/extractLastPoint';
import Guage from '@/components/graphs/Guage';
import { SummaryGraph } from '@/components/graphs/SummaryGraph';

const getColor = (percentage: number) =>
    percentage >= 0 && percentage < 25
        ? 'darkred'
        : percentage >= 25 && percentage < 50
          ? 'darkorange'
          : percentage >= 50 && percentage < 70
            ? 'yellow'
            : percentage >= 70 && percentage < 90
              ? 'green'
              : percentage >= 90 && percentage <= 100
                ? 'darkgreen'
                : 'red'; // default

const getMessage = (percentage: number) =>
    percentage >= 0 && percentage < 25
        ? 'Poor'
        : percentage >= 25 && percentage < 50
          ? 'Fair'
          : percentage >= 50 && percentage < 70
            ? 'Average'
            : percentage >= 70 && percentage < 90
              ? 'Good'
              : percentage >= 90 && percentage <= 100
                ? 'Excellent'
                : 'red';

export default function WQIIndiv({ waterData, width }: { waterData: WaterData[]; width: number }) {
    const lastPoint = extractLastPoint(waterData) as FlattenedWaterData;

    if (!lastPoint) {
        return (
            <View>
                <Text className="text-lg dark:text-neutral-100">No water data available</Text>
            </View>
        );
    }

    const wqi = Math.floor(
        lastPoint.Cond * 0.08 +
            lastPoint.DOpct * 0.25 +
            lastPoint.Temp * 0.2 +
            lastPoint.Turb * 0.16 +
            lastPoint.pH * 0.22
    );

    return (
        <View className="m-4 rounded-3xl bg-card dark:bg-neutral-700" style={{ width: width - 40 }}>
            <View className="mt-2 items-center">
                <Text className="text-lg font-bold dark:text-neutral-100">Sensor: {'Alan'}</Text>
                <Text className="text-center text-lg text-gray-500 dark:text-gray-300">
                    Latest Data Point: {new Date(lastPoint?.timestamp ?? 0).toLocaleString()} -{' '}
                    {Math.floor(
                        (Date.now() - new Date(lastPoint?.timestamp ?? 0).getTime()) / 1000 / 60
                    )}{' '}
                    minute(s) ago
                </Text>
            </View>

            <View className="grid w-full grid-cols-6 gap-2 p-2">
                <Guage
                    value={wqi}
                    max={100}
                    colors={[getColor(wqi), '#a6a6a6']}
                    innerRadius={60}
                    padAngle={1}
                    size={250}
                    label={'Water Quality Index'}
                    rate={getMessage(wqi)}
                    padding={30}
                />

                <SummaryGraph
                    data={waterData}
                    objKey="Temp"
                    title="Temperature"
                    size={250}
                    unit={'°F'}
                    convertFunc={(c: number) => c * (9 / 5) + 32}
                />

                <SummaryGraph
                    data={waterData}
                    objKey="Turb"
                    title="Turbidity"
                    size={250}
                    unit={'FNU'}
                    convertFunc={(c: number) => c}
                />

                <SummaryGraph
                    data={waterData}
                    objKey="Cond"
                    title="Conductivity"
                    size={250}
                    unit={'μS/cm'}
                    convertFunc={(c: number) => c}
                />

                <SummaryGraph
                    data={waterData}
                    objKey="Sal"
                    title="Salinity"
                    size={250}
                    unit={'ppt'}
                    convertFunc={(c: number) => c}
                />

                <SummaryGraph
                    data={waterData}
                    objKey="pH"
                    title="pH"
                    size={250}
                    unit={'pH'}
                    convertFunc={(c: number) => c}
                />

                <SummaryGraph
                    data={waterData}
                    objKey="DOpct"
                    title="Dissolved Oxygen Percentage"
                    size={250}
                    unit={'%'}
                    convertFunc={(c: number) => c}
                />
            </View>
        </View>
    );
}
