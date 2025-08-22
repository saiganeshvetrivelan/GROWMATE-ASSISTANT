'use server';

/**
 * @fileOverview Provides AI-powered irrigation recommendations, including liters/acre suggestions.
 *
 * - irrigationRecommendation - A function that generates irrigation schedules based on sensor data and weather forecasts.
 * - IrrigationRecommendationInput - The input type for the irrigationRecommendation function.
 * - IrrigationRecommendationOutput - The return type for the irrigationRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IrrigationRecommendationInputSchema = z.object({
  soilMoisture: z.number().describe('Current soil moisture level (percentage).'),
  temperature: z.number().describe('Current temperature in Celsius.'),
  humidity: z.number().describe('Current humidity level (percentage).'),
  weatherForecast: z.string().describe('Weather forecast for the next 7 days.'),
  cropType: z.string().describe('Type of crop being grown.'),
  fieldSizeAcres: z.number().describe('Size of the field in acres.'),
});
export type IrrigationRecommendationInput = z.infer<
  typeof IrrigationRecommendationInputSchema
>;

const IrrigationRecommendationOutputSchema = z.object({
  recommendation: z
    .string()
    .describe(
      'AI-powered irrigation recommendation, including liters/acre suggestion.'
    ),
  litersPerAcre: z.number().describe('Recommended liters of water per acre.'),
  startTime: z.string().optional().describe('Recommended start time for irrigation.'),
  endTime: z.string().optional().describe('Recommended end time for irrigation.'),
});
export type IrrigationRecommendationOutput = z.infer<
  typeof IrrigationRecommendationOutputSchema
>;

export async function irrigationRecommendation(
  input: IrrigationRecommendationInput
): Promise<IrrigationRecommendationOutput> {
  return irrigationRecommendationFlow(input);
}

const irrigationRecommendationPrompt = ai.definePrompt({
  name: 'irrigationRecommendationPrompt',
  input: {schema: IrrigationRecommendationInputSchema},
  output: {schema: IrrigationRecommendationOutputSchema},
  prompt: `You are an expert agricultural consultant. Based on the following sensor data, weather forecast, crop type, and field size, provide an irrigation recommendation, including the recommended liters/acre.  Also suggest a start and end time for the irrigation.

Sensor Data:
Soil Moisture: {{soilMoisture}}%
Temperature: {{temperature}}°C
Humidity: {{humidity}}%

Weather Forecast:
{{weatherForecast}}

Crop Type: {{cropType}}
Field Size: {{fieldSizeAcres}} acres`,
});

const irrigationRecommendationFlow = ai.defineFlow(
  {
    name: 'irrigationRecommendationFlow',
    inputSchema: IrrigationRecommendationInputSchema,
    outputSchema: IrrigationRecommendationOutputSchema,
  },
  async input => {
    const {output} = await irrigationRecommendationPrompt(input);
    return output!;
  }
);
