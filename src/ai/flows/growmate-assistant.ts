// Use server directive is required for Genkit Flows.
'use server';

/**
 * @fileOverview This file defines the GrowMate Assistant, a chatbot that provides
 * users with information and insights about their farm data.
 *
 * - growMateAssistant - A function to handle user queries and return helpful information.
 * - GrowMateAssistantInput - The input type for the growMateAssistant function.
 * - GrowMateAssistantOutput - The return type for the growMateAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GrowMateAssistantInputSchema = z.object({
  query: z.string().describe('The user query about their farm data.'),
});
export type GrowMateAssistantInput = z.infer<typeof GrowMateAssistantInputSchema>;

const GrowMateAssistantOutputSchema = z.object({
  response: z.string().describe('The response from the GrowMate Assistant.'),
});
export type GrowMateAssistantOutput = z.infer<typeof GrowMateAssistantOutputSchema>;

export async function growMateAssistant(input: GrowMateAssistantInput): Promise<GrowMateAssistantOutput> {
  return growMateAssistantFlow(input);
}

const getWeatherForecast = ai.defineTool({
  name: 'getWeatherForecast',
  description: 'Retrieves the weather forecast for the user\s farm.',
  inputSchema: z.object({
    location: z.string().describe('The location of the farm.'),
  }),
  outputSchema: z.string().describe('The weather forecast for the farm.'),
});

const getSensorData = ai.defineTool({
  name: 'getSensorData',
  description: 'Retrieves sensor data (soil moisture, temperature, humidity) for the user\s farm.',
  inputSchema: z.object({
    sensorType: z.string().describe('The type of sensor data to retrieve (e.g., soil moisture, temperature, humidity).'),
  }),
  outputSchema: z.string().describe('The sensor data for the farm.'),
});


const prompt = ai.definePrompt({
  name: 'growMateAssistantPrompt',
  input: {schema: GrowMateAssistantInputSchema},
  output: {schema: GrowMateAssistantOutputSchema},
  tools: [getWeatherForecast, getSensorData],
  prompt: `You are GrowMate Assistant, an AI-powered chatbot designed to help users with their farm data. Use available tools to answer the question.

  The user query is: {{{query}}}
  `,
});

const growMateAssistantFlow = ai.defineFlow(
  {
    name: 'growMateAssistantFlow',
    inputSchema: GrowMateAssistantInputSchema,
    outputSchema: GrowMateAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
