import { useQuery } from '@tanstack/react-query';

const fetchHudsonData = async () => {
    // TODO: Replace with actual fetch logic
    return '';
};

export const useGetHudsonData = () => {
    return useQuery({
        queryKey: ['hudsonData'],
        queryFn: fetchHudsonData,
    });
};
