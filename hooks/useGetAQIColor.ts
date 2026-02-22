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
        }
    };

    const getAQIMessage = (aqi: number) => {
        if (aqi <= 50) {
            return {
                'message': 'Air quality is satisfactory, and air pollution poses little or no risk.',
                'rate': 'Good'
            };
        } else if (aqi <= 100) {
            return {
                'message': 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.',
                'rate': 'Moderate'
            };
        } else if (aqi <= 150) {
            return {
                'message': 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.',
                'rate': 'Unhealthy for Sensitive Groups'
            };
        } else if (aqi <= 200) {
            return {
                'message': 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.',
                'rate': 'Unhealthy'
            };
        } else if (aqi <= 300) {
            return {
                'message': 'Health alert: everyone may experience more serious health effects.',
                'rate': 'Very Unhealthy'
            };
        } else {
            return {
                'message': 'Health warnings of emergency conditions. The entire population is more likely to be affected.',
                'rate': 'Hazardous'
            };
        }
    };

    return { getAQIColor, getAQIMessage };
}