import { Text } from 'react-native';
import { WaterData } from '@/types/WaterData';
import { extractLastPoint } from '@/utils/extractLastPoint';

export default function WQIIndiv({
    waterData,
    _width,
}: {
    waterData: WaterData[];
    _width: number;
}) {
    console.log(waterData);
    const lastPoint = extractLastPoint(waterData);
    console.log(lastPoint);

    return <Text></Text>;
}
