import { getThingSpeakData } from '@/lib/thingspeak';

export type Insight = {
  recommendations: string[];
  alerts: { severity: string; message: string }[];
};

const DEFAULT_INSIGHTS: Insight = {
  recommendations: ['No recommendations available.'],
  alerts: [],
};

export async function getDashboardInsights(): Promise<Insight> {
  if (!process.env.OPENROUTER_API_KEY) {
    console.error('OpenRouter API key is not configured in .env file.');
    return DEFAULT_INSIGHTS;
  }

  try {
    const sensorData = await getThingSpeakData();
    const systemMessageContent = `You are an expert AI farming assistant. Based on the following real-time farm data, provide up to 3 concise agricultural recommendations and identify any critical alerts.

Current Sensor Data:
- Temperature: ${sensorData.temperature}°C
- Humidity: ${sensorData.humidity}%
- Soil Moisture: ${sensorData.soil_moisture}%
- Nitrogen (N): ${sensorData.nitrogen} ppm
- Phosphorus (P): ${sensorData.phosphorus} ppm
- Potassium (K): ${sensorData.potassium} ppm

Provide your response in a single, valid JSON object with the following structure only. Do not add any other text, explanation, or markdown.
{
  "recommendations": ["string: A short recommendation.", "..." ],
  "alerts": [
    {"severity": "High" | "Medium" | "Low", "message": "string: A short alert message."},
    "..."
  ]
}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b:free',
        messages: [{ role: 'system', content: systemMessageContent }],
      }),
    });

    if (!response.ok) {
      console.error('OpenRouter API Error for insights:', await response.text());
      return DEFAULT_INSIGHTS;
    }

    const result = await response.json();
    const content = result.choices[0].message.content;

    try {
      const jsonString = content.includes('```json')
        ? content.split('```json')[1].split('```')[0].trim()
        : content;
      return JSON.parse(jsonString);
    } catch (e) {
      console.error('Failed to parse JSON from AI response:', content, e);
      return {
        recommendations: [
          'Could not retrieve AI recommendations at this time.',
        ],
        alerts: [],
      };
    }
  } catch (error) {
    console.error('Failed to get dashboard insights:', error);
    return DEFAULT_INSIGHTS;
  }
}
