// This file is machine-generated - edit with caution!
'use server';
/**
 * @fileOverview A voice assistance AI agent for GrowMate.
 *
 * - voiceAssistance - A function that handles voice command processing and information retrieval.
 * - VoiceAssistanceInput - The input type for the voiceAssistance function.
 * - VoiceAssistanceOutput - The return type for the voiceAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceAssistanceInputSchema = z.object({
  voiceCommand: z
    .string()
    .describe('The voice command spoken by the user in any language.'),
});
export type VoiceAssistanceInput = z.infer<typeof VoiceAssistanceInputSchema>;

const VoiceAssistanceOutputSchema = z.object({
  response: z
    .string()
    .describe(
      'The response to the voice command in the same language as the input.'
    ),
});
export type VoiceAssistanceOutput = z.infer<typeof VoiceAssistanceOutputSchema>;

export async function voiceAssistance(
  input: VoiceAssistanceInput
): Promise<VoiceAssistanceOutput> {
  return voiceAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceAssistancePrompt',
  input: {schema: VoiceAssistanceInputSchema},
  output: {schema: VoiceAssistanceOutputSchema},
  prompt: `You are a helpful voice assistant for a farming application called GrowMate.
You will receive voice commands from the user in any language and respond in the same language.
Your goal is to provide information about the farm based on the user's command.

Voice Command: {{{voiceCommand}}}

Response:`, // Start with "Response:" so it is easy to parse.
});

const voiceAssistanceFlow = ai.defineFlow(
  {
    name: 'voiceAssistanceFlow',
    inputSchema: VoiceAssistanceInputSchema,
    outputSchema: VoiceAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
