export interface WaterData {
    measurement: string,
    deployment_id: number,
    timestamp: string,
    sensors: {
        Cond: number,
        DOpct: number,
        Sal: number,
        Temp: number,
        Turb: number,
        pH: number,
    }
}