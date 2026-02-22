// Web only 
import { VictoryPie, VictoryTheme } from 'victory';

type GaugeProps = {
    value: number;
    max: number;
    colors: string[];
    innerRadius: number;
    padAngle: number;
    size: number;
    label: string;
    rate: string;
};

export default function Gauge({
    value,
    max,
    colors,
    innerRadius,
    padAngle,
    size,
    label,
    rate
}: GaugeProps) {
    const remaining = Math.max(0, max - value);

    return (
        <div className="relative bg-innerCard p-2 rounded-3xl" style={{ width: size, height: size }}>
            <div className="absolute top-1 left-0 right-0 flex justify-center pointer-events-none">
                <span className="text-lg font-medium" >{label}</span>
            </div>
            <VictoryPie
                width={size}
                height={size}
                padding={0}
                innerRadius={innerRadius}
                data={[
                    { x: "Value", y: value },
                    { x: "Remaining", y: remaining },
                ]}
                colorScale={colors}
                padAngle={padAngle}
                theme={VictoryTheme.clean}
                labels={() => null}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-bold" style={{ fontSize: Math.max(15, size * 0.28),  }}>
                    {value}
                </span>
            </div>
            <div className="absolute bottom-2 left-0 right-0 flex text-lg justify-center pointer-events-none font-bold" style={{ color: colors[0] }}>
                {rate}
            </div>
        </div>
    );
}