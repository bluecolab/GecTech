const API_URL = 'https://colabprod01.pace.edu/api/influx/sensordata/Odin/delta?minutes=30'
const API_TIMEOUT = 10000; // 10 seconds

export async function GET(request: Request) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeout);
    if (!response.ok) {
      return await response.json();
    }
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.log('Error fetching BlueColab Weather data:', error);
    return error;
  }
}
