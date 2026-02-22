import { useGetWaterData } from '@/hooks/useGetWaterData';

export default function WQI({ width }: { width: number }) {
  const { data: waterData, isLoading: waterLoading, error: waterError } = useGetWaterData();
}
