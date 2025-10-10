export type SensorData = {
  temperature: number;
  humidity: number;
  soil_moisture: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
};

// Default values to be used in case of an API error or empty data
const DEFAULT_SENSOR_DATA: SensorData = {
  temperature: 0,
  humidity: 0,
  soil_moisture: 0,
  nitrogen: 0,
  phosphorus: 0,
  potassium: 0,
};

export async function getThingSpeakData(): Promise<SensorData> {
  const channelId = process.env.3110431;
  const apiKey = process.env.NLGV7LTYLQBQQTRM;

  if (!channelId || !apiKey) {
    console.error('ThingSpeak credentials are not configured in .env file.');
    return DEFAULT_SENSOR_DATA;
  }

  try {
    const response = await fetch(
      `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=1`,
      {
        next: { revalidate: 60 }, // Re-fetch data every 60 seconds
      }
    );

    if (!response.ok) {
      console.error(
        `Error fetching from ThingSpeak API. Status: ${response.status}`
      );
      return DEFAULT_SENSOR_DATA;
    }

    const data = await response.json();
    const latestFeed = data.feeds?.[0];

    if (!latestFeed) {
      console.warn('ThingSpeak feed is empty, returning default data.');
      return DEFAULT_SENSOR_DATA;
    }

    return {
      temperature: parseFloat(latestFeed.field1) || 0,
      humidity: parseFloat(latestFeed.field2) || 0,
      soil_moisture: parseFloat(latestFeed.field3) || 0,
      nitrogen: parseFloat(latestFeed.field4) || 0,
      phosphorus: parseFloat(latestFeed.field5) || 0,
      potassium: parseFloat(latestFeed.field6) || 0,
    };
  } catch (error) {
    console.error('An error occurred while fetching ThingSpeak data:', error);
    return DEFAULT_SENSOR_DATA;
  }
}