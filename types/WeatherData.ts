export interface WeatherData {
    measurement: string,
    deployment_id: number,
    timestamp: string,
    sensors: {
        AirTemp: number,
        BaroPressure: number,
        DistLightning: number,
        LightningStrikes: number,
        MaxWindSpeed: number,
        Rain: number,
        RelHumid: number,
        RelHumidTemp: number,
        SolarFlux: number,
        SolarTotalFlux: number,
        TiltNS: number,
        TiltWE: number,
        VaporPressure: number,
        WindDir: number,
        WindSpeed: number,
    }
}