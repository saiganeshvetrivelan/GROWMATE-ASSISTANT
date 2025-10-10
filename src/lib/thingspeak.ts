// A mock implementation of the ThingSpeak API client.
// In a real-world application, you would fetch this data from the ThingSpeak API.
// https://www.mathworks.com/help/thingspeak/readdata.html

// The order of fields is:
// 1. temperature
// 2. humidity
// 3. soil_moisture
// 4. nitrogen
// 5. phosphorus
// 6. potassium

const MOCK_DATA = {
  channel: {
    id: 12397,
    name: 'Weather Station',
    latitude: '42.2626',
    longitude: '-71.0848',
    field1: 'temperature',
    field2: 'humidity',
    field3: 'soil_moisture',
    field4: 'nitrogen',
    field5: 'phosphorus',
    field6: 'potassium',
    created_at: '2014-11-26T21:00:27Z',
    updated_at: '2023-01-20T16:03:07Z',
    last_entry_id: 104,
  },
  feeds: [
    {
      created_at: '2023-01-20T16:03:07Z',
      entry_id: 104,
      field1: '24', // temperature
      field2: '68', // humidity
      field3: '45', // soil_moisture
      field4: '150', // nitrogen
      field5: '40', // phosphorus
      field6: '200', // potassium
    },
  ],
};

export type SensorData = {
  temperature: number;
  humidity: number;
  soil_moisture: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
};

export async function getThingSpeakData(): Promise<SensorData> {
  // In a real application, you would make a fetch request to the ThingSpeak API.
  // For now, we are returning mock data.
  //
  // const channelId = process.env.THINGSPEAK_CHANNEL_ID;
  // const apiKey = process.env.THINGSPEAK_API_KEY;
  // const response = await fetch(`https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=1`);
  // const data = await response.json();
  // const latestFeed = data.feeds[0];

  const latestFeed = MOCK_DATA.feeds[0];

  return {
    temperature: parseFloat(latestFeed.field1),
    humidity: parseFloat(latestFeed.field2),
    soil_moisture: parseFloat(latestFeed.field3),
    nitrogen: parseFloat(latestFeed.field4),
    phosphorus: parseFloat(latestFeed.field5),
    potassium: parseFloat(latestFeed.field6),
  };
}