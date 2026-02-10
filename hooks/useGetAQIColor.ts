export function useGetAQIColor() {
    const getAQIColor = (aqi: number) => {
            if (aqi <= 50) {
        return '#009966'; // Good - Green
    } else if (aqi <= 100) {
        return '#ffde33'; // Moderate - Yellow
    } else if (aqi <= 150) {
        return '#ff9933'; // Unhealthy for Sensitive Groups - Orange
    } else if (aqi <= 200) {
        return '#cc0033'; // Unhealthy - Red
    } else if (aqi <= 300) {
        return '#660099'; // Very Unhealthy - Purple
    } else {
        return '#7e0023'; // Hazardous - Maroon
    }  };

    return { getAQIColor };
}