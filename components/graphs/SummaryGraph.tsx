import { WaterData } from '@/types/WaterData';
import { WeatherData } from '@/types/WeatherData';
import { extractAllDataPoints } from '@/utils/extractAllDataPoints';
import { VictoryArea, VictoryAxis, VictoryChart, VictoryTheme } from 'victory';

export function SummaryGraph({
    title,
    data,
    objKey,
    size,
    unit,
    convertFunc,
}: {
    title: string;
    data: WaterData[] | WeatherData[];
    objKey: string;
    size: number;
    unit: string;
    convertFunc?: (value: number) => number;
}) {
    const extractedData = extractAllDataPoints(data, objKey) || [];
    const latestValue =
        extractedData.length > 0 ? extractedData[extractedData.length - 1].value : null;
    const displayValue =
        convertFunc && latestValue !== null ? convertFunc(latestValue) : latestValue;

    return (
        <div
            className="relative rounded-3xl bg-innerCard p-0 dark:bg-neutral-900"
            style={{ height: size, width: size }}>
            <div className="pointer-events-none absolute left-0 right-0 top-1 flex justify-center">
                <span className="text-center text-3xl font-medium dark:text-neutral-100">
                    {title} ({unit})
                </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0">
                <VictoryChart
                    theme={VictoryTheme.clean}
                    padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
                    domainPadding={0}
                    width={size}
                    height={size * 0.5}>
                    {(() => {
                        return (
                            <VictoryArea
                                data={extractedData}
                                x="timestamp"
                                y="value"
                                interpolation="natural"
                            />
                        );
                    })()}
                    <VictoryAxis
                        style={{
                            axis: { stroke: 'transparent' },
                            ticks: { stroke: 'transparent' },
                            tickLabels: { fill: 'transparent' },
                        }}
                    />
                </VictoryChart>
            </div>

            <div className="pointer-events-none absolute top-[30px] w-full justify-center  text-center">
                <span
                    className="font-bold dark:text-neutral-100"
                    style={{ fontSize: Math.max(25, size * 0.35) }}>
                    {displayValue !== null ? displayValue.toFixed(1) : 0}
                </span>
            </div>
        </div>
    );
}
